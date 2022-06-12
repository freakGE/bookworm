import React from "react";
import { motion } from "framer-motion";
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
      <motion.span className="shelfCircle" whileTap={{ scale: 0.95 }}>
        <BsFillCircleFill />
        <motion.div className="shelfLength">{shelf.length}</motion.div>
      </motion.span>
    </div>
  );
};
