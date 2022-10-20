import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Item from "../components/Item";
import _ from "lodash";

const List = (props) => {
   // const [newList, setNewList] = useState("");
   // const [newItem, setNewItem] = useState({ name: "", status: false });
   const newList = useRef();
   const newItem = useRef();

   const [error, setError] = useState(null);

   const currentPath = useParams();
   const [currentIndex, setcurrentIndex] = useState(-1);

   useEffect(() => {
      if (props.user && currentPath.listTitle) {
         console.log("inside UseEffect for grabbing selected Index");

         if (props.lists.length === 0) {
            const selectedListIndex = props.user.lists.findIndex((list) => {
               return list.title === currentPath.listTitle;
            });
            setcurrentIndex(selectedListIndex);
         } else {
            const selectedListIndex = props.lists.findIndex((list) => {
               return list.title === currentPath.listTitle;
            });
            setcurrentIndex(selectedListIndex);
         }
      }
   }, [currentPath.listTitle]);

   const addItem = (e) => {
      e.preventDefault();

      fetch("/api", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: props.user._id,
            listTitle: currentPath.listTitle,
            item: { name: newItem.current.value, status: false },
         }),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("Failed to add item.");
            }
            return res.json();
         })
         .then((resObject) => {
            props.setLists(resObject.result.lists);
         })
         .then((newItem.current.value = ""))
         .catch((err) => {
            setError(err.message);
            console.log(error);
         });
   };

   const deleteItem = (itemName) => {
      fetch("/api", {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            userId: props.user._id,
            listIndex: currentIndex,
            itemName: itemName,
         }),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error(
                  "Issue with HTTP request. Failed to delete Item."
               );
            }
            return res.json();
         })
         .then((resObject) => {
            props.setLists(resObject.result.lists);
         })
         .catch((err) => {
            setError(err.message);
            console.log(error);
         });
   };

   // Toggle checkbox functionality
   const handleCheckbox = async (itemId, status) => {
      const patchedData = {
         userId: props.user._id,
         listIndex: currentIndex,
         itemId: itemId,
         status: status,
      };

      try {
         await fetch("/api", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patchedData),
         })
            .then((res) => {
               if (!res.ok) {
                  throw new Error("Failed to add item.");
               }
               return res.json();
            })
            .then((resObject) => {
               props.setLists(resObject.result.lists);
            });
      } catch (err) {
         setError(err);
         console.log(error);
      }
   };

   // New item creation.
   // function newItemData(e) {
   //    const { value } = e.target;
   //    setNewItem({
   //       name: _.capitalize(value),
   //       status: false,
   //    });
   // }

   // // New List creation.
   // function newListData(e) {
   //    const { value } = e.target;
   //    setNewList(_.capitalize(value));
   // }

   const addNewList = (e) => {
      // window.location.reload();
      e.preventDefault();
      fetch("/api/list", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: props.user._id,
            listTitle: _.capitalize(newList.current.value),
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
         .then((newList.current.value = ""))
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <>
         {currentPath.listTitle && currentIndex !== -1 ? (
            // Check if path == '/user/:listTitle' otherwise path is '/user'
            // And if user is loaded before trying to render his list.
            // CurrentIndex is the list location inside lists Array.
            <ListWrapper className="list-wrapper">
               <Box className="box box-title">
                  <h1>{currentPath.listTitle}</h1>
               </Box>

               <Box className="box box-items">
                  {props.lists.length === 0 ? (
                     <>
                        {props.user.lists[currentIndex].items.map(
                           (item, index) => {
                              return (
                                 <Item
                                    key={index}
                                    item={item}
                                    handleCheckbox={handleCheckbox}
                                    deleteItem={deleteItem}
                                 />
                              );
                           }
                        )}
                     </>
                  ) : (
                     <>
                        {props.lists[currentIndex].items.map((item, index) => {
                           return (
                              <Item
                                 key={index}
                                 item={item}
                                 handleCheckbox={handleCheckbox}
                                 deleteItem={deleteItem}
                              />
                           );
                        })}
                     </>
                  )}

                  <form className="item newitem">
                     <input
                        type="text"
                        name="name"
                        placeholder="New Item"
                        autoComplete="off"
                        required={true}
                        autoFocus={true}
                        ref={newItem}
                        // onChange={newItemData}
                        // value={newItem.name}
                     />
                     <button
                        className="btn btn-add"
                        onClick={addItem}
                        // disabled={
                        // newItem.current.value === undefined ? true : true
                        // }
                     >
                        Add
                     </button>
                  </form>
               </Box>
            </ListWrapper>
         ) : (
            // else "/user"
            <ListWrapper>
               <form className="new-list-wrapper">
                  <input
                     type="text"
                     placeholder="Title"
                     required={true}
                     autoFocus={true}
                     ref={newList}
                     // onChange={newListData}
                     // value={newList}
                  />
                  <button
                     className="btn-submit"
                     type="submit"
                     onClick={addNewList}
                  >
                     Add List
                  </button>
               </form>
            </ListWrapper>
         )}
      </>
   );
};

