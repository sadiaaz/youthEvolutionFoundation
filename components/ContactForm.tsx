"use client";

import { useState } from "react";

interface ContactFormProps {
  officeAddress?: string;
  phoneNumbers?: string;
  faxNumber?: string;
  email?: string;
}

export default function ContactForm({
  officeAddress,
  phoneNumbers,
  faxNumber,
  email,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  // Extra khali lines hata deta hai
  const clean = (value?: string) =>
    value
      ? value
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join("\n")
      : undefined;

  const cards = [
    {
      icon: "📍",
      title: "Our Office",
      text: clean(officeAddress) || "Karachi, Pakistan",
      breakAll: false,
    },
    {
      icon: "📞",
      title: "Phone Number",
      text: clean(phoneNumbers) || "+92 330 4837558",
      breakAll: false,
    },
    {
      icon: "📠",
      title: "Fax",
      text: faxNumber?.trim() || "N/A",
      breakAll: false,
    },
    {
      icon: "✉️",
      title: "Email",
      text: email?.trim() || "info@youthevolutionfoundation.com",
      breakAll: true,
    },
  ];

  const inputClass =
    "w-full rounded-lg border border-teal-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800/30";

  return (
    <>
      {/* Info Cards */}
      <section className="relative z-10 -mt-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon, title, text, breakAll }) => (
              <div
                key={title}
                className="rounded-xl border-t-4 border-teal-400 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl">
                  {icon}
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-900">
                  {title}
                </p>
                <p
                  className={`whitespace-pre-line text-sm leading-relaxed text-slate-600 ${
                    breakAll ? "break-all" : "break-words"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 pt-12">
        <div className="mx-auto max-w-xl px-6">
          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 shadow-xl sm:p-10">
            <span className="block text-center text-xs font-bold uppercase tracking-[0.3em] text-teal-600">
              Get In Touch
            </span>
            <h2 className="mb-8 mt-2 text-center text-3xl font-extrabold text-blue-900">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your Name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter a valid email address"
                className={inputClass}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className={inputClass}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Your message..."
                className={inputClass}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-blue-800 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="pt-2 text-center text-sm font-medium text-teal-700">
                  Your message has been sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="pt-2 text-center text-sm font-medium text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}