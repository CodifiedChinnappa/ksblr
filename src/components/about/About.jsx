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

const prizeData = [
  {
    info: "Winners: Chendira Family",
    name: "Cash prize of ₹30,000 and silver trophy donated by Sri Konganda Kashi Kariappa & Family (In the memory of his parents Konganda Madappa and Kamala)",
  },
  {
    info: "Second Runner-Up: Konganda Family",
    name: "Cash prize and silver trophy donated by Smt. Kanjitahnda Kamala Belliappa & Son’s (In the memory of Kanjithanda Beliappa)",
  },
  {
    info: "Third Position: Teethimada Family",
    name: "Cash prize and trophy donated by Smt. Malavanda Bojamma Achappa & Family (In the memory of Malavanda Achappa - Retd.AIGP)",
  },
  {
    info: "Fourth Position: Namera Family",
    name: "Cash prize given by HI-Fliers V.Badaga",
  },
  {
    info: "Player of the Tournament: Paradanda Aiyappa(Chendira)",
    name: "Sponsored by, Salini Uthaiah in memory of Kanjithanda Uthaiah",
  },
  {
    info: "Best Goal Keeper: Konganda Kavan",
    name: "Sponsored by, Chemira Nanda Nanjappa",
  },
  {
    info: "Best Half: Meriyanda Roy(Konganda)",
    name: "Sponsored by, Ammanichanda Lavin Kumar",
  },
  {
    info: "Best Forward: Mandachanda Manjunath(Teethimada)",
    name: "Sponsored by, Malavanda Poovamma",
  },
  {
    info: "Highest Goal Scorer of the Tournament: Mukkatira Poonacha(Chendira)",
    name: "Sponsored by, Kanjithanda Mandanna",
  },
  {
    info: "Best Upcoming Player: Chedanda Amogh(Namera)",
    name: "Sponsored by, Kanjithanda Gini Monappa",
  },
  {
    info: "Best Disciplined Team: Kuppanda Family",
    name: "Sponsored by, Chendirmada Ganapathy",
  },
];

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
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <h1>
            we as &nbsp;
            <motion.b style={{ color: "orange" }}>HI FLIERS</motion.b>
          </h1>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box bg-custom">
          <p>
            <span>We</span> have been dedicated to ignite rural hockey talent
            with passion and purpose since January 7, 2023. The club is actively
            addressing the challenges faced by remote talent in the V. Badaga
            region by organizing the Inter Kodava Family Hockey Tournament. This
            initiative is specifically focused on the areas of Beralinad,
            Kuthunad, and Bottiyathnad, which are situated along the border with
            Kerala. The primary goal is to bridge the gap for local talents who
            currently encounter obstacles, including a 15 to 20-kilometer travel
            distance for basic hockey practice. This is especially impactful for
            economically disadvantaged families, and the club aims to provide a
            platform that fosters hockey talent within these communities.
          </p>
          <p>
            <span style={{ width: "3.2em" }}>Debut</span>We successfully
            organized the Inter Kodava Family Hockey Tournament from February
            22nd to 26th, 2023, at the V. Badaga Higher Primary School ground.
            The event took place despite initial challenges, including the need
            to invest a significant amount of money to refurbish the playground,
            which was in a deplorable condition. A total of 20 teams
            participated in the tournament, with a unique rule allowing only
            four Kodava guest players from outside the family to represent each
            team. The remaining players were exclusively from local families.
            The community rallied behind our cause, offering generous support in
            terms of finances, materials, and more. This collective effort
            played a crucial role in ensuring the tournament&apos;s resounding
            success. The local press played a pivotal role by providing
            extensive coverage, giving the tournament widespread publicity. This
            exposure proved instrumental in identifying talented players,
            opening doors for them to be noticed by prominent clubs. The event
            also garnered support from various VIPs, including local public
            representatives, who were invited to witness the tournament and
            actively contributed to our cause.
          </p>
          <div className="prize galleryWrapper">
            <h1>Results 2022</h1>
            <ol>
              {prizeData.map((info) => (
                <li key={info.info}>
                  <TfiCup /> {info.info}
                  <h4>{info.name}</h4>
                </li>
              ))}
              <li>
                Sponsor of Final Day Lunch
                <h4>Sri Konganda K. Bopanna & family</h4>
              </li>
            </ol>
          </div>
          <div className="galleryWrapper">
            <div className="galleryTitle">moments worth remembering</div>
            <div className="gallery">
              {[1, 2, 3, 4, 5, 6, 7].map((moment) => (
                <div className="gallery__item" key={moment}>
                  <Image
                    src={`/moments/img${moment}.jpeg`}
                    alt=""
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
