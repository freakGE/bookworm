import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import "./Home.css";

export default function ToHome() {
  return (
    <motion.div
      className="toHome"
      whileTap={{ scale: 0.8 }}
      initial={{
        x: -160,
        y: 40,
        opacity: 0.75,
        scale: 0.9,
      }}
      animate={{
        x: -80,
        y: 40,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <Link to="/">
        <h2>
          <BiArrowBack />
          {/* <span>Home</span> */}
        </h2>
      </Link>
    </motion.div>
  );
}
