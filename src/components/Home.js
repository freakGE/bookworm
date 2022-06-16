import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

import EmptyHome from "./EmptyHome";
import { BookView } from "../features/book/BookView";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch,
  useSearchParams,
  Navigate,
  useNavigate,
} from "react-router-dom";

import booksData from "../booksData.json";
import {
  BsStarFill,
  BsStar,
  BsStarHalf,
  BsThreeDots,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";

//store
import {
  addToFavorites,
  removeFromFavorites,
  bookOnshelf,
} from "../features/shelf/shelfSlice";

import {
  addGenre,
  removeGenre,
  clearGenre,
  listOfGenre,
} from "../features/genre/genreSlice";

import {
  newSearch,
  clearSearch,
  currentSearch,
} from "../features/search/searchSlice";

import {
  currentPath,
  newPath,
  prevPath,
  savePath,
} from "../features/path/pathSlice";

import { addBook, removeBook, activeBook } from "../features/book/bookSlice";

import { useParams, useLocation } from "react-router-dom";

import Slide from "./Slide";

export default function Home(props) {
  let booksDataList = booksData.books; //test

  ////

  const location = useLocation();
  useEffect(() => {
    dispatch(savePath(location.pathname));
  }, []);

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
    // URL
    if (showQuestions != null && showQuestions.length > 0) {
      dispatch(newSearch(showQuestions));
    }
    if (activeBook.id !== undefined) {
      dispatch(removeBook());
    }
  }, [showQuestions]);

  useEffect(() => {
    if (currentSearch.length === 0) {
      setTestData(booksDataList);
    } else {
      setTestData([]);
      booksDataList.filter((item, index) => {
        if (
          item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.author.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(currentSearch.toLowerCase())
        ) {
          setTestData(prev => [...prev, item]);
        }
      });
    }
  }, [currentSearch]);
  ////
  // book
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
      booksDataList.filter((item, index) => {
        if (item.title.toLowerCase() === bookTitle && item.id && bookId) {
          dispatch(addBook(item));
        }
      });
    }
  }, [showBook]);

  //// navigate book
  const navigate = useNavigate();
  ////

  const dispatch = useDispatch();
  const shelf = useSelector(state => state.shelf.bookOnShelf);
  const listOfGenre = useSelector(state => state.genre.listOfGenre);
  ////
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    if (listOfGenre.length === 0) {
      setTestData(booksDataList);
    } else {
      setTestData([]);
      booksDataList.filter((item, index) => {
        //every > strict
        // if (listOfGenre.every(cat => item.genre.includes(cat))) {
        //   setTestData(prev => [...prev, item]);
        // }

        //some
        if (listOfGenre.some(cat => item.genre.includes(cat))) {
          setTestData(prev => [...prev, item]);
        }
      });
    }
  }, [listOfGenre]);

  ////

  const [booksLength, setBooksLength] = useState(20);

  const [rowLength, setRowLength] = useState(4);

  const [currentPage, setCurrentPage] = useState(1); //default
  const [paginationLength, setPaginationLength] = useState(0);
  const [prevPageLength, setPrevPageLength] = useState(0);
  const [paginationArray, setPaginationArray] = useState([]);
  // const [dotsClicked, setDotsClicked] = useState(false);

  const booksContainerRef = useRef();

  // let paginationArray = [];

  useEffect(() => {
    setPaginationArray([]);
    for (let i = 0; i < paginationLength; i++) {
      setPaginationArray(prevArray => [...prevArray, i]);
    }
  }, [paginationLength]);

  useEffect(() => {
    setPaginationLength(Math.floor(testData.length / booksLength));
    // setPaginationLength(Math.round(500 / booksLength));
  }, [booksLength, testData.length]);

  // data = testData.filter((item, index) => x * booksLength )

  let dataSlicer = testData.slice(prevPageLength);

  // console.log(dataSlicer.length);

  let data = dataSlicer.filter((item, index) => index < booksLength);
  // data = testData;
  // const genres = testData;

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

  // data = data.slice(0,19);

  let tabletWidth = 930;
  let smallTableWidth = 780;
  let mobileWidth = 546;

  useEffect(() => {
    if (screenSize.dynamicWidth > tabletWidth) {
      setBooksLength(20);
      setRowLength(5);
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

  //// style
  // data length in page
  // console.log(data.length);

  // grid-template-rows: repeat(4, 1fr); //5, 1fr

  let rowStyle = "";
  let columnStyle = "";
  // if (data.length > 15) {
  //   rowStyle = "repeat(4, 1fr)";
  // } else if (data.length > 10 && data.length <= 15) {
  //   rowStyle = "repeat(3, 1fr)";
  // } else if (data.length > 5 && data.length <= 10) {
  //   rowStyle = "repeat(2, 1fr)";
  // } else if (data.length > 0 && data.length <= 5) {
  //   rowStyle = "repeat(1, 1fr)";
  // }

  if (data.length > 15) {
    columnStyle = "repeat(5, 1fr)";
    rowStyle = "repeat(1, 1fr)"; //4, 1fr
  } else if (data.length >= 10 && data.length <= 15) {
    columnStyle = "repeat(4, 1fr)";
    rowStyle = "repeat(1, 1fr)";
  } else if (data.length > 5 && data.length <= 9) {
    columnStyle = "repeat(4, 1fr)";
    rowStyle = "repeat(1, 1fr)";
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

  ////

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

  let itemStyle = {
    // borderTop: "1px solid white",
  };

  // item hover
  /////
  const [itemOnHover, setItemOnHover] = useState(false);
  const [itemID, setItemID] = useState("");

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

  /////

  // page switch
  /////
  const switchPage = e => {
    setCurrentPage(parseInt(e.target.textContent));
    setPrevPageLength(booksLength * currentPage);
  };

  /////
  //fav style

  const [isFavorited, setIsFavorited] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState(false);

  let favoriteStyle = {
    // color: isFavorited ? "hsl(26, 96%, 56%)" : "hsl(213, 16%, 14%)",
  };

  const handleFavorite = e => {
    // e.target.style.backgroundColor === "rgb(244, 129, 42)"
    if (e.target.style.color === "hsl(26, 96%, 56%)") {
      e.target.style.color = "hsl(213, 16%, 14%)";
    } else {
      e.target.style.color = "hsl(26, 96%, 56%)";
    }
  };
  /////

  return (
    <>
      {activeBook.id !== undefined ? (
        <BookView />
      ) : (
        <section className="home">
          <Slide />
          <div className="main wrapper">
            {testData.length > 0 ? (
              <div
                ref={booksContainerRef}
                className="books-container"
                style={booksContainerStyle}
              >
                {data.map((book, index) => {
                  // index += 1;

                  // console.log(index);
                  if (index > rowLength) {
                    itemStyle = {
                      // border: "1px solid hsl(180, 2%, 88%)",
                    };
                  }
                  if (data.length - rowLength < index) {
                    itemStyle = {
                      // borderBottom: "1px solid white",
                    };
                  }
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
                      `itemID${index < 20 ? index + 1 : index}` === itemID ? (
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
                                }
                                // console.log(book);
                              }}
                              id={`fav${index}`}
                              // style={favoriteStyle}
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
                              whileTap={{ scale: 1 }}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(addBook(book));
                              }}
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
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyHome />
            )}

            {testData.length > 20 ? ( //data.length > 20
              <div className="pagination wrapper unselectable">
                <div className="pageSwitcher">
                  <ul>
                    {currentPage === 1 ? (
                      ""
                    ) : (
                      <li
                        className="prev"
                        onClick={() => {
                          setCurrentPage(currentPage - 1);
                        }}
                      >
                        <Link to="">
                          <RiArrowLeftSLine />
                        </Link>
                      </li>
                    )}
                    <li
                      className={currentPage === 1 ? "active" : "page"}
                      onClick={switchPage}
                    >
                      <Link to="">1</Link>
                    </li>
                    {currentPage < 5 ? (
                      ""
                    ) : (
                      <li className="choose">
                        <Link to="">
                          <BsThreeDots />
                        </Link>
                      </li>
                    )}
                    {paginationArray.map((item, index) => {
                      index += 1;
                      if (index === 1 || index === paginationLength) {
                        return false;
                      } else if (
                        index < currentPage - 2 ||
                        index > currentPage + 2
                      ) {
                        return false;
                      } else {
                        return (
                          <li
                            className={
                              currentPage === index ? "active" : "page"
                            }
                            key={index}
                            onClick={switchPage}
                          >
                            <Link to="">{index}</Link>
                          </li>
                        );
                      }
                    })}
                    {paginationLength - 3 <= currentPage ? (
                      ""
                    ) : (
                      <li className="choose">
                        <Link to="">
                          <BsThreeDots />
                        </Link>
                      </li>
                    )}
                    <li
                      className={
                        currentPage === paginationLength ? "active" : "page"
                      }
                      onClick={switchPage}
                    >
                      <Link to="">{parseInt(paginationLength)}</Link>
                    </li>
                    {currentPage === paginationLength ? ( //15> lastPage
                      ""
                    ) : (
                      <li
                        className="next"
                        onClick={() => {
                          setCurrentPage(currentPage + 1);
                        }}
                      >
                        <Link to="">
                          <RiArrowRightSLine />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      )}
    </>
  );
}
