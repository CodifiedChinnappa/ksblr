"use client";
import React, { useState, useEffect } from "react";
import "./teams.scss";
import axios from "axios";
import Spinner from "@/components/spinner/spinner";
import Nav from "../Nav";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [savingTeam, setSavingTeam] = useState(false);

  const fetchTeams = async () => {
    setLoadingTeams(true);
    try {
      const res = await axios.get("/api/teams");
      if (res?.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }
      setTeams(res.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
    setLoadingTeams(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async () => {
    setSavingTeam(true);
    try {
      if (newTeamName.trim() === "") {
        alert("Team name cannot be empty");
        return;
      }
      // Use the `addTeam` named export
      const res = await axios.post("/api/teams", { name: newTeamName });
      setNewTeamName("");
      fetchTeams();
    } catch (error) {
      console.error("Error adding team:", error);
    }
    setSavingTeam(false);
  };

  return (
    <div className="teamWrapper">
      <Nav />
      <div className="teamsContainer">
        <div className="addTeam">
          <h2>Add Team</h2>
          <label>
            Team Name:
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </label>

          {savingTeam ? (
            <Spinner />
          ) : (
            <button onClick={handleAddTeam}>Add Team</button>
          )}
        </div>

        <div className="teamsList">
          <h2>Teams List</h2>
          {loadingTeams ? (
            <Spinner />
          ) : (
            <ol type="1">
              {teams.map((team) => (
                <li key={team.id}>{team.name}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
