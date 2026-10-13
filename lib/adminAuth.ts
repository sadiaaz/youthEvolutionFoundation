import { timingSafeEqual } from "crypto";

export function isAdmin(req: Request): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const sent = req.headers.get("x-admin-key") || "";
  const a = Buffer.from(sent);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}