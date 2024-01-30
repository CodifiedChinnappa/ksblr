"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import "./scoreUpdate.scss";
import Spinner from "@/components/spinner/spinner";
import Nav from "../Nav";

const initialState = {
  time: null,
  jersey: null,
  player: null,
  goalType: "FIELD",
};

const UpdateMatchForm = () => {
  const [loading, setLoading] = useState(false);

  const [scoreDataTeamA, setScoreDataTeamA] = useState(initialState);
  const [scoreDataTeamB, setScoreDataTeamB] = useState(initialState);

  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

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

  const handleAddGoal = async (teamId, scoreData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/matches/${selectedMatch.matchNo}/add-score`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamId,
            matchNo: selectedMatch.matchNo,
            ...scoreData,
          }),
        }
      );

      const data = await response.json();
      setSelectedMatch(data.match);
      resetScoreData(teamId);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
    setLoading(false);
  };

  const handleEndGame = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/matches/${selectedMatch.matchNo}/end-game`, {
        matchNo: selectedMatch.matchNo,
      });
      fetchMatches();
      setSelectedMatch(null);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
    setLoading(false);
  };

  const handleDeleteGoalScorer = async (teamName, playerNameToRemove) => {
    setLoading(true);
    const updatedTeams = selectedMatch.teams.map((team) => {
      if (team.name === teamName) {
        const updatedGoalScorer = team.goalScorer.filter(
          (scorer) => scorer.player !== playerNameToRemove
        );
        return { ...team, goalScorer: updatedGoalScorer };
      }
      return team;
    });

    try {
      const response = await axios.patch(
        `/api/matches/${selectedMatch.matchNo}/delete-score`,
        {
          matchNo: selectedMatch.matchNo,
          teams: updatedTeams,
        }
      );

      setSelectedMatch(response.data.match);
    } catch (error) {
      console.error("Error deleting goal scorer:", error.message);
    }
    setLoading(false);
  };

  const resetScoreData = (teamId) => {
    if (teamId === 0) {
      setScoreDataTeamA({
        time: null,
        jersey: null,
        player: null,
        goalType: "FIELD",
      });
    } else {
      setScoreDataTeamB({
        time: null,
        jersey: null,
        player: null,
        goalType: "FIELD",
      });
    }
  };

  function getStartingLetters(inputString) {
    const wordsArray = inputString.split(" ");
    const startingLetters = wordsArray.map((word) => word.charAt(0));
    return startingLetters.join("").slice(0, 4);
  }

  const handleSelectChange = async (fieldName, value) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/matches/${selectedMatch.id}/change-${fieldName}`,
        { matchNo: selectedMatch.matchNo, value }
      );
      setSelectedMatch(response.data.match);
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error.message);
    }
    setLoading(false);
  };

  const handleShootoutUpdate = async (teamId, value) => {
    setLoading(true);
    try {
      // Make a PATCH request to your API route
      const response = await axios.patch(
        `/api/matches/${selectedMatch.matchNo}/shootout`,
        {
          matchNo: selectedMatch.matchNo,
          teamId,
          value,
        }
      );
      setSelectedMatch(response.data.match);
      // Optionally, you can handle the response or perform any other actions
      console.log("Shootout data updated successfully:", response.data.message);
    } catch (error) {
      console.error("Error updating shootout data:", error.message);
    }
    setLoading(false);
  };

  const GameSelect = () => {
    const handleMatchSelect = (matchNo) => {
      const selectedGame = matchList.find((match) => match.matchNo === matchNo);
      setSelectedMatch(selectedGame);
    };

    return (
      <div className="select-game">
        <select
          value={selectedMatch?.matchNo}
          onChange={(e) => handleMatchSelect(parseInt(e.target.value))}
        >
          <option value="">Select a match</option>
          {matchList.length > 0 &&
            matchList?.map((match) => (
              <option key={match?.matchNo} value={match.matchNo}>
                match:{match.matchNo} {match.teams[0].name} VS{" "}
                {match.teams[1].name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  return (
    <div className="scoreWrapper">
      <Nav />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {selectedMatch ? (
            <div>
              <label>
                <h2 style={{ fontSize: "1.4rem", textAlign: "center" }}>
                  Match {selectedMatch.matchNo}
                </h2>

                <div
                  style={{
                    textTransform: "capitalize",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  {selectedMatch.teams[0].name} <br />
                  vs
                  <br /> {selectedMatch.teams[1].name}
                </div>
              </label>

              <hr />
              {/* status Dropdown */}
              <div className="dropdownContainer">
                <div>
                  <label>Status:</label>
                  <select
                    value={selectedMatch.status}
                    onChange={(e) => {
                      handleSelectChange("status", e.target.value);
                    }}
                  >
                    {["UPCOMING", "LIVE"].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Period:</label>
                  <select
                    value={selectedMatch.period}
                    onChange={(e) => {
                      handleSelectChange("period", e.target.value);
                    }}
                  >
                    {[
                      "NP",
                      "START",
                      "SCHEDULED",
                      "FIRST_QUARTER",
                      "SECOND_QUARTER",
                      "HALF",
                      "THIRD_QUARTER",
                      "FOURTH_QUARTER",
                      "FULL",
                      "SHOOTOUT",
                    ].map((value) => (
                      <option key={value} defaultValue={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr />
              <div className="scoreboard">
                {/* Team A */}
                <div className="team-a">
                  <label>
                    <strong>
                      {getStartingLetters(selectedMatch.teams[0].name)}
                    </strong>
                    <br />
                    <strong>
                      Goals: {selectedMatch.teams[0].goalScorer.length}
                    </strong>
                  </label>

                  <div className="teamContainer">
                    <label>
                      Player:
                      <input
                        type="text"
                        placeholder="player"
                        required
                        onChange={(e) =>
                          setScoreDataTeamA({
                            ...scoreDataTeamA,
                            player: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label>
                      Time:
                      <input
                        type="number"
                        placeholder="Time"
                        required
                        min={0}
                        value={scoreDataTeamA.time || ""}
                        onChange={(e) =>
                          setScoreDataTeamA({
                            ...scoreDataTeamA,
                            time: parseInt(e.target.value),
                          })
                        }
                      />
                    </label>
                    <label>
                      Jersey:
                      <input
                        type="text"
                        placeholder="Jersey"
                        value={scoreDataTeamA.jersey || ""}
                        onChange={(e) =>
                          setScoreDataTeamA({
                            ...scoreDataTeamA,
                            jersey: parseInt(e.target.value),
                          })
                        }
                      />
                    </label>
                    <div className="container">
                      <div className="radio-container">
                        <input
                          type="radio"
                          id="fieldGoalA"
                          value="FIELD"
                          checked={scoreDataTeamA.goalType === "FIELD"}
                          onChange={() =>
                            setScoreDataTeamA({
                              ...scoreDataTeamA,
                              goalType: "FIELD",
                            })
                          }
                        />
                        <label htmlFor="fieldGoalA">Field Goal</label>

                        <input
                          type="radio"
                          id="penaltyA"
                          value="PENALTY"
                          checked={scoreDataTeamA.goalType === "PENALTY"}
                          onChange={() =>
                            setScoreDataTeamA({
                              ...scoreDataTeamA,
                              goalType: "PENALTY",
                            })
                          }
                        />
                        <label htmlFor="penaltyA">Penalty</label>
                      </div>
                    </div>
                    <button onClick={() => handleAddGoal(0, scoreDataTeamA)}>
                      Add
                    </button>
                  </div>

                  {selectedMatch?.teams[0].goalScorer.length > 0 ? (
                    <div
                      className="scorerContainer"
                      style={{
                        textTransform: "capitalize",
                        background: "transparent",
                        color: "white",
                        border: "none",
                      }}
                    >
                      <h3> player </h3>
                      <h3> time </h3>
                      <h3> jersey </h3>
                      <h3> goalType </h3>
                      <h3> delete </h3>
                    </div>
                  ) : null}
                  {selectedMatch?.teams[0].goalScorer.map((scorer, index) => (
                    <div key={index} className="scorerContainer">
                      <h3> {scorer.player} </h3>
                      <h3> {scorer.time} </h3>
                      <h3> {scorer.jersey} </h3>
                      <h3> {scorer.goalType} </h3>
                      <button
                        type="button"
                        style={{ background: "red" }}
                        onClick={() =>
                          handleDeleteGoalScorer(
                            selectedMatch.teams[0].name,
                            scorer.player
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    Shootout(
                    {
                      selectedMatch.teams[0].shootout.filter(
                        (item) => item === true
                      ).length
                    }
                    )
                    <button
                      type="button"
                      onClick={() => handleShootoutUpdate(0, true)}
                    >
                      Score
                    </button>
                    <button
                      type="button"
                      style={{ background: "#FF5733" }}
                      onClick={() => handleShootoutUpdate(0, false)}
                    >
                      Miss
                    </button>
                  </div>

                  {selectedMatch.teams[0].shootout.map((item, i) => (
                    <h5 key={i}>
                      {i + 1} : {item ? "scored" : "missed"}
                    </h5>
                  ))}
                </div>

                {/* Team B */}
                <div className="team-b">
                  <label>
                    <strong>
                      {" "}
                      {getStartingLetters(selectedMatch.teams[1].name)}
                    </strong>
                    <br />
                    <strong>
                      Goals: {selectedMatch.teams[1].goalScorer.length}
                    </strong>
                  </label>

                  <div className="teamContainer">
                    <label>
                      Player:
                      <input
                        type="text"
                        placeholder="player"
                        required
                        onChange={(e) =>
                          setScoreDataTeamB({
                            ...scoreDataTeamB,
                            player: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Time:
                      <input
                        type="number"
                        placeholder="Time"
                        required
                        min={0}
                        value={scoreDataTeamB.time || ""}
                        onChange={(e) =>
                          setScoreDataTeamB({
                            ...scoreDataTeamB,
                            time: parseInt(e.target.value),
                          })
                        }
                      />
                    </label>
                    <label>
                      Jersey:
                      <input
                        type="text"
                        placeholder="Jersey"
                        value={scoreDataTeamB.jersey || ""}
                        onChange={(e) =>
                          setScoreDataTeamB({
                            ...scoreDataTeamB,
                            jersey: parseInt(e.target.value),
                          })
                        }
                      />
                    </label>
                    <div className="container">
                      <div className="radio-container">
                        <input
                          type="radio"
                          id="fieldGoalB"
                          value="FIELD"
                          checked={scoreDataTeamB.goalType === "FIELD"}
                          onChange={() =>
                            setScoreDataTeamB({
                              ...scoreDataTeamB,
                              goalType: "FIELD",
                            })
                          }
                        />
                        <label htmlFor="fieldGoalB">Field Goal</label>

                        <input
                          type="radio"
                          id="penaltyB"
                          value="PENALTY"
                          checked={scoreDataTeamB.goalType === "PENALTY"}
                          onChange={() =>
                            setScoreDataTeamB({
                              ...scoreDataTeamB,
                              goalType: "PENALTY",
                            })
                          }
                        />
                        <label htmlFor="penaltyB">Penalty</label>
                      </div>
                      <button onClick={() => handleAddGoal(1, scoreDataTeamB)}>
                        Add
                      </button>
                    </div>
                  </div>
                  {selectedMatch?.teams[1].goalScorer.length > 0 ? (
                    <div
                      className="scorerContainer"
                      style={{
                        textTransform: "capitalize",
                        background: "transparent",
                        color: "white",
                        border: "none",
                      }}
                    >
                      <h3> player </h3>
                      <h3> time </h3>
                      <h3> jersey </h3>
                      <h3> goalType </h3>
                      <h3> delete </h3>
                    </div>
                  ) : null}
                  {selectedMatch?.teams[1].goalScorer.map((scorer, index) => (
                    <div key={index} className="scorerContainer">
                      <h3> {scorer.player} </h3>
                      <h3> {scorer.time} </h3>
                      <h3> {scorer.jersey} </h3>
                      <h3> {scorer.goalType} </h3>
                      <button
                        type="button"
                        style={{ background: "red" }}
                        onClick={() =>
                          handleDeleteGoalScorer(
                            selectedMatch.teams[1].name,
                            scorer.player
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    Shootout(
                    {
                      selectedMatch.teams[1].shootout.filter(
                        (item) => item === true
                      ).length
                    }
                    )
                    <button
                      type="button"
                      onClick={() => handleShootoutUpdate(1, true)}
                    >
                      Score
                    </button>
                    <button
                      type="button"
                      style={{ background: "#FF5733" }}
                      onClick={() => handleShootoutUpdate(1, false)}
                    >
                      Miss
                    </button>
                  </div>

                  {selectedMatch.teams[1].shootout.map((item, i) => (
                    <h5 key={i}>
                      {i + 1} : {item ? "scored" : "missed"}
                    </h5>
                  ))}
                </div>
              </div>

              <hr />
              {loading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleEndGame}
                  style={{ background: "#334AFF" }}
                >
                  End Match
                </button>
              )}
            </div>
          ) : (
            <GameSelect />
          )}
        </>
      )}
    </div>
  );
};

export default UpdateMatchForm;
