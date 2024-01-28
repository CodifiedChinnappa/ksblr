// pages/api/login.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const passwordMatch = password === user.password;

      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, "asdasdeafrefds");
        return NextResponse.json({ token, user });
      } else {
        return NextResponse.json({ message: "Invalid password" });
      }
    } else {
      return NextResponse.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
