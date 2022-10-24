import React, { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { BsArrowDownShort } from "react-icons/bs";
import { BsArrowUpShort } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
// import { HiOutlinePencilAlt } from "react-icons/hi";
import styled from "styled-components";

const ItemSettings = (props) => {
   const [expandedItemSettings, setExpandedItemSettings] = useState(false);

   return (
      <Settings
         className="item-settings"
         onClick={() => {
            setExpandedItemSettings(!expandedItemSettings);
         }}
      >
         <div className="settings-icon">
            <FcSettings />
         </div>

         {expandedItemSettings ? (
            <div className="settings">
               <span className="arrow-up" onClick={props.handleUp}>
                  <BsArrowUpShort />
               </span>
               <span className="arrow-down" onClick={props.handleDown}>
                  <BsArrowDownShort />
               </span>
               <span className="remove-item" onClick={props.handleDelete}>
                  <MdOutlineDeleteOutline />
               </span>
            </div>
         ) : (
            ""
         )}
      </Settings>
   );
};

const Settings = styled.div`
   margin-right: 10px;
   margin-left: 35px;
   position: relative;

   svg {
      font-size: 22px;
   }

   .arrow-up,
   .arrow-down {
      svg {
         font-size: 28px;
      }
   }

   .settings-icon,
   .arrow-up,
   .arrow-down,
   .remove-item {
      border-radius: 100%;
      background-color: #a683e3;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
   }
   .settings-icon {
      background-color: white;
   }

   .arrow-up,
   .arrow-down,
   .remove-item {
      position: absolute;

      svg {
         color: white;
      }
   }

   .arrow-up {
      top: -30px;
      left: -17px;
   }

   .arrow-down {
      top: 30px;
      left: -17px;
   }

   .remove-item {
      top: 0;
      left: -33px;
   }
`;

export default ItemSettings;
