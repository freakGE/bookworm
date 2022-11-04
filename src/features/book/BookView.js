import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";

import ToHome from "../../components/ToHome";
import { addBook, removeBook, activeBook } from "./bookSlice";
import {
  addToFavorites,
  removeFromFavorites,
  bookOnshelf,
} from "../shelf/shelfSlice";

import "./bookViewStyle.css";
import { motion } from "framer-motion";
import Slide from "../../components/Slide";

import { LazyLoadImage } from "react-lazy-load-image-component";

export const BookView = () => {
  // const { bookId } = useParams();
  const dispatch = useDispatch();
  const shelf = useSelector(state => state.shelf.bookOnShelf);
  const activeBook = useSelector(state => state.book.activeBook);

  const descriptionRef = useRef();
  const [moreDescription, setMoreDescription] = useState(false);

  const [overflow, setOverflow] = useState(
    descriptionRef.current?.offsetHeight ===
      descriptionRef.current?.scrollHeight
  ); //false

  useEffect(() => {
    setOverflow(
      descriptionRef.current?.offsetHeight ===
        descriptionRef.current?.scrollHeight
    );
  }, [descriptionRef, moreDescription]);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  let mobileWidth = 600;

  //

  let descriptionStyle = {
    maxHeight:
      screenSize.dynamicWidth > mobileWidth
        ? moreDescription
          ? "max-content"
          : "16rem"
        : moreDescription
        ? "max-content"
        : "11.7rem", //9.4rem
  };

  function stars(rate) {
    let rating = parseFloat(rate);
    let [floor, spec] = rate.split(".");

    // console.log(floor, "--", spec);

    let star = ``;
    let full = <BsStarFill />;
    let half = <BsStarHalf />;
    let empty = <BsStar />;

    if (rating < 0.24) {
      star = (
        <span className="stars">
          {empty}
          {empty}
          {empty}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 0.25 && rating <= 0.74) {
      star = (
        <span className="stars">
          {half}
          {empty}
          {empty}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 0.75 && rating <= 1.24) {
      star = (
        <span className="stars">
          {full}
          {empty}
          {empty}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 1.25 && rating <= 1.74) {
      star = (
        <span className="stars">
          {full}
          {half}
          {empty}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 1.75 && rating <= 2.24) {
      star = (
        <span className="stars">
          {full}
          {full}
          {empty}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 2.25 && rating <= 2.74) {
      star = (
        <span className="stars">
          {full}
          {full}
          {half}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 2.75 && rating <= 3.24) {
      star = (
        <span className="stars">
          {full}
          {full}
          {full}
          {empty}
          {empty}
        </span>
      );
    } else if (rating >= 3.25 && rating <= 3.74) {
      star = (
        <span className="stars">
          {full}
          {full}
          {full}
          {half}
          {empty}
        </span>
      );
    } else if (rating >= 3.75 && rating <= 4.24) {
      star = (
        <span className="stars">
          {full}
          {full}
          {full}
          {full}
          {empty}
        </span>
      );
    } else if (rating >= 4.25 && rating <= 4.74) {
      star = (
        <span className="stars">
          {full}
          {full}
          {full}
          {full}
          {half}
        </span>
      );
    } else if (rating >= 4.75) {
      star = (
        <span className="stars">
          {full}
          {full}
          {full}
          {full}
          {full}
        </span>
      );
    }

    return star;
  }

  const [favStyle, setFavStyle] = useState({});

  useEffect(() => {
    setFavStyle({
      color: shelf.includes(activeBook)
        ? "hsla(26, 90%, 56%, 1)"
        : "hsl(213, 16%, 14%)",
      cursor: "pointer",
    });
  }, [shelf, activeBook, favStyle]);

  return (
    <section className="bookSection">
      <ToHome />
      {screenSize.dynamicWidth > mobileWidth ? (
        <div className="bookViewContainer">
          <div className="leftView">
            <div className="insideLeftView">
              <LazyLoadImage src={activeBook.image} alt={activeBook.title} />
              <motion.div
                onClick={e => {
                  const foundItem = shelf.includes(activeBook);
                  if (!foundItem) {
                    dispatch(addToFavorites(activeBook));
                  } else {
                    dispatch(removeFromFavorites(activeBook.id));
                  }
                }}
                id={`fav${activeBook.id}`}
                whileHover={{
                  scale: 1.3,
                  // color: "hsla(26, 90%, 56%, 1)",
                }}
                whileTap={{ scale: 1 }}
                style={favStyle}
                initial={{
                  opacity: 0.5,
                  y: -45,
                  zIndex: -2,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  zIndex: 0,
                }}
                exit={{ opacity: 0 }}
                className="unselectable"
              >
                <MdFavorite />
              </motion.div>
            </div>
            <div className="line"></div>
          </div>
          <div className="rightView">
            <h1>{activeBook.title}</h1>
            <p className="author">by {activeBook.author}</p>
            <h4 className="rating">
              {stars(activeBook.rating)}
              <span className="number">{activeBook.rating}</span>
            </h4>
            <p style={descriptionStyle} ref={descriptionRef}>
              {activeBook.description}

              <span
                className="more"
                style={{ position: moreDescription ? "static" : "absolute" }}
                onClick={() => setMoreDescription(!moreDescription)}
              >
                {!overflow ? "...more" : moreDescription ? "(less)" : ""}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bookViewContainer">
          <div className="mobileView">
            <div className="frontView">
              <div className="insideLeftView">
                <LazyLoadImage src={activeBook.image} alt={activeBook.title} />
              </div>
              <div className="line"></div>
              <div className="insideRightView">
                <h1>
                  {activeBook.title}
                  {screenSize.dynamicWidth < 560 ? (
                    ""
                  ) : (
                    <motion.span
                      onClick={e => {
                        const foundItem = shelf.includes(activeBook);
                        if (!foundItem) {
                          dispatch(addToFavorites(activeBook));
                        } else {
                          dispatch(removeFromFavorites(activeBook.id));
                        }
                      }}
                      id={`fav${activeBook.id}`}
                      whileHover={{
                        scale: 1.3,
                        // color: "hsla(26, 90%, 56%, 1)",
                      }}
                      whileTap={{ scale: 1 }}
                      style={{
                        color: shelf.includes(activeBook)
                          ? "hsla(26, 90%, 56%, 1)"
                          : "hsl(213, 16%, 14%)",
                        cursor: "pointer",
                      }}
                      initial={{ opacity: 0.5, y: -45, zIndex: -2 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        zIndex: 0,
                      }}
                      exit={{ opacity: 0 }}
                      className="unselectable"
                    >
                      <MdFavorite />
                    </motion.span>
                  )}
                </h1>
                <p className="author">by {activeBook.author}</p>
                <h4 className="rating">
                  {stars(activeBook.rating)}
                  <span className="number">{activeBook.rating}</span>
                </h4>
                {screenSize.dynamicWidth >= 560 ? (
                  ""
                ) : (
                  <motion.span
                    className="small-fav unselectable"
                    onClick={e => {
                      const foundItem = shelf.includes(activeBook);
                      if (!foundItem) {
                        dispatch(addToFavorites(activeBook));
                      } else {
                        dispatch(removeFromFavorites(activeBook.id));
                      }
                    }}
                    id={`fav${activeBook.id}`}
                    whileHover={{
                      scale: 1.3,
                      // color: "hsla(26, 90%, 56%, 1)",
                    }}
                    whileTap={{ scale: 1 }}
                    style={{
                      color: shelf.includes(activeBook)
                        ? "hsla(26, 90%, 56%, 1)"
                        : "hsl(213, 16%, 14%)",
                      cursor: "pointer",
                    }}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <MdFavorite />
                  </motion.span>
                )}
              </div>
            </div>
            <div className="backView">
              <p style={descriptionStyle} ref={descriptionRef}>
                {activeBook.description}
                <span
                  className="more"
                  style={{ position: moreDescription ? "static" : "absolute" }}
                  onClick={() => setMoreDescription(!moreDescription)}
                >
                  {!overflow ? "...more" : moreDescription ? "(less)" : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="lineX"></div>
      <h2
        style={{
          margin: moreDescription
            ? "1.25rem 0"
            : screenSize.dynamicHeight < 1000
            ? "1rem 0"
            : "0",
        }}
      >
        Readers also enjoyed
      </h2>
      <Slide activeBook={true} />
    </section>
  );
};
