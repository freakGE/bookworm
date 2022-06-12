import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import React from "react";

import booksData from "../booksData.json";
import Categories from "./Categories";

import "./Home.css";

import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Slide() {
  const [isMobile, setIsMobile] = useState(false);
  ///
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

  ///

  const [carouselWidth, setCarouselWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setCarouselWidth(
      carousel.current.scrollWidth - carousel.current.offsetWidth
    );
  }, []);

  //
  const [sliderAnimation, setSliderAnimation] = useState(0);

  //
  const data = booksData.books;

  let visibleSlides = 0;

  let tabletWidth = 930;
  let mobileWidth = 450;

  useEffect(() => {
    if (screenSize.dynamicWidth > tabletWidth) {
      visibleSlides = 4;
      setIsMobile(false);
    } else if (
      screenSize.dynamicWidth <= tabletWidth &&
      screenSize.dynamicWidth > mobileWidth
    ) {
      visibleSlides = 2;
      setIsMobile(false);
    } else if (screenSize.dynamicWidth <= mobileWidth) {
      visibleSlides = 1;
      setIsMobile(true);
    }
  }, []);

  let slideLength = 4;
  const prevBooks = data.filter(
    (item, number) => item.id > data.length - slideLength
  );

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

  const carouselStyle = {
    cursor: `${screenSize.dynamicWidth < 1150 ? "grab" : ""}`,
  };

  let size = isMobile ? 3 : 1;

  const slideLeft = () => {
    if (sliderAnimation >= 0) {
      setSliderAnimation(-screenSize.dynamicWidth * size);
    } else {
      setSliderAnimation(prev => prev + screenSize.dynamicWidth);
    }
  };

  const slideRight = () => {
    if (sliderAnimation === -screenSize.dynamicWidth * size) {
      setSliderAnimation(0);
    } else {
      setSliderAnimation(prev => prev - screenSize.dynamicWidth);
    }
  };

  return (
    <>
      <motion.div className="carousel-section">
        <motion.div
          ref={carousel}
          className="carousel"
          style={carouselStyle}
          whileTap={{
            cursor: `${screenSize.dynamicWidth <= 930 ? "grabbing" : ""}`,
          }}
        >
          {screenSize.dynamicWidth <= 930 ? (
            <>
              <motion.div className="arrow left" onClick={slideLeft}>
                <RiArrowLeftSLine />
              </motion.div>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -carouselWidth }}
                className="inner-carousel wrapper"
                animate={{ x: sliderAnimation }}
              >
                {prevBooks.map(book => (
                  <motion.div className="item" key={book.id}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="unselectable"
                    ></img>
                    <div className="card-cont">
                      <h3
                        style={{
                          fontSize: `${
                            book.title.length > 20
                              ? `${
                                  book.title.length > 25
                                    ? `${
                                        book.title.length > 35
                                          ? ".75rem"
                                          : ".85rem"
                                      }`
                                    : ".9rem"
                                }`
                              : "auto"
                          }`,
                        }}
                      >
                        {book.title}
                      </h3>
                      <h4>
                        {stars(book.rating)}
                        {book.rating}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div className="arrow right" onClick={slideRight}>
                <RiArrowRightSLine />
              </motion.div>
            </>
          ) : (
            <motion.div
              drag={screenSize.dynamicWidth < 1150 ? "x" : ""}
              dragConstraints={{ right: 0, left: -carouselWidth }}
              className="inner-carousel wrapper"
            >
              {prevBooks.map(book => (
                <motion.div className="item" key={book.id}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="unselectable"
                  ></img>
                  <div className="card-cont">
                    <h3
                      style={{
                        fontSize: `${
                          book.title.length > 20
                            ? `${
                                book.title.length > 25
                                  ? `${
                                      book.title.length > 35
                                        ? ".75rem"
                                        : ".85rem"
                                    }`
                                  : ".9rem"
                              }`
                            : "auto"
                        }`,
                      }}
                    >
                      {book.title}
                    </h3>
                    <h4>
                      {stars(book.rating)}
                      {book.rating}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <motion.div className="books-category">
        <div className="line"></div>
        <Categories mode="dark" list={booksData.test} />
      </motion.div>
    </>
  );
}
