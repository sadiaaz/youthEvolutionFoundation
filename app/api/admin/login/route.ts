import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
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

    // Step 2: Find admin by email (with offline fallback if MySQL server is not started)
    let rows: Admin[] = [];
    try {
      const [dbRows] = await pool.query<Admin[]>(
        "SELECT * FROM admins WHERE email = ?",
        [email]
      );
      rows = dbRows;
    } catch (dbError: any) {
      console.warn("MySQL connection error:", dbError?.message || dbError);
      // If MySQL is offline (e.g., XAMPP stopped), allow default admin to login
      if (email.trim().toLowerCase() === "admin@yef.com" && password === "Admin@123") {
        rows = [
          {
            id: 1,
            name: "Admin User",
            email: "admin@yef.com",
            password: "Admin@123",
          } as Admin,
        ];
      } else {
        throw dbError;
      }
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const admin = rows[0];

    // Step 3: Compare password (supports both bcrypt hash and plaintext in DB)
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, admin.password);
    } catch {
      isMatch = false;
    }

    if (!isMatch && admin.password === password) {
      isMatch = true;
    }

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Step 4: Generate JWT token
    const secret = process.env.AUTH_SECRET || "change_this_later";
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      secret,
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
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}