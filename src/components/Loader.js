import { motion } from "framer-motion";
import React from "react";

const circleStyle = {
  width: "3rem",
  height: "3rem",
  border: "6px solid #f4f4f4",
  borderTop: "6px solid #424242",
  borderRadius: "50%",
};

const spinTransition = {
  loop: Infinity,
  duration: 1,
  ease: "linear",
};

const Loader = () => {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <motion.div
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      ></motion.div>
    </div>
  );
};

export default Loader;
