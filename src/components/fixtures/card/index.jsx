import { useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import "../fixtures.scss";

const formatDate = (inputDateString) => {
  const date = new Date(inputDateString);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
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
  const wordsArray = inputString.split(" ");
  const startingLetters = wordsArray.map((word) => word.charAt(0));
  return startingLetters.join("");
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
        <SlCalender /> {formatDate(match.schedule)}
      </p>
      <div className="cardMain">
        <div className="cardHeader">
          Match {match.matchNo} : {match.teams[0].name} VS {match.teams[1].name}{" "}
          <strong>({match.period})</strong> &nbsp;
          <strong style={{ textTransform: "uppercase", borderRadius: "5px" }}>
            {match.matchNo === 17
              ? "(Final)"
              : match.matchNo === 16 && "(3rd & 4th Place)"}
          </strong>
          <div>
            <div>{formatDate(match.schedule)}</div>
            <div>Local Time {formatDateTime(match.schedule)}</div>
            <div> Ground</div>
          </div>
        </div>

        <div className="cardBody">
          <h3
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
          </h3>
          <div className="gameInfo">
            <div className="teams">
              <div>{getStartingLetters(match.teams[0].name)}({match.status !== "UPCOMING" &&
                  match.teams[0].goalScorer.length})</div>
            

              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                className="scorerContainer1"
              >
                {match.teams[0].goalScorer.map((scorer) => (
                  <div key={scorer.player + scorer.time}>
                    {scorer.player} : {scorer.time}min
                  </div>
                ))}
              </div>
              {match.teams[0].shootout && (
               
                  <div >
                  <h1
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform:"uppercase"
                    }}
                  >
                    shootout
                  </h1>
                  {match.teams[0].shootout.map((item, i) => (
                    <span key={i} style={{marginRight:"10px", background:"blue",padding:"0.2rem",color:"white"}}>
                     {item ? "1" : "0"}
                    </span>
                  ))}
                  </div>
              )}
            </div>

            <div className="teams" style={{ textAlign: "end" }}>
            <div>{getStartingLetters(match.teams[1].name)}({match.status !== "UPCOMING" &&
                  match.teams[1].goalScorer.length})</div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                className="scorerContainer2"
              >
                {match.teams[1].goalScorer.map((scorer) => (
                  <div key={scorer.player + scorer.time}>
                    {scorer.player} : {scorer.time}min
                  </div>
                ))}
              </div>
              {match.teams[1].penalties && (
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textTransform: "capitalize",
                    marginTop: "0.4rem",
                  }}
                >
                  Penalities/shootout:
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {match.teams[1].penalties}
                  </span>
                </div>
              )}
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
