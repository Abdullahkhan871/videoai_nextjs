import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email.trim() || password.trim()) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Existing user on with this email" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json({ message: "User Register" }, { status: 201 });
  } catch (error) {
    console.log("Error on Auth Resgister route", error);
    return NextResponse.json(
      { error: "Faild to register user" },
      { status: 400 }
    );
  }
}
