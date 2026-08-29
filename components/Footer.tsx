"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";
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

      <footer className="w-full bg-[#111b15] text-gray-200 pt-14 pb-6 px-4 sm:px-8 border-t-4 border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand, Mission & Social */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Youth Evolution Foundation
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering youth through education, mentorship, and community-driven impact. We build pathways for the next generation of leaders in Pakistan.
            </p>
            <p className="text-xs font-semibold text-[#52b788] mt-2">
              Registered Non-Profit Organization | NTN: Pending
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Youth Evolution Foundation on ${label}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1b2a20] text-gray-300 hover:bg-[#52b788] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-[#52b788]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-[#52b788]">
              Get Involved
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {ACTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-all hover:pl-1 ${
                      link.href === "/donate"
                        ? "text-[#52b788] font-bold hover:text-[#74c69d] flex items-center gap-1.5"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.href === "/donate" && (
                      <Heart className="w-4 h-4 fill-[#52b788] text-[#52b788]" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="flex flex-col gap-3 text-sm">
            <h3 className="text-base font-semibold text-white mb-4 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-[#52b788]">
              Contact Details
            </h3>
            <p className="flex items-center gap-2 text-gray-400">
              <Phone className="w-4 h-4 text-[#52b788] shrink-0" />
              <span>Phone: </span>
              <a href="tel:+923304837558" className="hover:text-white transition-colors">
                +92 330 4837558
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4 text-[#52b788] shrink-0" />
              <a
                href="mailto:universityrelations.yef@gmail.com"
                className="hover:text-white transition-colors break-all"
              >
                info@youthevolutionfoundation.com
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4 text-[#52b788] shrink-0" />
              <span>Location: Karachi, Pakistan</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#233128] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Youth Evolution Foundation. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-[#52b788] font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Encrypted Secure Platform</span>
          </div>
        </div>
      </footer>
    </>
  );
}