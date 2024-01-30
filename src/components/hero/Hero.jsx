"use client";
import "./hero.scss";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import CountDown from "../countdown/countdown";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { FaFileDownload } from "react-icons/fa";
// import ConfettiCanvas from "./Confetti";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      {/* <ConfettiCanvas /> */}
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>KODAVA SAMAJA BANGALORE</motion.h2>

          <motion.h1 variants={textVariants}>
            19<sup>th</sup> inter-sanga hockey tournament 2024
            <br />
            <p>
              <SlCalender /> &nbsp; 4<sup>th</sup> Feb - 25<sup>th</sup> Feb
              2024
            </p>
            <p>
            </p>
          </motion.h1>
          <motion.h3 variants={textVariants}>
            <FaLocationDot />
            field marshal k m cariappa hockey arena, shanthinagar
          </motion.h3>
        <CountDown/>
          <a
            className="downloadLink"
            href="/fixtures.pdf"
            download
          >
            <FaFileDownload /> &nbsp; Download Fixture
          </a>
          <motion.a href={"#Fixtures"} key={"Fixtures"}>
            <motion.img
              variants={textVariants}
              animate="scrollButton"
              src="/scroll.png"
              alt=""
            />
          </motion.a>
        </motion.div>
      </div>

      <div className="imageContainer">
        <Image src="/hero.png" alt="" width={300} height={100} />
      </div>
    </div>
  );
};

export default Hero;
