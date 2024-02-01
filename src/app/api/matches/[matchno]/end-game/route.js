import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToUpdate = await request.json();
    const { matchNo } = dataToUpdate;
    if (!matchNo) {
      throw new Error("Missing matchNo in request");
    }

    // Fetch the existing match data from the database
    let existingMatch = await prisma.match.findUnique({
      where: { matchNo },
    });

    if (existingMatch.period === "Full") {
      return new Error("match has already ended");
    }

    // Team with the specified teamId found, update its goalScorers
    existingMatch = {
      ...existingMatch,
      period: "FULL",
      status: "RESULT",
      winner: calculateNextMatch(existingMatch.teams),
    };

    delete existingMatch.id;

    // Update the match with the modified data
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: existingMatch,
    });

    const nextMatch = await prisma.match.findUnique({
      where: {matchNo: updatedMatch.nextMatch },
    });

    delete nextMatch.id;

    const indexOfTBD = nextMatch.teams.findIndex(team => team.name === "TBD");

    if (indexOfTBD !== -1) {
      nextMatch.teams[indexOfTBD].name = existingMatch.winner;
    }


    // Replace "TBD" team name with the winner
    const updatedNextMatch = await prisma.match.update({
      where: {
        matchNo: parseInt(existingMatch.nextMatch),
      },
      data: 
        nextMatch
      ,
    });

    return NextResponse.json({
      message: "Match updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

function calculateNextMatch(teams) {
  const totalGoalsTeam1 = teams[0].goalScorer.length;
  const totalGoalsTeam2 = teams[1].goalScorer.length;

  if (totalGoalsTeam1 > totalGoalsTeam2) {
    return teams[0].name;
  } else if (totalGoalsTeam1 < totalGoalsTeam2) {
    return teams[1].name;
  } else {
    // If both teams have the same number of goals, consider shootout
    const totalShootoutTeam1 = teams[0].shootout.filter(Boolean).length;
    const totalShootoutTeam2 = teams[1].shootout.filter(Boolean).length;

    if (totalShootoutTeam1 > totalShootoutTeam2) {
      return teams[0].name;
    } else if (totalShootoutTeam1 < totalShootoutTeam2) {
      return teams[1].name;
    } else {
      return "Tie"; // If both teams have same goals and shootout, it's a tie
    }
  }
}
