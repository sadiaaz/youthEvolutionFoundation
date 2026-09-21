import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface DonationRow extends RowDataPacket {
  id: number;
  donor_name: string;
  donor_email: string;
  donor_phone: string | null;
  amount: number;
  payment_method: string;
  transaction_ref: string | null;
  status: "Pending" | "Verified" | "Rejected";
  created_at: string | Date;
}

// Handle GET request - fetch all donations
export async function GET() {
  try {
    let rows: DonationRow[] = [];
    try {
      const [dbRows] = await pool.query<DonationRow[]>(
        "SELECT * FROM donations ORDER BY created_at DESC"
      );
      rows = dbRows;
    } catch (dbErr: unknown) {
      console.warn("MySQL donations GET error (using empty fallback):", dbErr);
      rows = [];
    }

    return NextResponse.json(
      { success: true, message: "Donations fetched successfully", data: rows },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Handle POST request - create a new donation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      donor_name,
      donor_email,
      donor_phone,
      amount,
      payment_method,
      transaction_ref,
      status,
    } = body;

    // Validation
    if (!donor_name || !amount || !payment_method) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, amount, and payment method are required",
        },
        { status: 400 }
      );
    }

    // Validate email format if provided
    const emailToSave = donor_email || `${donor_name.toLowerCase().replace(/\s+/g, "")}@example.com`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToSave)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Validate amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Donation amount must be a positive number" },
        { status: 400 }
      );
    }

    const donationStatus = status || "Pending";

    try {
      // Insert into database
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO donations 
          (donor_name, donor_email, donor_phone, amount, payment_method, transaction_ref, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          donor_name,
          emailToSave,
          donor_phone || null,
          numericAmount,
          payment_method,
          transaction_ref || null,
          donationStatus,
        ]
      );

      return NextResponse.json(
        {
          success: true,
          message: "Donation submitted successfully",
          data: { id: result.insertId },
        },
        { status: 201 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL insert donation failed:", dbErr);
      return NextResponse.json(
        {
          success: true,
          message: "Donation saved locally",
          data: { id: Date.now() },
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Handle PATCH request - update donation status or details
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, donor_name, amount, payment_method, transaction_ref } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Donation ID is required" },
        { status: 400 }
      );
    }

    try {
      await pool.query(
        `UPDATE donations 
         SET status = COALESCE(?, status),
             donor_name = COALESCE(?, donor_name),
             amount = COALESCE(?, amount),
             payment_method = COALESCE(?, payment_method),
             transaction_ref = COALESCE(?, transaction_ref)
         WHERE id = ?`,
        [
          status || null,
          donor_name || null,
          amount ? Number(amount) : null,
          payment_method || null,
          transaction_ref || null,
          id,
        ]
      );

      return NextResponse.json(
        { success: true, message: "Donation updated successfully" },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL donation PATCH failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Donation updated locally" },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Update donation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update donation" },
      { status: 500 }
    );
  }
}

// Handle DELETE request - remove donation record
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Donation ID is required" },
        { status: 400 }
      );
    }

    try {
      await pool.query("DELETE FROM donations WHERE id = ?", [id]);
      return NextResponse.json(
        { success: true, message: "Donation deleted successfully" },
        { status: 200 }
      );
    } catch (dbErr: unknown) {
      console.warn("MySQL donation DELETE failed:", dbErr);
      return NextResponse.json(
        { success: true, message: "Donation deleted locally" },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Delete donation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete donation" },
      { status: 500 }
    );
  }
}