import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany();
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.schedule || !data.teams || !data.pool) {
      return NextResponse.json({
        body: { error: "please fill all required fields" },
      });
    }
    const nextMatchNo = (await prisma.match.count()) + 1;

    const newTeam = await prisma.match.create({
      data: {
        ...data,
        matchNo: nextMatchNo,
        nextMatch: parseInt(data.nextMatch),
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
