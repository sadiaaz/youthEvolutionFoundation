"use client";

import { useState } from "react";
import { INTERESTS } from "@/lib/volunteer";

interface VolunteerFormProps {
  sideImageUrl?: string | null;
  sideTitle?: string;
  sideSubtitle?: string;
}

const empty = { name: "", email: "", phone: "", message: "", website: "" };

export default function VolunteerForm({
  sideImageUrl,
  sideTitle,
  sideSubtitle,
}: VolunteerFormProps) {
  const [form, setForm] = useState(empty);
  const [roles, setRoles] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    if (errors.interest) setErrors({ ...errors, interest: "" });
  };

  const handleCancel = () => {
    setForm(empty);
    setRoles([]);
    setAgreed(false);
    setErrors({});
    setServerMsg("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMsg("");

    const localErrors: Record<string, string> = {};
    if (roles.length === 0) localErrors.interest = "Kam az kam ek role chunein.";
    if (!agreed) localErrors.terms = "Aage barhne ke liye terms se ittefaq karein.";
    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interest: roles.join(", ") }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setForm(empty);
        setRoles([]);
        setAgreed(false);
      } else {
        setStatus("error");
        if (data.errors) setErrors(data.errors);
        setServerMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800/30";
  const labelClass = "mb-1 block text-sm font-semibold text-blue-900";
  const errClass = "mt-1 text-xs text-red-700";

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-5">
      {/* Left: image panel */}
      <div
        className="relative flex min-h-[240px] items-end bg-blue-900 bg-cover bg-center md:col-span-2 md:min-h-full"
        style={sideImageUrl ? { backgroundImage: `url('${sideImageUrl}')` } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/50 to-blue-900/20" />
        <div className="relative z-10 p-6 sm:p-8">
          <h2 className="font-serif text-3xl italic leading-tight text-white">
            {sideTitle || "Empowerment Through Service"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-teal-100">
            {sideSubtitle || "Unite, Serve, Impact: Your Chance to Give Back"}
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="p-6 sm:p-8 md:col-span-3">
        {status === "success" ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-2xl text-teal-700">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold text-blue-900">Thank You!</h3>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Your volunteer application has been received. Our team will review
              it and get back to you soon.
            </p>
            <button
              onClick={handleCancel}
              className="mt-6 rounded-md bg-blue-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-extrabold text-blue-900">
              Volunteer Registration
            </h3>
            <p className="mb-6 mt-1 text-sm text-slate-500">
              Thank you for your interest in volunteering with us. Please fill
              out the form below to sign up.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Spam trap */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.name && <p className={errClass}>{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                  {errors.email && <p className={errClass}>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className={inputClass}
                />
                {errors.phone && <p className={errClass}>{errors.phone}</p>}
              </div>

              <div>
                <label className={labelClass}>Preferred Volunteer Role(s)</label>
                <div className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                  {INTERESTS.map((role) => (
                    <label
                      key={role}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={roles.includes(role)}
                        onChange={() => toggleRole(role)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-800"
                      />
                      {role}
                    </label>
                  ))}
                </div>
                {errors.interest && <p className={errClass}>{errors.interest}</p>}
              </div>

              <div>
                <label className={labelClass}>Additional Comments / Questions</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us why you want to volunteer (optional)"
                  className={inputClass}
                />
                {errors.message && <p className={errClass}>{errors.message}</p>}
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: "" });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-800"
                  />
                  <span>
                    I agree to the terms &amp; conditions and to be contacted by
                    Youth Evolution Foundation.
                  </span>
                </label>
                {errors.terms && <p className={errClass}>{errors.terms}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border-2 border-blue-800 bg-white px-6 py-2.5 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-md bg-blue-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting..." : "Sign Up"}
                </button>
              </div>

              {status === "error" && serverMsg && (
                <p className="pt-1 text-center text-sm font-medium text-red-700">
                  {serverMsg}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}