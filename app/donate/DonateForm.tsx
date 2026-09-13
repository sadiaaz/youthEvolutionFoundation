"use client";

import { useState } from "react";

const presetAmounts = [500, 1000, 2500, 5000];

export default function DonateForm() {
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: "",
    payment_method: "Bank Transfer",
    transaction_ref: "",
  });

  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "amount") setSelectedPreset(null);
  }

  function handlePresetClick(amount: number) {
    setSelectedPreset(amount);
    setFormData({ ...formData, amount: String(amount) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          donor_name: "",
          donor_email: "",
          donor_phone: "",
          amount: "",
          payment_method: "Bank Transfer",
          transaction_ref: "",
        });
        setSelectedPreset(null);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
            Support Our Mission
          </span>
          <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
            Donation Details
          </h2>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl bg-blue-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-800">
              Thank You for Your Donation!
            </h2>
            <p className="mt-3 text-slate-600">
              Your donation has been recorded and is pending verification. We
              appreciate your support.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-md bg-blue-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl bg-slate-50 p-8 shadow-sm sm:p-10"
          >
            {/* Donation Amount Section */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-blue-800">
                Your Donation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                      selectedPreset === preset
                        ? "border-blue-800 bg-blue-800 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-800"
                    }`}
                  >
                    PKR {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                name="amount"
                min="1"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="Custom Amount (PKR)"
                className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
              />
            </div>

            {/* Donor Details Section */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-blue-800">
                Details
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="donor_name"
                  required
                  value={formData.donor_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <input
                  type="email"
                  name="donor_email"
                  required
                  value={formData.donor_email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <input
                  type="tel"
                  name="donor_phone"
                  value={formData.donor_phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <select
                  name="payment_method"
                  required
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="Cash">Cash</option>
                </select>

                <div>
                  <input
                    type="text"
                    name="transaction_ref"
                    value={formData.transaction_ref}
                    onChange={handleChange}
                    placeholder="Transaction / Reference Number"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    If you have already made the transfer, enter the reference
                    number here.
                  </p>
                </div>
              </div>
            </div>

            {status === "error" && (
              <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-blue-800 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Donate Now"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}