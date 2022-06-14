import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import { clearGenre } from "../features/genre/genreSlice";
import { currentPath, newPath } from "../features/path/pathSlice";
import { clearSearch } from "../features/search/searchSlice";

import "./Home.css";

export default function ToHome() {
  const navigate = useNavigate();
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
          dispatch(clearSearch());
          dispatch(newPath("/"));
        }}
      >
        <h2>
          <BiArrowBack />
        </h2>
      </Link>
      {/* <button
        onClick={() => {
          dispatch(clearGenre());
          // dispatch(newPath("/"));
          navigate(-1);
        }}
      >
        <h2>
          <BiArrowBack />
        </h2>
      </button> */}
    </motion.div>
  );
}
