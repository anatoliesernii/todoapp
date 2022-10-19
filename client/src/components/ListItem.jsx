import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";

const ListItem = (props) => {
   const deleteList = () => {
      // window.location.reload();
      // e.preventDefault();
      fetch("/api/list", {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: props.user._id,
            listTitle: props.list.title,
         }),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("Issue with HTTP request. Failed to add List.");
            }
            return res.json();
         })
         .then((resObject) => {
            props.setLists(resObject.result.lists);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const getCompletedCount = () => {
      let completedCount = props.list.items.filter((item) => {
         return item.status === true;
      });
      return completedCount.length;
   };

   return (
      <li>
         <Link to={`/user/${props.list.title}`}>
            <IoIosArrowForward />
            <span>{props.list.title}</span>
            <Counter className="counter">
               <span style={{ color: "green" }}>({getCompletedCount()}/</span>
               <span>{props.list.items.length})</span>
               {/* {getCompletedCount() === props.list.items.length ? (
                  <GiPartyPopper className="full-tasks" />
               ) : (
                  ""
               )} */}
            </Counter>
         </Link>
         <span className="delete" onClick={deleteList}>
            <MdOutlineDeleteOutline />
         </span>
      </li>
   );
};

const Counter = styled.span`
   font-size: 15px;
   font-weight: 400;
   margin-left: 2px;

   /* .full-tasks {
      font-size: 15px;
   } */
`;

export default ListItem;
