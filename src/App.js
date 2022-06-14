import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch,
} from "react-router-dom";

import "./App.css";

import booksData from "./booksData.json";
import MetaTags from "./components/MetaTags";
import Home from "./components/Home";
import Shelf from "./components/Shelf";
import Footer from "./components/Footer";

import { AiOutlineSearch } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";

//store
import { ShelfView } from "./features/shelf/ShelfView";
import { clearGenre } from "./features/genre/genreSlice";
import { currentPath, newPath } from "./features/path/pathSlice";

function App() {
  const currentPath = useSelector(state => state.path.currentPath);

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
  };

  const handleChange = e => {
    setBook(e.target.value);
  };

  return (
    <>
      <MetaTags />
      <Router>
        <div className="App">
          {screenSize.dynamicWidth > 600 ? (
            <header>
              <div className="header-container wrapper">
                <Link
                  to="/"
                  onClick={() => {
                    if (currentPath !== "/") {
                      dispatch(clearGenre());
                      dispatch(newPath("/"));
                    }
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

                <Link to="/shelf" onClick={() => dispatch(clearGenre())}>
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
                      to="/"
                      onClick={() => {
                        if (currentPath !== "/") {
                          dispatch(clearGenre());
                          dispatch(newPath("/"));
                        }
                      }}
                    >
                      <h2>
                        book<span>Worm</span>
                      </h2>
                    </Link>
                  </>
                )}

                <Link
                  to="/shelf"
                  onClick={() => {
                    if (currentPath !== "/shelf") {
                      dispatch(clearGenre());
                      dispatch(newPath("/shelf"));
                    }
                  }}
                >
                  <ShelfView />
                </Link>
              </div>
            </header>
          )}

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/shelf" element={<Shelf />}></Route>
            {/* <Route
              path={`/categories/(${booksCategories.map(cat => cat).join("|")})`}
              element={<Home category={booksCategories} />}
            /> */}
            {/* <Route path="/categories=:categoryId" element={<Home />}></Route> */}
            <Route path="/page/:pageid" element={<Home />}></Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
