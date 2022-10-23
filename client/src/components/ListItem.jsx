import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ListItem = (props) => {
   const deleteList = () => {
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
            props.setUser(resObject.result);
            sessionStorage.setItem("USER", JSON.stringify(resObject.result));
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
      <ListIndividualItem className="list-item" onClick={props.closeAll}>
         <>
            <Link to={`/user/${props.list.title}`}>
               <IoIosArrowForward />
               <span className="list-title">{props.list.title}</span>
               <Counter className="counter">
                  <span style={{ color: "green" }}>
                     ({getCompletedCount()}/
                  </span>
                  <span>{props.list.items.length})</span>
                  {/* {getCompletedCount() === props.list.items.length ? (
                     <GiPartyPopper className="full-tasks" />
                  ) : (
                     ""
                  )} */}
               </Counter>
            </Link>
            <Link to={"/user"} className="delete" onClick={deleteList}>
               <MdOutlineDeleteOutline />
            </Link>
         </>
      </ListIndividualItem>
   );
};

const ListIndividualItem = styled.li`
   .list-title {
      width: 78%;
      margin-right: 5px;
      overflow-x: hidden;
   }
`;

const Counter = styled.span`
   font-size: 15px;
   font-weight: 400;
   margin-left: 2px;
`;

export default ListItem;
