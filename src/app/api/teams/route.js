import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const teams = await prisma.teams.findMany();
    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({
        body: { error: "Team name is required" },
      });
    }


    const newTeam = await prisma.teams.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      body: newTeam,
    });
  } catch (error) {
    console.error("Error adding team:", error);
    return NextResponse.json({
      body: { error: "Internal Server Error" },
    });
  }
}
