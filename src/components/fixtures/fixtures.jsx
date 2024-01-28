"use client";
import { useState, useEffect } from "react";
import FixtureCard from "./card";
import axios from "axios";
import "./fixtures.scss";

const initialState = { minutes: 3, seconds: 0 };

const Fixtures = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [matchList, setMatchList] = useState([]);
  const [time, setTime] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/matches");
      setMatchList(res.data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime((prevTime) => {
  //       if (prevTime.minutes === 0 && prevTime.seconds === 0) {
  //         fetchMatches();
  //         setTime(initialState);
  //       } else {
  //         return {
  //           minutes:
  //             prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes,
  //           seconds: prevTime.seconds === 0 ? 59 : prevTime.seconds - 1,
  //         };
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="fixtureMain">
      <div className="titleContainer">
        <div className="title">
          <h1>
            <b >FIXTURES</b>
          </h1>
        </div>
      </div>
      <div className="tabsWrapper">
        <div className="tabsContainer">
          <div
            className={`tab ${activeTab === 1 ? "tabActive" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Live
          </div>
          <div
            className={`tab ${activeTab === 2 ? "tabActive" : ""}`}
            onClick={() => handleTabClick(2)}
          >
            Upcoming
          </div>
          <div
            className={`tab ${activeTab === 3 ? "tabActive" : ""}`}
            onClick={() => handleTabClick(3)}
          >
            Results
          </div>
        </div>

        <div className="tabContent">
          {activeTab === 1 && (
            <div>
              {matchList
                .filter((match) => match.status === "LIVE")
                .map((match) => (
                  <FixtureCard key={match.matchNo} match={match} />
                ))}

              {!matchList.filter((match) => match.status === "LIVE").length >
                0 && <div className="infoContainer">No match in progress</div>}
              {loading ? (
                <p className="tabButton">loading...</p>
              ) : (
                <>
                  <button className="tabButton" onClick={fetchMatches}>
                    Refresh
                  </button>
                  {/* <h4 style={{ marginTop: "5px" }}>
                    ( Auto Refreshes in{" "}
                    {`${time?.minutes}:${
                      time?.seconds < 10 ? `0${time?.seconds}` : time?.seconds
                    }`}{" "}
                    Minutes)
                  </h4> */}
                </>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div>
              {matchList
                .filter((match) => match.status === "UPCOMING")
                .map((match) => (
                  <FixtureCard key={match.matchNo} match={match} />
                ))}
              {!matchList.filter((match) => match.status === "UPCOMING")
                .length > 0 && (
                <div className="infoContainer">No match scheduled</div>
              )}
            </div>
          )}
          {activeTab === 3 && (
            <div>
              {matchList
                .filter((match) => match.status === "RESULT")
                .sort((a, b) => b.matchNo - a.matchNo)
                .map((match) => (
                  <FixtureCard key={match.matchNo} match={match} />
                ))}
              {!matchList.filter((match) => match.status === "RESULT").length >
                0 && <div className="infoContainer">No match played</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
