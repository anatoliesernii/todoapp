import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";

const Navbar = (props) => {
   const [expanded, setExpanded] = useState(false);
   const openLists = () => {
      setExpanded(!expanded);
   };

   const [timeNow, setTimeNow] = useState(new Date().toLocaleString());

   useEffect(() => {
      let secTimer = setInterval(() => {
         setTimeNow(new Date().toLocaleString());
      }, 1000);

      return () => clearInterval(secTimer);
   }, []);

   const logout = () => {
      window.open(
         "https://todoapp-anatolie.herokuapp.com/auth/logout",
         "_self"
      );
   };

   return (
      <HeaderWrapper>
         <Logo to={props.user ? "/user" : "/"}>
            <FaClipboardList />
            <h1>ToDoApp</h1>
         </Logo>

         <Actions>
            {props.user && (
               <>
                  <CurrentList className="action">
                     <BsCalendarDate />
                     <span>{timeNow}</span>
                  </CurrentList>

                  <Lists className="action" onClick={openLists}>
                     <span>My Lists</span>
                     <MdOutlineKeyboardArrowDown />
                     {expanded ? (
                        <ListsBucket>
                           {props.lists.length === 0 ? (
                              <>
                                 {props.user.lists.map((list, index) => {
                                    return (
                                       <ListItem
                                          key={index}
                                          user={props.user}
                                          list={list}
                                          setLists={props.setLists}
                                       />
                                    );
                                 })}
                              </>
                           ) : (
                              <>
                                 {props.lists.map((list, index) => {
                                    return (
                                       <ListItem
                                          key={index}
                                          user={props.user}
                                          list={list}
                                          setLists={props.setLists}
                                       />
                                    );
                                 })}
                              </>
                           )}

                           <li>
                              <Link to={"/user"}>
                                 <MdOutlineAddToPhotos />
                                 <span>Add List</span>
                              </Link>
                           </li>
                        </ListsBucket>
                     ) : (
                        " "
                     )}
                  </Lists>

                  <div className="user-info">
                     {props.user.googleImg ? (
                        <img alt="" src={props.user.googleImg} />
                     ) : (
                        <MdAccountCircle />
                     )}
                     {/* <img alt="" src={props.user.googleImg} /> */}

                     {props.user.displayName}
                  </div>

                  <Logout className="action" onClick={logout}>
                     <span>Logout</span>
                  </Logout>
               </>
            )}
         </Actions>
      </HeaderWrapper>
   );
};

const HeaderWrapper = styled.div`
   background-color: #fff;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 13px 40px;
`;

const Logo = styled(Link)`
   display: flex;
   align-items: center;
   gap: 5px;
   color: black;
   text-decoration: none;
   svg {
      font-size: 40px;
   }
`;

const Actions = styled.div`
   display: flex;
   gap: 70px;
   font-size: 22px;
   font-weight: 500;

   .action {
      display: flex;
      align-items: center;
      gap: 5px;
   }

   .user-info {
      display: flex;
      align-items: center;
      gap: 5px;
      img {
         height: 40px;
         width: 40px;
         border-radius: 100%;
      }
      svg {
         font-size: 35px;
      }
   }
`;

const CurrentList = styled.div`
   svg {
      color: green;
      font-size: 17px;
   }
`;

const Lists = styled.div`
   position: relative;
   cursor: pointer;
`;

const ListsBucket = styled.ul`
   background-color: white;
   list-style: none;
   display: flex;
   flex-direction: column;

   width: 250px;
   position: absolute;
   top: 55px;
   left: 0;
   border-radius: 5px;
   padding: 12px;
   gap: 8px;
   font-size: 19px;
   z-index: 5;

   li {
      position: relative;
   }

   a {
      color: #353333;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 4px 2px;
      background-color: #dddddd6e;
      border-radius: 3px;

      svg {
         font-size: 18px;
         margin: 0 5px;
      }
   }

   .delete {
      position: absolute;
      top: 5px;
      right: 5px;
   }
`;

const Logout = styled.div`
   color: black;
   text-decoration: none;
   cursor: pointer;
   svg {
      font-size: 23px;
   }
`;

export default Navbar;
