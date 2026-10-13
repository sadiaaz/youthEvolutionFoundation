export const INTERESTS = [
  "Education & Mentorship",
  "Community Outreach",
  "Events & Campaigns",
  "Fundraising",
  "Media & Social Media",
  "Other",
] as const;

export const STATUSES = ["Pending", "Approved", "Rejected"] as const;
export type VolunteerStatus = (typeof STATUSES)[number];

export interface VolunteerInput {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export function validateVolunteer(body: any): {
  data?: VolunteerInput;
  errors?: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(body?.name);
  const email = str(body?.email).toLowerCase();
  const phone = str(body?.phone);
  const message = str(body?.message);

  // Interest: ek ya zyada roles, comma se alag
  const roles = Array.from(
    new Set(
      str(body?.interest)
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean)
    )
  );
  const interest = roles.join(", ");

  if (name.length < 2 || name.length > 100)
    errors.name = "Name 2 se 100 characters ka hona chahiye.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 150)
    errors.email = "Sahi email address likhein.";

  const digits = phone.replace(/\D/g, "");
  if (!/^[+\d][\d\s\-()]*$/.test(phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Sahi phone number likhein (7 se 15 digits).";

  if (
    roles.length === 0 ||
    !roles.every((r) => (INTERESTS as readonly string[]).includes(r))
  )
    errors.interest = "Kam az kam ek role chunein.";

  if (message.length > 2000)
    errors.message = "Message 2000 characters se chhota hona chahiye.";

  if (Object.keys(errors).length) return { errors };
  return { data: { name, email, phone, interest, message } };
}