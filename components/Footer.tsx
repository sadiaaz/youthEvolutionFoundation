"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, Heart, Globe } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5ZM.2 8.5h4.6V23H.2V8.5ZM8.4 8.5h4.4v2h.06c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V23h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V23H8.4V8.5Z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23 12s0-3.6-.5-5.3c-.3-1-1.1-1.8-2.1-2.1C18.6 4 12 4 12 4s-6.6 0-8.4.6c-1 .3-1.8 1.1-2.1 2.1C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1 1.1 1.8 2.1 2.1C5.4 20 12 20 12 20s6.6 0 8.4-.6c1-.3 1.8-1.1 2.1-2.1.5-1.7.5-5.3.5-5.3ZM9.8 15.5V8.5l6.2 3.5-6.2 3.5Z"/>
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

// Only pages that actually exist in the project
const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Work", href: "/our-work" },
];

const ACTION_LINKS: FooterLink[] = [
  { label: "Become a Volunteer", href: "/volunteer" },
  { label: "Donate Now (Secure)", href: "/donate" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571368734643", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/youthevolutionfoundation?igsh=MWFqZHpjeDhkdXE2Yg%3D%3D", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/youth-evolution-foundation/", Icon: LinkedinIcon },
  { label: "YouTube", href: "https://www.youtube.com/@YouthEvolutionFoundation", Icon: YoutubeIcon },
];

export default function Footer() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Youth Evolution Foundation",
    "description":
      "Empowering youth through education, mentorship, and community-driven impact in Pakistan.",
    "url": "https://youthevolution.org",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61571368734643",
      "https://www.instagram.com/youthevolutionfoundation?igsh=MWFqZHpjeDhkdXE2Yg%3D%3D",
      "https://www.linkedin.com/company/youth-evolution-foundation/",
      "https://www.youtube.com/@YouthEvolutionFoundation",
    ],
    "telephone": "+923304837558",
    "email": "universityrelations.yef@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <footer className="w-full bg-[#0C1E33] text-gray-200 pt-16 pb-6 px-4 sm:px-8 border-t-4 border-[#064CA1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand, Mission & Social */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white/60 bg-[#004bb1] shadow-lg ring-2 ring-blue-400/30 flex items-center justify-center p-0.5 transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:shadow-xl">
                <Image
                  src="/images/yef-logo.png"
                  alt="Youth Evolution Foundation Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-white tracking-wide">
                  Youth Evolution
                </span>
                <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">
                  Foundation
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering youth through education, mentorship, and community-driven impact. We build pathways for the next generation of leaders in Pakistan.
            </p>

            <div className="mt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-200 border border-blue-800/60 shadow-sm">
                Registered Non-Profit Organization | NTN: Pending
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Youth Evolution Foundation on ${label}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-950/80 text-blue-200 border border-blue-900/80 hover:bg-[#0046ad] hover:text-white hover:border-blue-400 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-blue-400">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-all hover:pl-1.5 flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-blue-400">
              Get Involved
            </h3>
            <div className="flex flex-col gap-3.5 text-sm">
              <Link
                href="/volunteer"
                className="text-slate-300 hover:text-white transition-all hover:pl-1.5 flex items-center gap-2 group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                Become a Volunteer
              </Link>

              <Link
                href="/donate"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#0046ad] hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-blue-400/30"
              >
                <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                <span>Donate Now (Secure)</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Contact & Location — Highlighted per YEF brand guidelines */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-blue-400">
              Contact Details
            </h3>
            
            <div className="flex flex-col gap-2.5 text-sm">
              {/* Phone */}
              <a
                href="tel:+923304837558"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-slate-200 hover:text-white hover:bg-blue-900/40 hover:border-blue-400 transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0046ad] text-blue-100 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">Phone</span>
                  <span className="font-semibold text-xs sm:text-sm">+92 330 4837558</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@youthevolutionfoundation.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-slate-200 hover:text-white hover:bg-blue-900/40 hover:border-blue-400 transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0046ad] text-blue-100 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">Email</span>
                  <span className="font-semibold text-xs truncate">info@youthevolutionfoundation.com</span>
                </div>
              </a>

              {/* Website */}
              <a
                href="https://youthevolution.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-slate-200 hover:text-white hover:bg-blue-900/40 hover:border-blue-400 transition-all group"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0046ad] text-blue-100 group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">Website</span>
                  <span className="font-semibold text-xs sm:text-sm">youthevolution.org</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-slate-200">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0046ad] text-blue-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">Location</span>
                  <span className="font-semibold text-xs sm:text-sm">Karachi, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Youth Evolution Foundation. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-blue-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SSL Encrypted Secure Platform</span>
          </div>
        </div>
      </footer>
    </>
  );
}