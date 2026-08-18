"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Teams", href: "/teams" },
  { label: "Skills & Courses", href: "/courses" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Media Gallery", href: "/gallery" },
];

const ACTION_LINKS: FooterLink[] = [
  { label: "Become a Volunteer", href: "/volunteer" },
  { label: "Donate Now (Secure)", href: "/donate" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Youth Evolution Foundation",
    "description":
      "Empowering youth through education, mentorship, and community-driven impact in Pakistan.",
    "url": "https://youthevolution.org",
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
      {/* Google Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <footer className="w-full bg-[#111b15] text-gray-200 pt-14 pb-6 px-4 sm:px-8 border-t-4 border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Mission */}
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