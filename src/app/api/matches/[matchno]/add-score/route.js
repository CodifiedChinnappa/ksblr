import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToUpdate = await request.json();
    const { matchNo, teamId, time, jersey, player, goalType } = dataToUpdate;
    if (!matchNo) {
      throw new Error("Missing matchNo in request");
    }

    // Fetch the existing match data from the database
    const existingMatch = await prisma.match.findUnique({
      where: { matchNo },
    });

    // Team with the specified teamId found, update its goalScorers
    existingMatch.teams[teamId].goalScorer = [
      ...existingMatch.teams[teamId].goalScorer,
      { time, goalType, jersey, player },
    ];

    delete existingMatch.id;

    // Update the match with the modified data
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: existingMatch,
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
