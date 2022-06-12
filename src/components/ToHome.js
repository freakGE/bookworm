import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import { clearGenre } from "../features/genre/genreSlice";
import { currentPath, newPath } from "../features/path/pathSlice";

import "./Home.css";

export default function ToHome() {
  const dispatch = useDispatch();
  return (
    <motion.div
      className="toHome"
      whileTap={{ scale: 0.8 }}
      initial={{
        x: -160,
        y: 15,
        opacity: 0.75,
        scale: 0.9,
      }}
      animate={{
        x: -80,
        y: 15,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <Link
        to="/"
        onClick={() => {
          dispatch(clearGenre());
          dispatch(newPath("/"));
        }}
      >
        <h2>
          <BiArrowBack />
          {/* <span>Home</span> */}
        </h2>
      </Link>
    </motion.div>
  );
}
