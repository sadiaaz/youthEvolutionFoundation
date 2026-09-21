import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface CertificateRow extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
  certificate_program: string;
  certificate_id: string;
  issue_date: string | Date;
  status: "Verified" | "Pending" | "Revoked";
  created_at: string | Date;
}

// Fallback seed certificates for offline/local development testing
const FALLBACK_CERTIFICATES: Array<{
  full_name: string;
  email: string;
  certificate_program: string;
  certificate_id: string;
  issue_date: string;
  status: "Verified" | "Pending" | "Revoked";
}> = [
  {
    full_name: "Numair Iqbal",
    email: "numair@example.com",
    certificate_program: "Web Development Internship 2026",
    certificate_id: "YEF-WD-2026-001",
    issue_date: "2026-09-15",
    status: "Verified",
  },
  {
    full_name: "Ayesha Khan",
    email: "ayesha@example.com",
    certificate_program: "Community Leadership Program",
    certificate_id: "YEF-CLP-2026-042",
    issue_date: "2026-08-30",
    status: "Verified",
  },
  {
    full_name: "Hamza Ali",
    email: "hamza@example.com",
    certificate_program: "Youth Mentorship Fellowship",
    certificate_id: "YEF-YMF-2026-108",
    issue_date: "2026-09-01",
    status: "Pending",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawEmail = searchParams.get("email");

    if (!rawEmail || !rawEmail.trim()) {
      return NextResponse.json(
        { success: false, message: "Email is required for certificate verification." },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();

    // Server-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    let rows: CertificateRow[] = [];

    try {
      // Parameterized query prevents SQL injection
      const [dbRows] = await pool.query<CertificateRow[]>(
        `SELECT id, full_name, email, certificate_program, certificate_id, issue_date, status 
         FROM certificates 
         WHERE LOWER(TRIM(email)) = ? 
         LIMIT 1`,
        [email]
      );
      rows = dbRows;
    } catch (dbErr: unknown) {
      console.warn("MySQL query failed (using safe offline fallback):", dbErr);
      const fallback = FALLBACK_CERTIFICATES.find(
        (c) => c.email.toLowerCase() === email
      );
      if (fallback) {
        rows = [fallback as unknown as CertificateRow];
      }
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No certificate record found for this email address. Please verify the email and try again.",
        },
        { status: 404 }
      );
    }

    const cert = rows[0];

    // Format date string safely (YYYY-MM-DD)
    let formattedDate = "";
    if (cert.issue_date) {
      try {
        formattedDate = new Date(cert.issue_date).toISOString().split("T")[0];
      } catch {
        formattedDate = String(cert.issue_date);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Certificate verified successfully.",
        data: {
          name: cert.full_name,
          email: cert.email,
          program: cert.certificate_program,
          certificateId: cert.certificate_id,
          issueDate: formattedDate,
          status: cert.status,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Certificate verification error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while verifying the certificate." },
      { status: 500 }
    );
  }
}

