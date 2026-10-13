import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { STATUSES } from "@/lib/volunteer";

export async function GET(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
  const offset = (page - 1) * limit;

  const where: string[] = [];
  const params: any[] = [];
  if (status) {
    if (!(STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
    }
    where.push("status = ?");
    params.push(status);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, interest, message, status, reviewed_at, created_at, updated_at
       FROM volunteers ${clause}
       ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [countRows]: any = await pool.query(
      "SELECT status, COUNT(*) AS total FROM volunteers GROUP BY status"
    );

    const counts: Record<string, number> = { Pending: 0, Approved: 0, Rejected: 0 };
    for (const r of countRows) counts[r.status] = Number(r.total);

    return NextResponse.json({ data: rows, counts, page, limit });
  } catch (e) {
    console.error("Volunteer list error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}