import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface Admin extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Step 1: Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Step 2: Find admin by email
    const [rows] = await db.query<Admin[]>(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const admin = rows[0];

    // Step 3: Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Step 4: Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.AUTH_SECRET as string,
      { expiresIn: "1d" }
    );

    // Step 5: Set token in secure cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: { name: admin.name, email: admin.email },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}