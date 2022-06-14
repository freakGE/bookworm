import React from "react";
import "./Home.css";
// import { TbUnlink } from "react-icons/tb";
import { BiUnlink } from "react-icons/bi";

import ToHome from "./ToHome";

export const PageNotAvailable = () => {
  return (
    <div className="pageNotAvailable">
      <ToHome />
      <span>
        <BiUnlink />
      </span>
      <h3>This Page Isn't Available</h3>
      <p>
        The link may be broken, Check to see if the link you're trying to open
        is correct.
      </p>
    </div>
  );
};
