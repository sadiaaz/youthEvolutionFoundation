import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateVolunteer } from "@/lib/volunteer";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam trap: bots hidden field bhar dete hain
  if (typeof body?.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const { data, errors } = validateVolunteer(body);
  if (!data) {
    return NextResponse.json(
      { error: "Validation failed.", errors },
      { status: 400 }
    );
  }

  try {
    // Same email ki pending application dobara na aaye
    const [existing]: any = await pool.query(
      "SELECT id FROM volunteers WHERE email = ? AND status = 'Pending' LIMIT 1",
      [data.email]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Is email se application pehle se review mein hai." },
        { status: 409 }
      );
    }

    const [result]: any = await pool.query(
      `INSERT INTO volunteers (name, email, phone, interest, message, status)
       VALUES (?, ?, ?, ?, ?, 'Pending')`,
      [data.name, data.email, data.phone, data.interest, data.message || null]
    );

    return NextResponse.json(
      { success: true, id: result.insertId },
      { status: 201 }
    );
  } catch (e) {
    console.error("Volunteer insert error:", e);
    return NextResponse.json(
      { error: "Server error. Dobara try karein." },
      { status: 500 }
    );
  }
}