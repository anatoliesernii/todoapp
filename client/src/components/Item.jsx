import React from "react";
import ItemSettings from "./ItemSettings";

const Item = (props) => {
   function handleChange(e) {
      const checkboxStatus = e.target.checked;
      props.handleCheckbox(props.item._id, checkboxStatus);
   }

   function handleDelete() {
      props.deleteItem(props.item.name);
      // if i pass item_id for some reason it won't delete it...
   }
   function handleUp() {
      props.moveUpItem(props.item._id);
   }
   function handleDown() {
      props.moveDownItem(props.item._id);
   }

   return (
      <div className="item">
         <input
            type="checkbox"
            className="checkbox"
            checked={props.item.status}
            onChange={handleChange}
         />
         <p>{props.item.name}</p>
         <ItemSettings
            handleDelete={handleDelete}
            handleUp={handleUp}
            handleDown={handleDown}
         />
      </div>
   );
};

export default Item;
