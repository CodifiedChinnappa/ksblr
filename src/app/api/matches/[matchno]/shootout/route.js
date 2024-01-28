import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToUpdate = await request.json();
    const { matchNo, teamId, value } = dataToUpdate;
    if (!matchNo) {
      throw new Error("Missing required parameters in the request");
    }

    // Fetch the existing match data from the database
    let existingMatch = await prisma.match.findUnique({
      where: { matchNo },
    });

    // Team with the specified teamId found, update its goalScorers
    existingMatch.teams[teamId].shootout = [
      ...existingMatch.teams[teamId].shootout,
      value,
    ];

    delete existingMatch.id;
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: existingMatch,
    });
    return NextResponse.json({
      message: "data updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
