import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToDelete = await request.json();
    const { matchNo, teams } = dataToDelete;

    if (!matchNo || !teams) {
      throw new Error("Missing required parameters in the request");
    }
console.log(teams[0].goalScorer)
    // Update the match with the modified goalScorer data
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: {
        teams,
      },
    });

    return NextResponse.json({
      message: "Goal scorer deleted successfully",
      match: updatedMatch,
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
