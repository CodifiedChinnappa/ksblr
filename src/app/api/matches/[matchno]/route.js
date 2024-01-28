import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PATCH(request) {
  try {
    const dataToUpdate = await request.json();
    const {matchno, teamId, time, jersey, name } = dataToUpdate;

    const match = await prisma.match.update({
      where: { matchno },
      data: {
        teams: {
          update: [
            {
              where: { teamId: teamId },
              data: {
                goalScorers: {
                  push: {
                    time: time,
                    jersey: jersey,
                    name: name,
                  },
                },
              },
            },
          ],
        },
      },
    });

    return NextResponse.json({
      message: "Match updated successfully",
      match,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
