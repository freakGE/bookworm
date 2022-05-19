import { useState } from "react";
import "./App.css";

import booksData from "./booksData.json";
import MetaTags from "./components/MetaTags";

import { AiOutlineSearch } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";

function App() {
  // console.log(booksData.books);
  const [book, setBook] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    setBook(e.target.value);
  };
  return (
    <>
      <MetaTags />
      <div className="App">
        <header>
          <div className="header-container wrapper">
            <h2>
              book<span>Worm</span>
            </h2>

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

            <div className="shelf">
              <GiBookshelf />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
