"use client";
import { useRef } from "react";
import "./contact.scss";
import { motion } from "framer-motion";
import SponsorList from "../sponsor/SponsorList";
import Footer from "../footer/footer";
import { FaPhone } from "react-icons/fa6";

const variants = {
  initial: {
    y: 200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();

  return (
    <>
      <SponsorList />
      <motion.div
        ref={ref}
        className="contact"
        variants={variants}
        initial="initial"
        whileInView="animate"
      >
        <motion.div className="textContainer" variants={variants}>
          <motion.h1 variants={variants}>Let’s work together</motion.h1>
          <motion.div className="item" variants={variants}>
            <h2>Ponnachettira Ramesh Ganapathy</h2>
            <FaPhone /> <a href="tel:+9900129888">9900129888</a>
          </motion.div>
          <motion.div className="item" variants={variants}>
            <h2>Bollanda A Roshan</h2>
            <FaPhone /> <a href="tel:+9845198415">9845198415</a>
          </motion.div>
          <motion.div className="item" variants={variants}>
            <h2>Konganda G Sanketh Chengappa</h2>
            <FaPhone /> <a href="tel:+9886649126">9886649126</a>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Contact;
