import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";

import List from "./pages/List";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import Notfound from "./components/Notfound";

export default function App() {
   const [user, setUser] = useState(null);

   let sessionUser = sessionStorage.getItem("USER");

   useEffect(() => {
      if (!sessionUser) {
         getUser();
      }
   });

   useEffect(() => {
      setUser(JSON.parse(sessionUser));
   }, [sessionUser]);

   const getUser = () => {
      fetch("https://todoapp-anatolie.herokuapp.com/auth/login/success", {
         method: "GET",
         credentials: "include",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
         },
      })
         .then((res) => {
            if (res.status === 200) return res.json();
            throw new Error("Authentication failed.");
         })
         .then((resObject) => {
            setUser(resObject.user);
            sessionStorage.setItem("USER", JSON.stringify(resObject.user));
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <>
         <BrowserRouter>
            <Navbar user={user} setUser={setUser} />
            <Routes>
               <Route path="/" element={<Home user={user} />} />

               <Route
                  path="/register"
                  element={<Home reqPath={"register"} />}
               />
               <Route path="/login" element={<Home reqPath={"login"} />} />

               {user && (
                  <>
                     <Route
                        path="/user"
                        element={<List user={user} setUser={setUser} />}
                     />
                     <Route
                        path="/user/:listTitle"
                        element={<List user={user} setUser={setUser} />}
                     />
                  </>
               )}

               {/* <Route path="/:anything" element={<Notfound />} /> */}
            </Routes>
            <Footer />
         </BrowserRouter>
      </>
   );
}
