import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

import "./Home.css";

const Pagination = props => {
  const listOfGenre = useSelector(state => state.genre.listOfGenre);
  const booksLength = props.booksLength;
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1); //default
  const [prevPageLength, setPrevPageLength] = useState(1 * booksLength);
  const [paginationArray, setPaginationArray] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0);

  useEffect(() => {
    setPaginationLength(Math.floor(props.data.length / booksLength));
  }, [booksLength, props.data.length]);

  useEffect(() => {
    setPaginationArray([]);
    for (let i = 0; i < paginationLength; i++) {
      setPaginationArray(prevArray => [...prevArray, i]);
    }
  }, [paginationLength]);
  // page switch
  /////
  useEffect(() => {
    let pathName = location.pathname;
    if (pathName.includes("page=")) {
      let [splicePath, pathNumber] = pathName.split("=");
      setPrevPageLength(booksLength * parseInt(pathNumber));
      setCurrentPage(parseInt(pathNumber));
    }
  }, [location]);

  const switchPage = e => {
    let pageNumber = parseInt(e.target.textContent);
    setCurrentPage(pageNumber);
    // setPrevPageLength(booksLength * currentPage);
    setPrevPageLength(booksLength * pageNumber);
  };

  const switchPageByOne = move => {
    if (move === "prev") {
      setPrevPageLength(booksLength * (currentPage - 1));
      setCurrentPage(currentPage - 1);
    } else if (move === "next") {
      setPrevPageLength(booksLength * (currentPage + 1));
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {props.data.length > 20 ? ( //data.length > 20
        <div className="pagination wrapper unselectable">
          <div className="pageSwitcher">
            <ul>
              {currentPage === 1 ? (
                ""
              ) : (
                <li className="prev">
                  <Link
                    to={`/bookworm/page=${currentPage - 1}`}
                    onClick={() => switchPageByOne("prev")}
                  >
                    <RiArrowLeftSLine />
                  </Link>
                </li>
              )}
              <li className={currentPage === 1 ? "active" : "page"}>
                <Link onClick={switchPage} to={"/bookworm/page=1"}>
                  1
                </Link>
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
                } else if (index < currentPage - 2 || index > currentPage + 2) {
                  return false;
                } else {
                  return (
                    <li
                      className={currentPage === index ? "active" : "page"}
                      key={index}
                    >
                      <Link onClick={switchPage} to={`/bookworm/page=${index}`}>
                        {index}
                      </Link>
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
                className={currentPage === paginationLength ? "active" : "page"}
              >
                <Link
                  to={`/bookworm/page=${paginationLength}`}
                  onClick={switchPage}
                >
                  {parseInt(paginationLength)}
                </Link>
              </li>
              {currentPage === paginationLength ? (
                ""
              ) : (
                <li className="next">
                  <Link
                    to={`/bookworm/page=${currentPage + 1}`}
                    onClick={() => switchPageByOne("next")}
                  >
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
    </>
  );
};

export default Pagination;
