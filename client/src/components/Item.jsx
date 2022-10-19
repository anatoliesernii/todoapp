import React from "react";

export default function Item(props) {
   function handleChange(e) {
      const checkboxStatus = e.target.checked;
      props.handleCheckbox(props.item._id, checkboxStatus);
   }

   function handleDelete() {
      props.deleteItem(props.item.name);
      // if i pass item_id for some reason it won't delete it...
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
         <button className="btn btn-remove" onClick={handleDelete}>
            x
         </button>
      </div>
   );
}