const ListWrapper = styled.div`
   max-width: 1024px;
   min-height: 800px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 100px 10px 100px 10px;
   text-align: center;

   .new-list-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      margin: 0 auto;
      min-width: 200px;

      input {
         height: 50px;
         width: 100%;
         border: 1px solid lightgray;
         border-radius: 4px;
         font-size: 18px;
         outline: none;
         padding: 15px;
      }
      button {
         height: 50px;
         width: 100%;
         border: 3px solid #cdcdcd;
         color: #3f3e3e;
         border-radius: 4px;
         font-size: 18px;
         background-color: #e1e0e0;
      }
   }
`;

const Box = styled.div`
   min-width: 300px;
   width: 100%;
   max-width: 550px;
   text-align: center;
   margin: 40px auto;
   border-radius: 5px;
   background-color: #f5f5f5;
   box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);

   h1 {
      padding: 10px;
      overflow-x: hidden;
      width: calc(100% - 10px);
   }

   .item {
      display: flex;
      align-items: center;
      min-height: 60px;
      font-size: 20px;
      position: relative;
      border-bottom: 1px solid #bababa;
      position: relative;

      .item:last-child {
         border-bottom: none;
      }

      p {
         font-size: 20px;
         font-weight: 200;
         text-align: left;
         word-break: normal;
         line-height: 1.35;
         padding: 15px 0;
         width: 72%;

         @media (min-width: 768px) {
            width: 82%;
         }
      }

      .btn {
         display: flex;
         align-items: center;
         justify-content: center;
         background-color: #a683e3;
         color: #fff;
         border: none;
         border-color: transparent;
         cursor: pointer;
         width: 15px;
         height: 15px;
      }

      .btn-remove {
         position: absolute;
         right: 10px;
         width: 20px;
         height: 18px;
         font-size: 16px;
         border-radius: 5px;
      }

      .btn-add {
         width: 50px;
         height: 50px;
         border-radius: 100%;
         border-color: transparent;
      }

      .btn-submit {
         cursor: pointer;
      }
   }

   input {
      margin: 0 20px;
   }

   input[type="checkbox"]:hover {
      cursor: pointer;
   }

   input[type="text"] {
      height: 50px;
      border-color: transparent;
      background-color: #f5f5f5;
      text-align: center;
      border: none;
      font-size: 20px;
      width: 65%;

      @media (min-width: 768px) {
         width: 75%;
      }
   }

   input:checked + p {
      text-decoration: line-through;
      text-decoration-color: #a683e3;
   }

   input[type="text"]:focus {
      outline: none;
      box-shadow: inset 0 -3px 0 0 #a683e3;
   }

   ::placeholder {
      color: grey;
      opacity: 1;
      font-size: 20px;
   }
`;

export default List;
