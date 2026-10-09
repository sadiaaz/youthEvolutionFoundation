import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { STATUSES } from "@/lib/volunteer";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const volunteerId = Number(id);
  if (!Number.isInteger(volunteerId) || volunteerId < 1) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const status = body?.status;
  if (!(STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json(
      { error: "Status Pending, Approved ya Rejected hona chahiye." },
      { status: 400 }
    );
  }

  try {
    const [found]: any = await pool.query(
      "SELECT id FROM volunteers WHERE id = ?",
      [volunteerId]
    );
    if (found.length === 0) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await pool.query(
      "UPDATE volunteers SET status = ?, reviewed_at = ? WHERE id = ?",
      [status, status === "Pending" ? null : new Date(), volunteerId]
    );

    return NextResponse.json({ success: true, id: volunteerId, status });
  } catch (e) {
    console.error("Volunteer status error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const volunteerId = Number(id);
  if (!Number.isInteger(volunteerId) || volunteerId < 1) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  await pool.query("DELETE FROM volunteers WHERE id = ?", [volunteerId]);
  return NextResponse.json({ success: true });
}