import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookOnShelf } from "./shelfSlice";

import { GiBookshelf } from "react-icons/gi";
import { BsFillCircleFill } from "react-icons/bs";

import "./shelf.css";

export const ShelfView = () => {
  const shelf = useSelector(state => state.shelf.bookOnShelf);
  return (
    <div className="shelf">
      <GiBookshelf />
      <span className="shelfCircle">
        <BsFillCircleFill />
        <div className="shelfLength">{shelf.length}</div>
      </span>
    </div>
  );
};
