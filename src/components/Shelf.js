import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";

import booksData from "../booksData.json";
import Categories from "./Categories";
import ToHome from "./ToHome";
import EmptyHome from "./EmptyHome";
import { BookView } from "../features/book/BookView";

//icons
import {
  BsStarFill,
  BsStar,
  BsStarHalf,
  BsThreeDots,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";

//store
import {
  addToFavorites,
  removeFromFavorites,
  bookOnshelf,
} from "../features/shelf/shelfSlice";

import { clearGenre, listOfGenre } from "../features/genre/genreSlice";

import {
  currentPath,
  newPath,
  prevPath,
  savePath,
} from "../features/path/pathSlice";

import { addBook, removeBook, activeBook } from "../features/book/bookSlice";

import {
  newSearch,
  clearSearch,
  currentSearch,
} from "../features/search/searchSlice";

import "./Home.css";

export default function Shelf() {
  const [booksLength, setBooksLength] = useState(20);
  const [rowLength, setRowLength] = useState(4);
  const dispatch = useDispatch();
  const shelf = useSelector(state => state.shelf.bookOnShelf);
  const listOfGenre = useSelector(state => state.genre.listOfGenre);

  const prevPath = useSelector(state => state.path.prevPath);
  const location = useLocation();

  // useEffect(() => {
  // dispatch(savePath(location.pathname));
  // }, []);

  //   let testData = booksData.test;
  //   let shelf = testData.filter((item, index) => index < 20);

  // const data = shelf;
  ////
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState([]);

  const updateBookshelf = () => {
    if (listOfGenre.length === 0) {
      setData(shelf);
    } else {
      setData([]);
      shelf.filter((item, index) => {
        //every > Strict
        // if (listOfGenre.every(cat => item.genre.includes(cat))) {
        //   setData(prev => [...prev, item]);
        // }

        //some
        if (listOfGenre.some(cat => item.genre.includes(cat))) {
          setData(prev => [...prev, item]);
        }
      });
    }
  };

  useEffect(() => {
    updateBookshelf();
  }, [listOfGenre, shelf]);
  ////
  const [itemOnHover, setItemOnHover] = useState(false);
  const [itemID, setItemID] = useState("");

  //// search logic
  const currentSearch = useSelector(state => state.search.currentSearch);
  const [searchParams, setSearchParams] = useSearchParams();
  const showQuestions = searchParams.get("q");

  useEffect(() => {
    if (currentSearch.length > 0) {
      setSearchParams({ q: currentSearch });
    } else {
      setSearchParams({});
    }
  }, [currentSearch]);

  useEffect(() => {
    if (showQuestions != null && showQuestions.length > 0) {
      dispatch(newSearch(showQuestions));
    }
  }, [showQuestions]);

  useEffect(() => {
    if (currentSearch.length === 0) {
      setData(shelf);
    } else {
      setData([]);
      shelf.filter((item, index) => {
        if (
          item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.author.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(currentSearch.toLowerCase())
        ) {
          setData(prev => [...prev, item]);
        }
      });
    }
  }, [currentSearch]);

  ////

  //// book logic
  const activeBook = useSelector(state => state.book.activeBook);
  const showBook = searchParams.get("book");
  useEffect(() => {
    if (activeBook.id != undefined) {
      setSearchParams({
        book: `${activeBook.title.toLowerCase()}-${activeBook.id}`,
      });
    } else {
      setSearchParams({});
    }
  }, [activeBook]);

  // useEffect(() => {
  //   console.log(showBook);
  // }, [showBook]);

  useEffect(() => {
    //   // URL
    if (showBook != null && showBook.length > 0) {
      // dispatch(addBook(showBook));
      // console.log(showBook);
      const [bookTitle, bookId] = showBook.split("-");
      shelf.filter((item, index) => {
        if (item.title.toLowerCase() === bookTitle && item.id && bookId) {
          dispatch(addBook(item));
        }
      });
    }
  }, [showBook]);

  ////
  let itemStyle = {
    // borderTop: "1px solid white",
  };

  const itemHoverColor = e => {
    setItemOnHover(true);
    if (e.target.nextSibling === null) {
      setItemID(`itemID${data.length}`);
      // console.log(itemID);
    } else {
      setItemID(e.target.nextSibling.id);
    }
    // console.log(itemID);
  };
  // console.log(data.length);

  const itemUnHoverColor = e => {
    setItemOnHover(false);
    setItemID("");
    // console.log(itemOnHover);
  };

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
  let tabletWidth = 930;
  let smallTableWidth = 780;
  let mobileWidth = 546;

  useEffect(() => {
    if (screenSize.dynamicWidth > tabletWidth) {
      setBooksLength(20);
      setRowLength(4);
      // setPaginationLength(Math.round(testData.length / booksLength));
      // setPaginationLength(Math.round(500 / booksLength));
      setIsMobile(false);
    } else if (
      screenSize.dynamicWidth <= tabletWidth &&
      screenSize.dynamicWidth > smallTableWidth
    ) {
      setBooksLength(20);
      setRowLength(4);
      // setPaginationLength(Math.round(testData.length / booksLength));
      setIsMobile(false);
    } else if (
      screenSize.dynamicWidth <= smallTableWidth &&
      screenSize.dynamicWidth > mobileWidth
    ) {
      setBooksLength(18);
      setRowLength(3);
      // setPaginationLength(Math.round(testData.length / booksLength));
      setIsMobile(false);
    } else if (screenSize.dynamicWidth <= mobileWidth) {
      setBooksLength(20);
      setRowLength(2);
      // setPaginationLength(Math.round(testData.length / booksLength));
      setIsMobile(true);
    }
  }, []);

  let rowStyle = "";
  let columnStyle = "";
  if (data.length > 15) {
    columnStyle = "repeat(4, 1fr)";
    rowStyle = "repeat(4, 1fr)";
  } else if (data.length >= 10 && data.length <= 15) {
    columnStyle = "repeat(3, 1fr)";
    rowStyle = "repeat(3, 1fr)";
  } else if (data.length > 5 && data.length <= 9) {
    columnStyle = "repeat(3, 1fr)";
    rowStyle = "repeat(2, 1fr)";
  } else if (data.length > 2 && data.length <= 5) {
    columnStyle = "repeat(3, 1fr)";
    rowStyle = "repeat(1, 1fr)";
  } else if (data.length > 1 && data.length <= 2) {
    columnStyle = "repeat(2, 1fr)";
    rowStyle = "repeat(1, 1fr)";
  } else if (data.length === 1) {
    columnStyle = "repeat(1, 1fr)";
    rowStyle = "repeat(1, 1fr)";
  }

  if (screenSize.dynamicWidth < smallTableWidth) {
    columnStyle = "repeat(2, 1fr)";
    rowStyle = "repeat(1, 1fr)";

    if (data.length === 1) {
      columnStyle = "repeat(1, 1fr)";
      rowStyle = "repeat(1, 1fr)";
    }
  }

  let booksContainerStyle = {
    gridTemplateRows: rowStyle,
    gridTemplateColumns: columnStyle,
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

  return (
    <>
      {activeBook.id !== undefined ? (
        <BookView />
      ) : (
        <div>
          <motion.section className="shelfSection">
            <ToHome />

            {shelf.length > 0 ? (
              <>
                <div className="header">
                  <h1>Bookshelf</h1>
                  {/* <div className="line"></div> */}
                </div>
                <div className="main wrapper">
                  <Categories mode="dark" list={shelf} />
                  {data.length > 0 ? (
                    <div
                      className="books-container"
                      style={booksContainerStyle}
                    >
                      {data.map((book, index) => {
                        return (
                          <div
                            onMouseEnter={itemHoverColor}
                            onMouseLeave={itemUnHoverColor}
                            key={index}
                            id={`itemID${index}`}
                            className="item"
                            style={itemStyle}
                            onClick={itemHoverColor}
                          >
                            {itemOnHover &&
                            `itemID${index < 20 ? index + 1 : index}` ===
                              itemID ? (
                              <>
                                <motion.div
                                  className="itemOverlay"
                                  initial={{ opacity: 0.5 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                ></motion.div>
                                <motion.div
                                  className="overlayContainer"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    x: 0,
                                    y: -15,
                                    opacity: 1,
                                  }}
                                  exit={{ opacity: 0 }}
                                >
                                  <motion.div
                                    onClick={e => {
                                      const foundItem = shelf.includes(book);

                                      if (!foundItem) {
                                        dispatch(addToFavorites(book));
                                      } else {
                                        dispatch(removeFromFavorites(book.id));
                                        // dispatch(clearGenre());
                                        shelf.forEach(element => {
                                          listOfGenre.forEach(gen => {
                                            if (!element.genre.includes(gen)) {
                                              dispatch(clearGenre());
                                            }
                                          });
                                        });
                                      }
                                      // console.log(book);
                                    }}
                                    id={`fav${index}`}
                                    // style={favoriteStyle}
                                    // onMouseEnter={() => {}}
                                    whileHover={{
                                      scale: 1.3,
                                      color: "hsla(26, 90%, 56%, 1)",
                                    }}
                                    whileTap={{ scale: 1 }}
                                    style={{
                                      color: shelf.includes(book)
                                        ? "hsla(26, 90%, 56%, 1)"
                                        : "hsl(213, 16%, 14%)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <MdFavorite />
                                  </motion.div>

                                  <motion.div
                                    whileHover={{
                                      scale: 1.3,
                                      color: "hsla(26, 90%, 56%, 1)",
                                    }}
                                    onClick={() => {
                                      dispatch(addBook(book));
                                    }}
                                    whileTap={{ scale: 1 }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <BsFillArrowRightCircleFill />
                                  </motion.div>
                                </motion.div>
                              </>
                            ) : (
                              ""
                            )}
                            <img
                              src={book.image}
                              alt={book.title}
                              style={{
                                width:
                                  screenSize.dynamicWidth < 390
                                    ? data.length === 1
                                      ? "11rem"
                                      : "90%"
                                    : screenSize.dynamicWidth < mobileWidth &&
                                      data.length === 1
                                    ? "11rem"
                                    : "11rem",
                              }}
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
                                                  ? ".8rem"
                                                  : "1rem"
                                              }`
                                            : "1rem"
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
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyHome />
                  )}
                </div>
              </>
            ) : (
              <div className="emptyShelf">
                <motion.div
                  className="shelfStyle"
                  initial={{ opacity: 0, y: -500, x: 500, rotate: 180 }}
                  animate={{
                    x: 0,
                    y: -15,
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{ opacity: 0 }}
                >
                  {screenSize.dynamicWidth > 440 ? (
                    <motion.span>
                      <GiBookshelf />
                    </motion.span>
                  ) : (
                    ""
                  )}
                  <h1>Bookshelf is empty</h1>
                </motion.div>
              </div>
            )}
          </motion.section>
        </div>
      )}
    </>
  );
}
