"use client";
import { motion } from "framer-motion";
import "./sponsorList.scss";
import Image from "next/image";

const sponsors = [
  {
    name: "FirePro",
    imageSrc: "/firepro.png",
  },
  {
    name: "Muliya",
    imageSrc: "/muliya.webp",
  },
  {
    name: "brew bean",
    imageSrc: "/brew-bean.jpg",
  },
];

const SponsorList = () => {
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

  return (
    <div className="infinite-horizontal-scroll">
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <h1>
            Our &nbsp;
            <motion.b style={{ color: "orange" }}>Sponsors</motion.b>
          </h1>
        </div>
      </motion.div>
      <div className="sponsor-container">
        {sponsors.map((sponsor, index) => (
          <div className="scroll-content" key={index}>
            <Image
              key={index}
              src={sponsor.imageSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={`Sponsor ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorList;
