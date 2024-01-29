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
    hour12: true, // Include AM/PM
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

const FixtureCard = ({ match }) => {
  return (
    <div className="cardWrapper">
      <p>
        <SlCalender /> {formatDate(match.schedule)},
      &nbsp;
        {formatDateTime(match.schedule)}
      </p>
      <div className="cardMain">
        <div className="cardHeader">
          Match {match.matchNo}
          <small>
            : {match.teams[0].name} <strong>VS</strong> {match.teams[1].name}{" "}
          </small>
          &nbsp;
          {/* TODO */}
          <strong style={{ textTransform: "uppercase", borderRadius: "5px" }}>
            {match.matchNo === 17
              ? "(Final)"
              : match.matchNo === 16 && "(3rd & 4th Place)"}
          </strong>
         
        </div>

        <div className="cardBody">
          {/* <h3
            style={{
              background:
                match.status === "UPCOMING"
                  ? "blue"
                  : match.status === "LIVE"
                  ? "green"
                  : "orange",
              marginBottom: `10px`,
            }}
          >
            {match.status}
          </h3> */}
          <h3
            style={{
              background: "Blue",
              marginBottom: `10px`,
            }}
          >
            {match.period}
          </h3>

          <div className="gameInfo">
            <div className="teams">
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                }}
              >
                {getStartingLetters(match.teams[0].name)}
                {match.status !== "UPCOMING" &&
                  `(${match.teams[0].goalScorer.length})`}
              </div>

              {!!match.teams[0].goalScorer.length > 0 ? (
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textTransform: "capitalize",
                    marginBottom: "15px",
                  }}
                  className="scorerContainer1"
                >
                  <h1 className="label">goals</h1>
                  {match.teams[0].goalScorer.map((scorer) => (
                    <div key={scorer.player + scorer.time}>
                      {scorer.player} : {scorer.time}min
                    </div>
                  ))}
                </div>
              ) : null}
              {match.teams[0].shootout.length > 0 ? (
                <div>
                  <h1 className="label">shootout</h1>
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
              ) : null}
            </div>

            <div className="teams" style={{ textAlign: "end" }}>
              <div className="label">
                {getStartingLetters(match.teams[1].name)}
                {match.status !== "UPCOMING" &&
                  `(${match.teams[1].goalScorer.length})`}
              </div>

              {!!match.teams[1].goalScorer.length > 0 ? (
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textTransform: "capitalize",
                    marginBottom: "15px",
                  }}
                  className="scorerContainer1"
                >
                  <h1 className="label">goals</h1>
                  {match.teams[1].goalScorer.map((scorer) => (
                    <div key={scorer.player + scorer.time}>
                      {scorer.player} : {scorer.time}min
                    </div>
                  ))}
                </div>
              ) : null}
              {match.teams[1].shootout.length > 0 ? (
                <div>
                  <h1 className="label">shootout</h1>
                  {match.teams[1].shootout.map((item, i) => (
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
              ) : null}
            </div>
          </div>

          {match.status === "RESULT" && (
            <div
              style={{
                marginTop: "10px",
                textAlign: "center",
                padding: "0.2rem",
                background: "green",
                color: "white",
              }}
            >
              {calculateWinner(match.teams)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
