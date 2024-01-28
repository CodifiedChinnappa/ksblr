"use client";
import { useRef } from "react";
import "./eventDetails.scss";
import { motion, useInView } from "framer-motion";

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

const PersonInfo = ({ info }) => {
  return (
    <div className="personInfo">
      <h2>{info.addition}</h2>
      {info.persons.map((person, index) => (
        <div key={index}>
          <h3>{person.name}</h3>
          <h5>{person.position}</h5>
        </div>
      ))}
    </div>
  );
};

const inauguralData = [
  {
    addition: "chairman",
    persons: [
      {
        name: "sri ammanichanda ranju poonacha",
        position: "president, Hi-Fliers - v. badaga",
      },
    ],
  },
  {
    addition: "inaugration",
    persons: [
      {
        name: "sri pandanda k. bopanna",
        position: "president, kodava hockey accademy",
      },
    ],
  },
  {
    addition: "chief guests",
    persons: [
      {
        name: "sri nandineravanda u. nachappa",
        position: "president, codava national council",
      },
      {
        name: "sri theethamada arjun devaiah",
        position: "international athlete, ekalavya awardee",
      },
      {
        name: "sri palanganda lava kumar",
        position: "president, hockey coorg",
      },
      {
        name: "sri kollira bopanna",
        position: "planter, chamundi plantation, kuttandi",
      },
      {
        name: "sri kanjithanda gini monappa",
        position: "president, SDMC, GMP school, V. Badaga",
      },
      {
        name: "sri geethanjali k c",
        position: "headmisters, GMP school, V. Badaga",
      },
    ],
  },
];
const valedictoryData = [
  {
    addition: "chairman",
    persons: [
      {
        name: "sri malavanda girish muddaiah",
        position: "president,advisory committee, Hi-Fliers - v. badaga",
      },
    ],
  },
  {
    addition: "chief guests",
    persons: [
      {
        name: "sri ajjikuttira s. ponnanna",
        position: "legal advisor to chief minister & MLA, virajpet",
      },
      {
        name: "sri mandepanda suja kushalappa",
        position: "MLC, kodagu dist",
      },
      {
        name: "sri kallichanda vishnu kariappa s. narendra",
        position: "president, federation of kodava samajas",
      },
      {
        name: "sri nambudumada s. narendra",
        position: "chairman & managing director, fire pro pvt. ltd. india",
      },
      {
        name: "sri chemira sadha ramacha",
        position: "planter, v. badaga",
      },
      {
        name: "sri manjunath babu",
        position: "bangalore",
      },
      {
        name: "sri ammanichanda ranju poonacha",
        position: "president, Hi-Fliers - v. badaga",
      },
      {
        name: "sri malavanda bojamma achappa",
        position: "planter, v. badaga",
      },
      {
        name: "sri chemira g. poovaiah",
        position: "planter, v. badaga",
      },
    ],
  },
];
const honourData = [
  {
    persons: [
      {
        name: "sri madanda p thimmaiah",
        position: "international rugby player",
      },
      {
        name: "sri chendanda nikin thimmaiah",
        position: "olympian field hockey & ekalavya awardee",
      },
      {
        name: "miss bollanda unnathi aiyappa",
        position: "international athlete",
      },
    ],
  },
];
const prizeSponsorsData = [
  {
    name: "Winners: Sri Ammanichanda G. Ravi, Ranju, Rohitha & family",
    info: "Sponsor of Winners Cash Prize & Trophy in Memory of their parents late Ammanichanda Ganapathi & Ponnamma",
  },
  {
    name: "Second Runner-Up: Smt Malavanda Bojamma Achappa & family",
    info: "Sponsor of Runners Cash Prize & Trophy in Memory of late Malavanda Achappa<small>(Rtd. AIGP)",
  },
  {
    name: "Third Position: Sri Chemira G Poovaiah & family",
    info: "Sponsor of 3rd Place Cash Prize & Trophy in Memory of his Parents late Chemira Ganapathi & Subbamma",
  },
  
  {
    name: "Sri Konganda Kashi Kariappa & family",
    info: "Sponsor of Final Day Lunch",
  },
];

const EventDetails = () => {
  const ref = useRef();

  return (
    <motion.div
      className="event"
      variants={variants}
      initial="initial"
      animate="animate"
      whileInView="animate"
      ref={ref}
    >
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <h1>
            This Year <motion.b style={{ color: "orange" }}>PLAN</motion.b>
          </h1>
        </div>
      </motion.div>
      <motion.div className="listDetails" variants={variants}>
        <motion.div className="box">
          <p>
            We have planned to conduct the tournament in the same format from
            28th of November to 2nd of December at the same venue.
          </p>
          <div className="flex">
            <div className="flexChild">
              <h2 className="label">Inaugural ceremony</h2>
              {inauguralData.map((info) => (
                <PersonInfo info={info} key={info.name + Math.random()} />
              ))}
            </div>
            <div className="flexChild">
              <h2 className="label">Valedictory ceremony</h2>
              {valedictoryData.map((info) => (
                <PersonInfo info={info} key={info.position + Math.random()} />
              ))}
            </div>
            <div className="flexChild">
              <h2 className="label">Honour for achievement</h2>
              {honourData.map((info) => (
                <PersonInfo info={info} key={info.name + Math.random()} />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className="box" style={{ paddingTop: "0px" }}>
          <h1>Our prize sponsors</h1>
          <ol>
            {prizeSponsorsData.map((info) => (
              <li key={info.name}>
                {info.name}
                <h4>{info.info}</h4>
              </li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetails;
