import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcLock } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";

const Home = (props) => {
   const SERVER_URL =
      process.env.NODE_ENV === "development"
         ? "http://localhost:5000"
         : "https://todoapp-anatolie.herokuapp.com";

   const [hidden, setHidden] = useState(true);

   function handleHidden() {
      setHidden(!hidden);
   }

   const googleLogin = () => {
      window.open(`${SERVER_URL}/auth/google`, "_self");
   };
   const facebookLogin = () => {
      window.open(`${SERVER_URL}/auth/facebook`, "_self");
   };

   return (
      <>
         {!props.user ? (
            <HomeWrapper>
               <div className="container">
                  <div className="welcome-title">
                     <FcLock />
                     <h1>Welcome</h1>
                  </div>
                  <form
                     action={
                        props.reqPath === "register"
                           ? `${SERVER_URL}/auth/register`
                           : `${SERVER_URL}/auth/login`
                     }
                     method="POST"
                  >
                     <div className="email">
                        <input
                           type="email"
                           placeholder="Email address"
                           name="username"
                           required={true}
                        />
                     </div>
                     <div className="password">
                        <input
                           type={hidden === true ? "password" : "text"}
                           placeholder="Password"
                           name="password"
                           required={true}
                        />
                        {hidden === true ? (
                           <AiOutlineEye onClick={handleHidden} />
                        ) : (
                           <AiOutlineEyeInvisible onClick={handleHidden} />
                        )}
                     </div>
                     {props.reqPath === "register" ? (
                        <div className="nickname">
                           <input
                              type="text"
                              placeholder="Nick name"
                              name="displayName"
                              required={true}
                           />
                        </div>
                     ) : (
                        ""
                     )}
                     <Button type="submit">
                        {props.reqPath === "register" ? "Register" : "Log In"}
                     </Button>
                  </form>

                  <div className="sign-up">
                     <span>Don't have an account?</span>
                     <Link
                        to={props.reqPath === "register" ? "/" : "/register"}
                     >
                        {props.reqPath === "register" ? "Sign In" : "Sign Up"}
                     </Link>
                  </div>

                  <div className="liner">
                     <span>OR</span>
                  </div>

                  <Button className="google" onClick={googleLogin}>
                     <FcGoogle />
                     <span>Continue with Google</span>
                  </Button>
                  <Button className="facebook" onClick={facebookLogin}>
                     <GrFacebook />
                     <span>Continue with Facebook</span>
                  </Button>
               </div>
            </HomeWrapper>
         ) : (
            <div>Welcome, alrdy signed in</div>
         )}
      </>
   );
};

const HomeWrapper = styled.div`
   max-width: 1024px;
   margin: 0 auto;
   display: flex;
   justify-content: center;
   text-align: center;
   padding: 100px 10px 150px 10px;

   .container {
      background-color: white;
      min-width: 300px;
      max-width: 400px;
      width: 100%;
      border-radius: 6px;
      padding: 40px;
   }

   .welcome-title {
      svg {
         font-size: 50px;
      }
      h1 {
         margin: 10px 0;
      }
   }

   form {
      margin: 40px 0;

      div {
         margin: 10px 0;
      }

      input {
         height: 50px;
         width: 100%;
         /* margin-bottom: 12px; */
         border: 1px solid lightgray;
         border-radius: 4px;
         font-size: 18px;
         outline: none;
         padding: 15px;
         row-gap: 5px;
      }

      .password {
         position: relative;
         background-color: bisque;

         svg {
            position: absolute;
            top: 0;
            right: 10px;
            transform: translateY(50%);
            font-size: 26px;
            color: lightgray;
         }
      }

      button {
         margin-top: 20px;
         font-size: 18px;
         background-color: #ed8702;
         color: white;
      }
   }

   .sign-up {
      font-size: 17px;
      text-align: left;
      margin: 10px 0;

      a {
         font-size: 18px;
         margin-left: 10px;
         text-decoration: none;
         color: #ed8702;
      }
   }

   .liner {
      border-top: 1px solid lightgray;
      margin: 30px 0;
      position: relative;

      span {
         position: absolute;
         left: 50%;
         top: -20px;
         transform: translateX(-50%);
         background-color: white;
         width: 40px;
         height: 40px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   .google {
      text-decoration: none;

      /* div { */
      background-color: #e1e0e0;
      height: 50px;
      width: 100%;
      border: 3px solid #cdcdcd;
      border-radius: 4px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3f3e3e;

      svg {
         font-size: 32px;
         margin-right: 10px;
      }
      /* } */
   }
`;

const Button = styled.button`
   height: 50px;
   width: 100%;
   border-radius: 4px;
   border: none;
   cursor: pointer;
`;

export default Home;
