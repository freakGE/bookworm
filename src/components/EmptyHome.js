import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { listOfGenre } from "../features/genre/genreSlice";
import { currentSearch } from "../features/search/searchSlice";

export default function EmptyHome() {
  const currentSearch = useSelector(state => state.search.currentSearch);
  const listOfGenre = useSelector(state => state.genre.listOfGenre);

  let tabletWidth = 930;
  let smallTableWidth = 780;
  let mobileWidth = 546;
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

  return (
    <div className="emptyHome">
      <motion.div
        className="shelfStyle"
        initial={{ opacity: 0, y: -250, x: 0 }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0,
        }}
        exit={{ opacity: 0, y: -250, x: 0 }}
      >
        <div className="emptyTitle">
          <h1>No results for "{currentSearch}"</h1>
          <p>Try checking your spelling or use more general terms</p>
        </div>
        {listOfGenre.length < 5 && screenSize.dynamicWidth >= tabletWidth ? (
          <div className="emptyCategories">
            {listOfGenre.map((gen, index) => {
              let genWidth = 100 / listOfGenre.length + 1;
              let genStyle = {
                borderRight: "1px solid white",
                width: `${genWidth}%`,
              };
              if (listOfGenre.length === index + 1) {
                genStyle = {
                  borderRight: "0px solid white",
                  width: `${genWidth}%`,
                };
              }
              return (
                <motion.p
                  style={genStyle}
                  key={gen}
                  initial={{ opacity: 0.5, y: -100, x: 0 }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{ opacity: 0.5, y: -100, x: 0 }}
                >
                  {gen}
                </motion.p>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </div>
  );
}
