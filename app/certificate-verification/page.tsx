"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Award, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from "lucide-react";

interface CertificateData {
  name: string;
  email: string;
  program: string;
  certificateId: string;
  issueDate: string;
  status: "Verified" | "Pending" | "Revoked";
}

export default function CertificateVerificationPage() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [errorType, setErrorType] = useState<"not_found" | "server_error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setErrorType(null);
    setCertificate(null);

    const trimmed = certificateId.trim().toUpperCase();
    if (!trimmed) {
      setValidationError("Please enter your Certificate ID.");
      return;
    }

    const certificateIdRegex = /^[A-Z0-9]+(?:-[A-Z0-9]+)+$/;
    if (!certificateIdRegex.test(trimmed)) {
      setValidationError("Please enter a valid Certificate ID (e.g., YEF-2026-2319).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/certificates/verify?certificateId=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (res.status === 200 && data.success) {
        setCertificate(data.data);
      } else if (res.status === 404) {
        setErrorType("not_found");
        setErrorMessage(data.message || "No certificate record found for this Certificate ID.");
      } else {
        setErrorType("server_error");
        setErrorMessage(data.message || "Unable to verify certificate at this time. Please try again later.");
      }
    } catch (err) {
      console.error("Verification network error:", err);
      setErrorType("server_error");
      setErrorMessage("Network error occurred. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCertificateId("");
    setCertificate(null);
    setErrorType(null);
    setErrorMessage("");
    setValidationError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#0046ad] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-[#0046ad]" />
            Official YEF Credential Registry
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C2643] tracking-tight">
            Certificate Verification
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Verify the authenticity of internship, training, and fellowship certificates issued by the{" "}
            <span className="font-semibold text-[#0046ad]">Youth Evolution Foundation</span>.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 sm:p-8 mb-8 backdrop-blur-sm">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="verify-certificate-id" className="block text-sm font-semibold text-slate-700 mb-2">
                Certificate ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Award className="w-5 h-5" />
                </div>
                <input
                  id="verify-certificate-id"
                  type="text"
                  value={certificateId}
                  onChange={(e) => {
                    setCertificateId(e.target.value.toUpperCase());
                    if (validationError) setValidationError("");
                  }}
                  placeholder="e.g. YEF-2026-2319"
                  autoComplete="off"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0046ad] focus:border-transparent transition-all shadow-inner disabled:opacity-60"
                />
              </div>
              {validationError && (
                <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {validationError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto sm:min-w-[180px] bg-[#0046ad] hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result: Verified Success Card */}
        {certificate && (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-500/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-base leading-tight">Official Certificate Verified</h2>
                  <p className="text-emerald-100 text-xs">Authentic Record Registered in YEF Database</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-800 shadow-sm uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {certificate.status}
              </span>
            </div>

            {/* Certificate Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Student / Participant Name
                  </span>
                  <p className="text-lg font-bold text-[#0C2643]">
                    {certificate.name}
                  </p>
                </div>

                {/* Program Name */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Program / Track
                  </span>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Award className="w-4 h-4 text-[#0046ad] shrink-0" />
                    <span className="text-sm sm:text-base leading-snug">{certificate.program}</span>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Certificate ID
                  </span>
                  <p className="font-mono text-sm font-bold text-[#0046ad] tracking-wide">
                    {certificate.certificateId}
                  </p>
                </div>

                {/* Issue Date */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Issue Date
                  </span>
                  <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{certificate.issueDate}</span>
                  </div>
                </div>

              </div>

              {/* Authority Footer Box */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src="/images/yef-logo.png"
                      alt="YEF Logo"
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span>Issued by <strong>Youth Evolution Foundation</strong> Official Secretariat</span>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-[#0046ad] hover:text-blue-800 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Verify Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result: Not Found Card */}
        {errorType === "not_found" && (
          <div className="bg-white rounded-2xl shadow-md border-2 border-amber-300/80 p-6 sm:p-8 text-center animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No Record Found</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
              >
                Try Another Certificate ID
              </button>
              <Link
                href="/about-us"
                className="px-4 py-2 bg-[#0046ad] hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1"
              >
                <span>Contact YEF Support</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Result: Server / Network Error Card */}
        {errorType === "server_error" && (
          <div className="bg-white rounded-2xl shadow-md border-2 border-red-300/80 p-6 sm:p-8 text-center animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Verification Error</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={handleVerify}
              className="px-5 py-2.5 bg-[#0046ad] hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
