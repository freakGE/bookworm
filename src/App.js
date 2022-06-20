import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch,
  useLocation,
} from "react-router-dom";

import "./App.css";

import booksData from "./booksData.json";
import MetaTags from "./components/MetaTags";
import Home from "./components/Home";
import Shelf from "./components/Shelf";
import Footer from "./components/Footer";
import { PageNotAvailable } from "./components/PageNotAvailable";

import { AiOutlineSearch } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";

//store
import { ShelfView } from "./features/shelf/ShelfView";
import { clearGenre } from "./features/genre/genreSlice";
import {
  currentPath,
  newPath,
  prevPath,
  savePath,
} from "./features/path/pathSlice";
import {
  newSearch,
  clearSearch,
  currentSearch,
} from "./features/search/searchSlice";

import { BookView } from "./features/book/BookView";
import { removeBook } from "./features/book/bookSlice";

function App() {
  const dataOfBooks = booksData.books;
  const prevPath = useSelector(state => state.path.prevPath);
  const currentPath = useSelector(state => state.path.currentPath);
  const currentSearch = useSelector(state => state.search.currentSearch);

  const dispatch = useDispatch();

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

  //
  // console.log(booksData.books);
  const [book, setBook] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = e => {
    setSearching(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (screenSize.dynamicWidth <= 600) {
      setSearching(false);
    }
    dispatch(newSearch(book));
  };

  const handleChange = e => {
    setBook(e.target.value);
  };

  const [booksLength, setBooksLength] = useState(20);

  let amountOfPage = Math.ceil(dataOfBooks.length / booksLength);

  let amountOfPageArray = [];

  for (let i = 0; i < amountOfPage; i++) {
    amountOfPageArray.push(i);
  }
  return (
    <>
      <MetaTags />
      <Router>
        <div className="App">
          {screenSize.dynamicWidth > 600 ? (
            <header>
              <div className="header-container wrapper">
                <Link
                  to="/bookworm"
                  onClick={() => {
                    dispatch(clearGenre());
                    dispatch(clearSearch());
                    dispatch(removeBook());
                    dispatch(newPath("/"));
                  }}
                >
                  <h2>
                    book<span>Worm</span>
                  </h2>
                </Link>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="book"></label>
                  <input
                    type="text"
                    placeholder="Search Book"
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn">
                    <AiOutlineSearch />
                  </button>
                </form>
                <Link
                  to="/bookworm/shelf"
                  onClick={() => {
                    dispatch(removeBook());
                    dispatch(clearSearch());
                    dispatch(clearGenre());
                  }}
                >
                  <ShelfView />
                </Link>
              </div>
            </header>
          ) : (
            <header>
              <div className="header-container wrapper">
                {searching ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ width: "0%" }}
                    animate={{
                      width: "85%",
                    }}
                    exit={{ width: "0%" }}
                  >
                    <label htmlFor="book"></label>
                    <input
                      type="text"
                      placeholder="Search Book"
                      onChange={handleChange}
                    />
                    <button type="submit" className="btn">
                      <AiOutlineSearch />
                    </button>
                  </motion.form>
                ) : (
                  <>
                    <div className="btn-search" onClick={handleSearch}>
                      <AiOutlineSearch />
                    </div>
                    <Link
                      to="/bookworm"
                      onClick={() => {
                        dispatch(removeBook());
                        dispatch(clearSearch());
                        dispatch(clearGenre());
                        dispatch(newPath("/"));
                      }}
                    >
                      <h2>
                        book<span>Worm</span>
                      </h2>
                    </Link>
                  </>
                )}

                <Link
                  to="/bookworm/shelf"
                  onClick={() => {
                    dispatch(removeBook());
                    dispatch(newPath("/shelf"));
                    dispatch(clearGenre());
                    dispatch(clearSearch());
                  }}
                >
                  <ShelfView />
                </Link>
              </div>
            </header>
          )}

          <Routes>
            <Route exact path="bookworm" element={<Home />}>
              {amountOfPageArray.map((item, index) => {
                return (
                  <Route
                    path={`page=${index + 1}`}
                    element={<Home amountOfPage={amountOfPageArray.length} />}
                  />
                );
              })}
            </Route>
            <Route path="bookworm/shelf" element={<Shelf />}></Route>
            <Route path="*" element={<PageNotAvailable />}></Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
