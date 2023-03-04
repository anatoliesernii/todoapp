import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaClipboardList } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";

const Navbar = (props) => {
   const SERVER_URL =
      process.env.NODE_ENV === "development"
         ? "http://localhost:5000"
         // : "https://todoapp-anatolie.herokuapp.com";
         : "https://todoapp.webcrafters.gr";

   const [expandedLists, setExpandedLists] = useState(false);
   const openLists = () => {
      setExpandedLists(!expandedLists);
   };
   const [expandedMenu, setExpandedMenu] = useState(false);
   const openMenu = () => {
      setExpandedMenu(!expandedMenu);
   };

   const closeAll = () => {
      setExpandedLists(false);
      setExpandedMenu(false);
   };
   const [timeNow, setTimeNow] = useState(new Date().toLocaleString());

   useEffect(() => {
      let secTimer = setInterval(() => {
         setTimeNow(new Date().toLocaleString());
      }, 1000);

      return () => clearInterval(secTimer);
   }, []);

   const logout = () => {
      // Manual Clear SessionStorage during logout.
      sessionStorage.removeItem("USER");
      window.open(`${SERVER_URL}/auth/logout`, "_self");
   };

   return (
      <HeaderWrapper>
         <Logo to={props.user ? "/user" : "/"}>
            <FaClipboardList />
            <h1>ToDoApp</h1>
         </Logo>
         {props.user && (
            <div className="menu-toggler" onClick={openMenu}>
               {expandedMenu ? <GrClose /> : <GiHamburgerMenu />}
            </div>
         )}
         <Actions
            className={`actions ${
               expandedMenu ? "visible-menu" : "hidden-menu"
            } `}
         >
            {props.user && (
               <>
                  <Timer className="timer action">
                     <BsCalendarDate />
                     <span>{timeNow}</span>
                  </Timer>

                  <Lists className="lists action" onClick={openLists}>
                     <span>
                        <GiOpenBook />
                        My Lists
                        {expandedLists ? (
                           <MdOutlineKeyboardArrowUp />
                        ) : (
                           <MdOutlineKeyboardArrowDown />
                        )}
                     </span>

                     <ListsBucket
                        className={`listbucket ${
                           expandedLists ? "visible-lists" : "hidden-lists"
                        }`}
                     >
                        {props.user.lists.map((list, index) => {
                           return (
                              <ListItem
                                 key={index}
                                 user={props.user}
                                 list={list}
                                 setUser={props.setUser}
                                 closeAll={closeAll}
                              />
                           );
                        })}

                        <li className="list-new-item" onClick={closeAll}>
                           <Link to={"/user"}>
                              <MdOutlineAddToPhotos />
                              <span>Add List</span>
                           </Link>
                        </li>
                     </ListsBucket>
                  </Lists>

                  <li className="user-info action">
                     {props.user.googleImg ? (
                        <img alt="" src={props.user.googleImg} />
                     ) : (
                        <MdAccountCircle />
                     )}
                     {/* <img alt="" src={props.user.googleImg} /> */}

                     {props.user.displayName}
                  </li>

                  <Logout className=" logout action" onClick={logout}>
                     <MdLogout />
                     <span>Logout</span>
                  </Logout>
               </>
            )}
         </Actions>
      </HeaderWrapper>
   );
};

const HeaderWrapper = styled.div`
   background-color: #fdfdfe;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 25px;

   .menu-toggler {
      display: none;

      svg {
         font-size: 30px;
         color: #282828;
      }

      @media (max-width: 1079px) {
         display: flex;
      }
   }

   @media (max-width: 1079px) {
      .visible-menu {
         display: block;
         z-index: 1;
      }

      .hidden-menu {
         display: none;
      }
   }
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

const Actions = styled.ul`
   display: flex;
   flex-direction: row;
   font-size: 22px;
   font-weight: 500;

   li {
      list-style: none;
   }

   .visible-lists {
      display: block;
   }

   .hidden-lists {
      display: none;
   }

   background-color: white;
   position: absolute;
   top: 60px;
   left: 0;
   width: 100%;

   .action {
      display: flex;
      align-items: center;
      padding: 10px 16px;

      border-top: 2px solid lightgray;

      :last-child {
         /* border-bottom: 2px solid lightgray; */
      }

      span {
         display: flex;
         align-items: center;
      }
      :nth-child(2) {
         flex-direction: column;
         justify-content: center;
         align-items: flex-start;
      }

      svg {
         /* margin-right: 5px; */
         font-size: 30px;
         min-width: 30px;
      }
   }

   .timer,
   .user-info,
   .logout {
      svg {
         margin-right: 5px;
      }
   }

   .user-info {
      img {
         width: 40px;
         height: 40px;
         border-radius: 100%;
         margin-right: 5px;
      }
   }

   @media (min-width: 1080px) {
      position: relative;
      top: 0;
      justify-content: flex-end;

      .action {
         border: 0;
      }

      .lists {
         position: relative;
      }
      .listbucket {
         background-color: white;
         position: absolute;
         top: 50px;
         left: 0;
         padding: 2px 7px;
         border-radius: 3px;
         min-width: 330px;
      }
   }
`;

const Timer = styled.li`
   svg {
      color: green;
      font-size: 17px;
   }
`;

const Lists = styled.li`
   cursor: pointer;

   span svg {
      margin-right: 5px;
   }
`;

const ListsBucket = styled.ul`
   width: 100%;

   li {
      display: flex;
      align-items: center;
      background-color: #ebebeb;
      padding: 4px 4px 4px 2px;
      margin: 5px 0;
      border-radius: 4px;

      .delete {
         margin: 0 0 0 auto;
      }
   }

   li a {
      color: black;
      display: flex;
      align-items: center;
      text-decoration: none;
      overflow-x: hidden;

      svg {
         margin-right: 5px;
      }
   }
`;

const Logout = styled.li`
   cursor: pointer;
   svg {
      font-size: 23px;
      color: red;
   }
`;

export default Navbar;
