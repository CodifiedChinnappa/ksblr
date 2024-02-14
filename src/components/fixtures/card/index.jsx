import { useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import "../fixtures.scss";

const formatDate = (inputDateString) => {
  const date = new Date(inputDateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (inputDateString) => {
  const date = new Date(inputDateString);

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

function getStartingLetters(inputString) {
  const wordsArray = inputString?.split(" ");
  const startingLetters = wordsArray?.map((word) => word.charAt(0));
  return startingLetters?.join("");
}

function calculateWinner(teams) {
  const totalGoalsTeam1 = teams[0].goalScorer.length;
  const totalGoalsTeam2 = teams[1].goalScorer.length;

  if (totalGoalsTeam1 > totalGoalsTeam2) {
    return `${teams[0].name} wins`;
  } else if (totalGoalsTeam1 < totalGoalsTeam2) {
    return `${teams[1].name} wins`;
  } else {
    // If both teams have the same number of goals, consider shootout
    const totalShootoutTeam1 = teams[0].shootout.filter(Boolean).length;
    const totalShootoutTeam2 = teams[1].shootout.filter(Boolean).length;

    if (totalShootoutTeam1 > totalShootoutTeam2) {
      return `${teams[0].name} wins by Shootout`;
    } else if (totalShootoutTeam1 < totalShootoutTeam2) {
      return `${teams[1].name} wins by Shootout`;
    } else {
      return "Draw"; // If both teams have same goals and shootout, it's a tie
    }
  }
}

function generateCommentary(teams) {
  const commentaryArray = [];

  const team1 = teams[0].name;
  const team2 = teams[1].name;
  const goalsTeam1 = teams[0].goalScorer;
  const goalsTeam2 = teams[1].goalScorer;

  commentaryArray.push(`Exciting match between ${team1} & ${team2}!`);

  // Commentary for Team 1's goals
  if (goalsTeam1.length > 0) {
    goalsTeam1.forEach((goal) => {
      commentaryArray.push(
        `Its a goal! ${goal.player} scored at ${goal.time}th minute as ${goal.goalType} goal`
      );
    });
  }

  // Commentary for Team 2's goals
  if (goalsTeam2.length > 0) {
    goalsTeam2.forEach((goal) => {
      commentaryArray.push(
        `Its a goal! ${goal.player} scored at ${goal.time}th minute as ${goal.goalType} goal `
      );
    });
  }

  if (teams[0].shootout.length > 0 || teams[1].shootout.length > 0) {
    commentaryArray.push("The match went into a shootout.");
  }

  return commentaryArray;
}

const FixtureCard = ({ match }) => {
  return (
    <div className="cardWrapper">
      <p>
        <SlCalender /> {formatDate(match.schedule)}, &nbsp;
        {formatDateTime(match.schedule)}
      </p>

      <div className="cardMain">
        <div className="cardHeader">
          Match {match.matchNo} : {match.round} : {match.period}
          &nbsp;
        </div>

        <div className="cardBody">
          <div className="gameInfo">
            <div className="teams">
              <div
               style={{
                fontSize: "1rem",
                fontWeight: 600,
                textAlign: "center",
              }}
              >
                {match.teams[0]?.name}
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                className="scorerContainer1"
              >
                <h1 className="label">
                  goals
                  {`(${match.teams[0].goalScorer.length})`}
                </h1>
                {match.teams[0]?.goalScorer.map((scorer) => (
                  <div key={scorer.player + scorer.time}>
                    {scorer.player} : ({scorer.goalType}) : {scorer.time}min
                  </div>
                ))}
              </div>
              {match.teams[0]?.shootout.length > 0 ? (
                <div className="shootout-container">
                  <h1 className="label">
                    Shootout
                    {match.status !== "UPCOMING" &&
                      `(${
                        match.teams[0].shootout.filter((item) => item === true)
                          .length
                      })`}
                  </h1>
                  <div>
                    {match.teams[0].shootout.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          marginRight: "10px",
                          background: "blue",
                          padding: "0.2rem",
                          color: "white",
                        }}
                      >
                        {item ? "1" : "0"}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="teams" style={{ textAlign: "end" }}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {match.teams[1]?.name}
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                className="scorerContainer1"
              >
                <h1 className="label">
                  goals
                  {`(${match.teams[1].goalScorer.length})`}
                </h1>
                <div>
                  {match.teams[1]?.goalScorer.map((scorer) => (
                    <div key={scorer.player + scorer.time}>
                      {scorer.player}({scorer.goalType}) : {scorer.time}min
                    </div>
                  ))}
                </div>
              </div>
              {match.teams[1]?.shootout.length > 0 ? (
                <div className="shootout-container">
                  <h1 className="label">
                    Shootout
                    {match.status !== "UPCOMING" &&
                      `(${
                        match.teams[1].shootout.filter((item) => item === true)
                          .length
                      })`}
                  </h1>
                  <div>
                    {match.teams[1]?.shootout.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          marginRight: "10px",
                          background: "blue",
                          padding: "0.2rem",
                          color: "white",
                        }}
                      >
                        {item ? "1" : "0"}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {match.status === "RESULT" && (
            <h6
              style={{
                marginTop: "10px",
                textAlign: "center",
                padding: "0.2rem",
                background: "green",
                color: "white",
                fontSize: "0.8rem",
              }}
            >
              {calculateWinner(match.teams)}
            </h6>
          )}
          <ul style={{ paddingInline: "1rem" }}>
            {match.status === "LIVE" &&
              generateCommentary(match.teams).map((item) => (
                <li
                  style={{
                    marginTop: "10px",
                    padding: "0.2rem",
                    fontSize: "0.8rem",
                    textTransform: "initial",
                  }}
                  key={item}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
