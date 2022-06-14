import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import React from "react";

import booksData from "../booksData.json";

import "./Home.css";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

//store
import {
  addGenre,
  removeGenre,
  listOfGenre,
} from "../features/genre/genreSlice";
import { useSearchParams, Link } from "react-router-dom";

export default function Slide(props) {
  const dispatch = useDispatch();

  //// search logic
  const listOfGenre = useSelector(state => state.genre.listOfGenre);

  const [searchParams, setSearchParams] = useSearchParams();
  const showCategories = searchParams.get("category");

  useEffect(() => {
    if (listOfGenre.length > 0) {
      setSearchParams({ category: listOfGenre.join(" ") });
    } else {
      setSearchParams({});
    }
  }, [listOfGenre]);

  useEffect(() => {
    // console.log(showCategories.split(" "));
    if (showCategories != null && showCategories.length > 0) {
      let urlCategories = showCategories.split(" ");

      urlCategories.forEach(cat => {
        dispatch(addGenre(cat));
      });
    }
  }, [showCategories]);
  ////
  //  Not changing on Unfavoriting // v1
  // const [data, setData] = useState(props.list);
  // const [categoryList, setCategoryList] = useState(data);
  // useEffect(() => {
  //   setData(props.list);
  //   setCategoryList(data);
  // }, [data, categoryList]);
  ////
  // Changing or every unfavorite // v2
  let categoryList = props.list;
  ////

  const [mode, setMode] = useState(props.mode);
  //   const genres = booksData.test;

  let genreArray = [];

  let listOfGenres = categoryList.map((item, index) => {
    for (let i = 0; i < item.genre.length; i++) {
      let newGenre = item.genre[i];
      genreArray.push(newGenre);
    }
  });
  // let genreCounter = {};
  // genreArray.forEach(element => {
  //   genreCounter[element] = (genreCounter[element] || 0) + 1;
  // });

  // const genreCounter = genreArray.reduce((item, value) => {
  //   return { ...item, [value]: (item[value] || 0) + 1 };
  // }, {});

  let genres = [...new Set(genreArray)]; // removes duplicates
  genres.sort((a, b) => {
    if (a < b) return -1;
    return 1;
  });

  /////

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

  const [genreHover, setGenreHover] = useState(false);
  const genre = useRef();

  let arrowWidth = 48;

  const [categorySelected, setCategorySelected] = useState(false);
  const [onHoverEffect, setOnHoverEffect] = useState(true);

  const [sliderAnimation, setSliderAnimation] = useState(0);

  const [categoryWidth, setCategoryWidth] = useState(0);
  const carousel = useRef();
  const innerCarousel = useRef();

  const [carouselScrollWidth, setCarouselScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    // setCarouselScrollWidth(carousel.current.scrollWidth);
    setCarouselScrollWidth(innerCarousel.current.clientWidth);
    setClientWidth(carousel.current.clientWidth);
  });

  useEffect(() => {
    setCategoryWidth(
      carousel.current.scrollWidth - carousel.current.offsetWidth
    );
  }, []);

  let size = 1;
  const slideLeft = () => {
    setSliderAnimation(prev => prev + innerCarousel.current.offsetWidth / 7);

    if (sliderAnimation >= 0 - arrowWidth * 4) {
      setSliderAnimation(0);
    }
  };

  const slideRight = () => {
    setSliderAnimation(prev => prev - innerCarousel.current.offsetWidth / 7);
    if (sliderAnimation <= -categoryWidth + arrowWidth * 6) {
      setSliderAnimation(-categoryWidth);
    }
  };

  let categoryStyle = {
    backgroundColor:
      mode === "dark" ? "hsl(213, 16%, 14%)" : "hsl(180, 2%, 88%)",
    color: mode === "dark" ? "hsl(180, 2%, 88%)" : "hsl(213, 16%, 14%)",

    borderRight:
      mode === "dark"
        ? "1px solid hsla(180, 2%, 88%, 0.3)"
        : "1px solid hsla(213, 16%, 14%, 0.3)",
  };

  const categorySelection = e => {
    if (listOfGenre.includes(e.target.textContent)) {
      dispatch(removeGenre(e.target.textContent));
    } else {
      dispatch(addGenre(e.target.textContent));
    }

    // if (listOfGenre.includes(e.target.textContent)) {
    //   if (mode === "dark") {
    //     e.target.style.backgroundColor = "hsl(213, 16%, 14%)";
    //     e.target.style.color = "hsl(180, 2%, 88%)";
    //   } else if (mode === "light") {
    //     e.target.style.backgroundColor = "hsl(180, 2%, 88%)";
    //     e.target.style.color = "hsl(213, 16%, 14%)";
    //   }
    // } else {
    //   e.target.style.backgroundColor = "hsl(26, 96%, 56%)";
    //   e.target.style.color = "hsl(213, 16%, 14%)";
    // }

    setCategorySelected(prev => !prev);
    setOnHoverEffect(prev => !prev);
  };

  const genreHoverColor = e => {
    if (
      e.target.style.backgroundColor === "rgb(251, 128, 35)" ||
      e.target.style.backgroundColor === "hsl(26, 96%, 56%)"
    ) {
      e.target.style.backgroundColor = "hsl(26, 90%, 56%)";
    }
    if (
      e.target.style.backgroundColor === "hsl(180, 2%, 88%)" ||
      e.target.style.backgroundColor === "rgb(224, 225, 225)"
    ) {
      e.target.style.backgroundColor = "hsl(180, 2%, 94%)";
    }

    if (
      e.target.style.backgroundColor === "hsl(213, 16%, 14%)" ||
      e.target.style.backgroundColor === "rgb(30, 35, 41)"
    ) {
      e.target.style.backgroundColor = "hsl(213, 16%, 18%)";
    }

    // e.target.style.backgroundColor = "hsl(180, 2%, 94%)";
  };

  const genreUnHoverColor = e => {
    if (
      e.target.style.backgroundColor === "hsl(26, 90%, 56%)" ||
      e.target.style.backgroundColor === "rgb(244, 129, 42)"
    ) {
      e.target.style.backgroundColor = "hsl(26, 96%, 56%)";
    }
    if (
      e.target.style.backgroundColor === "hsl(180, 2%, 94%)" ||
      e.target.style.backgroundColor === "rgb(239, 240, 240)"
    ) {
      e.target.style.backgroundColor = "hsl(180, 2%, 88%)";
    }

    if (
      e.target.style.backgroundColor === "hsl(213, 16%, 18%)" ||
      e.target.style.backgroundColor === "rgb(39, 45, 53)"
    ) {
      e.target.style.backgroundColor = "hsl(213, 16%, 14%)";
    }
    // e.target.style.backgroundColor = "hsl(180, 2%, 88%)";
  };

  let arrowLeftStyle = {
    display: sliderAnimation === 0 ? "none" : "inline-flex",
  };
  let arrowRightStyle = {
    display: sliderAnimation === -categoryWidth ? "none" : "inline-flex",
  };

  return (
    <motion.div
      ref={carousel}
      whileTap={{ cursor: "grabbing" }}
      className="books-carousel"
    >
      {carouselScrollWidth > clientWidth ? (
        <motion.div
          className="arrow left"
          onClick={slideLeft}
          style={arrowLeftStyle}
        >
          <RiArrowLeftSLine />
        </motion.div>
      ) : (
        ""
      )}
      <motion.div
        drag="x"
        dragConstraints={{
          right: 0,
          left: -categoryWidth - arrowWidth,
        }}
        animate={{ x: carouselScrollWidth > clientWidth ? sliderAnimation : 0 }}
        className="books-inner-carousel"
        ref={innerCarousel}
      >
        {genres.map((book, index) => {
          index += 1;
          if (listOfGenre.includes(book)) {
            return (
              <motion.button
                className="genre"
                key={index}
                id={index}
                style={{
                  backgroundColor: "hsl(26, 90%, 56%)",
                  color: "hsl(213, 16%, 14%)",
                  borderRight:
                    mode === "dark"
                      ? "1px solid hsla(180, 2%, 88%, 0.3)"
                      : "1px solid hsla(213, 16%, 14%, 0.3)",
                }}
                onClick={categorySelection}
                onMouseEnter={genreHoverColor}
                onMouseLeave={genreUnHoverColor}
                ref={genre}
              >
                {book}
              </motion.button>
            );
          } else {
            return (
              <motion.button
                className="genre"
                key={index}
                id={index}
                style={categoryStyle}
                onClick={categorySelection}
                onMouseEnter={genreHoverColor}
                onMouseLeave={genreUnHoverColor}
                ref={genre}
              >
                {book}
              </motion.button>
            );
          }
        })}
      </motion.div>
      {carouselScrollWidth > clientWidth ? (
        <motion.div
          className="arrow right"
          onClick={slideRight}
          style={arrowRightStyle}
        >
          <RiArrowRightSLine />
        </motion.div>
      ) : (
        ""
      )}
    </motion.div>
  );
}
