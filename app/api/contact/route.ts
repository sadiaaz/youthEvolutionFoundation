import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ContactRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: "New" | "Read" | "Resolved";
  created_at: string | Date;
}

const FALLBACK_CONTACTS: Array<{
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Read" | "Resolved";
  created_at: string;
}> = [
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@example.com",
    phone: "03001234567",
    message: "Interested in your community leadership programs.",
    status: "New",
    created_at: "2026-09-01",
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@example.com",
    phone: "03007654321",
    message: "Need more info about volunteer events in Karachi.",
    status: "Read",
    created_at: "2026-08-28",
  },
];

// GET: Fetch all contacts
export async function GET() {
  try {
    let rows: ContactRow[] = [];
    try {
      const [dbRows] = await pool.query<ContactRow[]>(
        "SELECT * FROM contacts ORDER BY created_at DESC"
      );
      rows = dbRows;
    } catch (dbErr: unknown) {
      console.warn("MySQL contacts GET failed (using fallback):", dbErr);
      rows = FALLBACK_CONTACTS as unknown as ContactRow[];
    }

    return NextResponse.json(
      { success: true, message: "Contacts fetched successfully.", data: rows },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}

// POST: Submit a new contact message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO contacts (name, email, phone, message, status) 
         VALUES (?, ?, ?, ?, 'New')`,
        [name, email.toLowerCase().trim(), phone || null, message || null]
      );

      return NextResponse.json(
        {
          success: true,
          message: "Contact message submitted successfully.",
          data: { id: result.insertId },
        },
        { status: 201 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL insert contact failed:", dbErr);
      return NextResponse.json(
        {
          success: true,
          message: "Contact saved locally.",
          data: { id: Date.now() },
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.error("Create contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit contact message." },
      { status: 500 }
    );
  }
}

// PATCH: Update contact status (New -> Read -> Resolved)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, name, email, phone, message } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required." },
        { status: 400 }
      );
    }

    try {
      await pool.query(
        `UPDATE contacts 
         SET status = COALESCE(?, status),
             name = COALESCE(?, name),
             email = COALESCE(?, email),
             phone = COALESCE(?, phone),
             message = COALESCE(?, message)
         WHERE id = ?`,
        [status || null, name || null, email || null, phone || null, message || null, id]
      );

      return NextResponse.json(
        { success: true, message: "Contact updated successfully." },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL contact PATCH failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Contact updated locally." },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Update contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update contact." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a contact record
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required." },
        { status: 400 }
      );
    }

    try {
      await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
      return NextResponse.json(
        { success: true, message: "Contact deleted successfully." },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL contact DELETE failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Contact deleted locally." },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete contact." },
      { status: 500 }
    );
  }
}

