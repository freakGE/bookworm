import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import { clearGenre } from "../features/genre/genreSlice";
import {
  currentPath,
  newPath,
  prevPath,
  savePath,
} from "../features/path/pathSlice";
import { clearSearch } from "../features/search/searchSlice";
import { addBook, removeBook, activeBook } from "../features/book/bookSlice";

import "./Home.css";

export default function ToHome(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const prevPath = useSelector(state => state.path.prevPath);
  // console.log(this.context.router.isActive());
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
        to={
          props.forceHome
            ? "/"
            : location.search.length > 0
            ? location.pathname
            : "/"
        }
        onClick={() => {
          dispatch(clearGenre());
          dispatch(clearSearch());
          dispatch(removeBook());
          dispatch(
            newPath(
              props.forceHome
                ? "/"
                : location.search.length > 0
                ? location.pathname
                : "/"
            )
          );
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
