"use client";
import { useState, useEffect } from "react";
import "./scheduler.scss";
import axios from "axios";
import FixtureCard from "@/components/fixtures/card";
import Spinner from "@/components/spinner/spinner";
import Nav from "../Nav";

const initialState = {
  pool: "",
  teams: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  nextMatch: "",
  schedule: "",
  round: "",
};

const CreateSchedule = () => {
  const [formData, setFormData] = useState(initialState);
  const [teamList, setTeamList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("/api/teams");
      setTeamList(res.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  console.log({
    ...formData,
  });

  const resetFormData = () => {
    setFormData(() => ({
      ...initialState,
      teams: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
    }));
  };
  

  const fetchMatches = async () => {
    setLoadingFixtures(true);
    try {
      const res = await axios.get("/api/matches");
      setMatchList(res.data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error); // Corrected the log message
    }
    setLoadingFixtures(false);
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches(); // Moved fetchMatches to a separate useEffect to fetch matches initially and when saving changes
  }, []);
  const handleChange = (e, teamIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (["pool", "nextMatch", "schedule", "round"].includes(name)) {
        newData[name] = value;
      } else if (name === "name" && teamIndex !== undefined) {
        newData.teams[teamIndex][name] = value;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.post("/api/matches", formData);
      resetFormData();
      fetchMatches();
    } catch (error) {
      console.error("Error adding match:", error);
    }
    setSaving(false);
  };

  return (
    <div className="scheduleWrapper">
      <Nav />
      <form onSubmit={handleSubmit} className="scheduleContainer">
        <label>
          Time
          <input
            type="datetime-local"
            value={formData.schedule}
            min="2024-02-04T00:00"
            max="2024-02-26T00:00"
            name="schedule"
            onChange={(e) => handleChange(e)}
            required
          />
        </label>

        <label>
          Pool
          <select
            value={formData.pool}
            onChange={(e) => handleChange(e)}
            name="pool"
            required
          >
            <option value="" disabled>
              select a pool
            </option>
            <option value="a">A</option>
            <option value="b">B</option>
          </select>
        </label>

        <label>
          Round
          <select
            value={formData.round}
            onChange={(e) => handleChange(e)}
            name="round" 
            required
          >
            <option value="" disabled>
              select round
            </option>
            <option value="day1">Day 1</option>
            <option value="day2">Day 2</option>
            <option value="day3">Day 3</option>
            <option value="semifinal">Semifinal</option>
            <option value="final">Final</option>
          </select>
        </label>

        {formData.teams.map((team, teamIndex) => (
          <div key={teamIndex}>
            <label>
              Team{teamIndex + 1}
              <select
                value={team.name}
                onChange={(e) => handleChange(e, teamIndex)}
                name="name"
                required
              >
                <option value="">Select Team</option>
                {teamList
                  ?.map((teamOption) => (
                    <option key={teamOption.id} value={teamOption.name}>
                      {teamOption.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        ))}

        <label>
          Next match number
          <input
            type="number"
            value={formData.nextMatch}
            min="1"
            max="19"
            name="nextMatch"
            placeholder="Enter next match No"
            onChange={(e) => handleChange(e)}
          />
        </label>
        {saving ? <Spinner /> : <button type="submit">Add</button>}
      </form>
      <div className="cardContainer">
        {loadingFixtures ? (
          <Spinner />
        ) : matchList.length > 0 ? (
          matchList.map((match) => <FixtureCard match={match} key={match.id} />)
        ) : (
          <h2>No schedules found</h2>
        )}
      </div>
    </div>
  );
};

export default CreateSchedule;
