import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToDelete = await request.json();
    const { matchNo, value } = dataToDelete;

    if (!value) {
      throw new Error("Missing required parameters in the request");
    }

    // Update the match with the modified goalScorer data
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: {
        status: value,
      },
    });

    return NextResponse.json({
      message: "Status updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
