"use client";
import { useRef } from "react";
import "./about.scss";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { TfiCup } from "react-icons/tfi";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const ref = useRef();

  return (
    <motion.div
      className="about"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
 
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box bg-custom">
          <p>
            <span>Kodavas</span>, clan of the Indian state of Karnataka have a
            long history of association with the game of field hockey. The
            district of Kodagu which is the land of the Kodavas is considered as
            the cradle of Indian hockey. More than 50 Kodavas have
            represented India in international hockey tournaments, out of which
            7 have also participated in Olympics. B P Govinda, M P Ganesh, M
            M Somaiya, C S Poonacha are some of the prominent Kodavas who have
            represented India. The passion for hockey in Kodagu is so much that
            more than 200 families participate in an annual hockey festival.
            This festival is recognised as one of the largest field hockey
            tournaments in the world and has been referred to the Guinness Book
            of Records. However it has already found a mention in the Limca
            Book of Records, which is an Indian variant of the Guinness Book.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
