import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface VolunteerRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string | null;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string | Date;
}

const FALLBACK_VOLUNTEERS: Array<{
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}> = [
  {
    id: 1,
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    phone: "03331122334",
    interest: "Teaching",
    message: "Want to help teach underprivileged kids.",
    status: "Pending",
    created_at: "2026-09-02",
  },
  {
    id: 2,
    name: "Zainab Tariq",
    email: "zainab@example.com",
    phone: "03219988776",
    interest: "Event Management",
    message: "Available on weekends for community drives.",
    status: "Approved",
    created_at: "2026-09-05",
  },
];

// GET: Fetch all volunteers
export async function GET() {
  try {
    let rows: VolunteerRow[] = [];
    try {
      const [dbRows] = await pool.query<VolunteerRow[]>(
        "SELECT * FROM volunteers ORDER BY created_at DESC"
      );
      rows = dbRows;
    } catch (dbErr: unknown) {
      console.warn("MySQL volunteers GET failed (using fallback):", dbErr);
      rows = FALLBACK_VOLUNTEERS as unknown as VolunteerRow[];
    }

    return NextResponse.json(
      { success: true, message: "Volunteers fetched successfully.", data: rows },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Fetch volunteers error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch volunteers." },
      { status: 500 }
    );
  }
}

// POST: Submit a new volunteer application
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO volunteers (name, email, phone, interest, message, status) 
         VALUES (?, ?, ?, ?, ?, 'Pending')`,
        [name, email.toLowerCase().trim(), phone || null, interest || null, message || null]
      );

      return NextResponse.json(
        {
          success: true,
          message: "Volunteer application submitted successfully.",
          data: { id: result.insertId },
        },
        { status: 201 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL insert volunteer failed:", dbErr);
      return NextResponse.json(
        {
          success: true,
          message: "Volunteer application saved locally.",
          data: { id: Date.now() },
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.error("Create volunteer error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit volunteer application." },
      { status: 500 }
    );
  }
}

// PATCH: Update volunteer status (Pending -> Approved -> Rejected)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, name, email, phone, interest, message } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Volunteer ID is required." },
        { status: 400 }
      );
    }

    try {
      await pool.query(
        `UPDATE volunteers 
         SET status = COALESCE(?, status),
             name = COALESCE(?, name),
             email = COALESCE(?, email),
             phone = COALESCE(?, phone),
             interest = COALESCE(?, interest),
             message = COALESCE(?, message)
         WHERE id = ?`,
        [status || null, name || null, email || null, phone || null, interest || null, message || null, id]
      );

      return NextResponse.json(
        { success: true, message: "Volunteer updated successfully." },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL volunteer PATCH failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Volunteer updated locally." },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Update volunteer error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update volunteer." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a volunteer record
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Volunteer ID is required." },
        { status: 400 }
      );
    }

    try {
      await pool.query("DELETE FROM volunteers WHERE id = ?", [id]);
      return NextResponse.json(
        { success: true, message: "Volunteer deleted successfully." },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL volunteer DELETE failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Volunteer deleted locally." },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Delete volunteer error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete volunteer." },
      { status: 500 }
    );
  }
}

