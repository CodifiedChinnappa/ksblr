"use client";
import { useState, useEffect } from "react";
import "./scheduler.scss";
import axios from "axios";
import FixtureCard from "@/components/fixtures/card";
import Spinner from "@/components/spinner/spinner";
import Nav from "../Nav";

const initialState = {
  pool: "",
  teams: [{ name: "" }, { name: "" }],
  nextMatch: undefined,
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

  const fetchMatches = async () => {
    setLoadingFixtures(true);
    try {
      const res = await axios.get("/api/matches");
      setMatchList(res.data.matches);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
    setLoadingFixtures(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (e, teamIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (teamIndex !== undefined) {
        newData.teams[teamIndex][name] = value;
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.post("/api/matches", formData);
      setFormData(initialState);
      fetchTeams();
    } catch (error) {
      console.error("Error adding team:", error);
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchMatches();
  }, [saving]);

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
            max="2024-02-25T00:00"
            name="schedule"
            onChange={(e) => handleChange(e)}
            required
          />
        </label>

        <label>
          Pool
          <select
            defaultValue=""
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
            defaultValue=""
            onChange={(e) => handleChange(e)}
            name="pool"
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
                <option value="" disabled>
                  Select Team
                </option>
                {teamList
                  ?.filter(
                    (teamOption) =>
                      teamOption.name !==
                      formData.teams[teamIndex === 0 ? 1 : 0].name
                  )
                  .map((teamOption) => (
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
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button type="submit">Add</button>
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