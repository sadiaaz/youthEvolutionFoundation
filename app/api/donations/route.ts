import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

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
    } = body;

    // Validation
    if (!donor_name || !donor_email || !amount || !payment_method) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, amount, and payment method are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donor_email)) {
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

    // Insert into database
    const [result] = await pool.query(
      `INSERT INTO donations 
        (donor_name, donor_email, donor_phone, amount, payment_method, transaction_ref, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
      [
        donor_name,
        donor_email,
        donor_phone || null,
        numericAmount,
        payment_method,
        transaction_ref || null,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Donation submitted successfully",
        data: { id: (result as any).insertId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Handle GET request - fetch all donations (for admin dashboard later)
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM donations ORDER BY created_at DESC"
    );

    return NextResponse.json(
      { success: true, message: "Donations fetched successfully", data: rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}