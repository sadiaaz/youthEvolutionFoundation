"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  MessageCircle, 
  HandHeart, 
  Heart, 
  Menu, 
  X,
  Phone,
  Mail
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  title: string;
}

// Only pages that actually exist in the project — extra pages removed per Sadia's instruction
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", title: "Youth Evolution Foundation Home" },
  { label: "About", href: "/about-us", title: "About Youth Evolution Foundation" },
  { label: "Our Work", href: "/our-work", title: "Our Work in Evolution Foundation" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": NAV_LINKS.map((link) => link.label),
    "url": NAV_LINKS.map((link) => `https://youthevolution.org${link.href}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        {/* Top Utility Bar */}
        <div className="bg-[#0C2643] text-white text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-blue-900/40">
          <address className="not-italic flex flex-wrap justify-between items-center gap-2 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="tel:+923304837558"
                className="flex items-center gap-1.5 hover:text-blue-200 transition-colors font-medium text-xs sm:text-sm"
              >
                <Phone className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />
                <span>+92 330 4837558</span>
              </a>
              <a
                href="mailto:info@youthevolutionfoundation.com"
                className="hidden md:flex items-center gap-1.5 hover:text-blue-200 transition-colors font-medium text-xs sm:text-sm"
              >
                <Mail className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />
                <span>info@youthevolutionfoundation.com</span>
              </a>
              <a
                href="https://wa.me/923304837558"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Youth Evolution Foundation via WhatsApp"
                className="hidden sm:flex items-center gap-1.5 hover:text-green-300 transition-colors font-semibold text-xs text-green-400"
              >
                <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                <span>WHATSAPP</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/volunteer"
                title="Become a Volunteer with Youth Evolution Foundation"
                className="flex items-center gap-1.5 font-semibold hover:text-blue-200 transition-colors uppercase text-xs"
              >
                <HandHeart className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Become a Volunteer</span>
              </Link>
            </div>
          </address>
        </div>

        {/* Main Semantic Navigation Bar */}
        <nav 
          className="bg-[#0046ad] text-white px-4 sm:px-8 py-2.5" 
          aria-label="Main Navigation"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Brand Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
              title="Youth Evolution Foundation Home Page"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white/60 bg-[#004bb1] shadow-lg ring-2 ring-white/30 flex items-center justify-center p-0.5 transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:shadow-xl">
                <Image
                  src="/images/yef-logo.png"
                  alt="Youth Evolution Foundation Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain rounded-xl"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg font-extrabold tracking-wide uppercase text-white">
                  Youth Evolution
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-blue-200 uppercase">
                  Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={link.title}
                      className={`transition-colors pb-0.5 ${
                        isActive
                          ? "border-b-2 border-white text-white font-bold"
                          : "hover:text-blue-200 text-blue-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button & Mobile Toggle Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/donate"
                title="Donate to Youth Evolution Foundation"
                className="hidden sm:flex items-center gap-2 bg-white text-[#0046ad] hover:bg-blue-50 px-5 py-2 rounded-md font-bold text-sm shadow-sm transition-all transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" aria-hidden="true" />
                <span>Donate</span>
              </Link>

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          {isOpen && (
            <div className="md:hidden mt-3 pt-4 border-t border-blue-600/50 flex flex-col gap-3 pb-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-2 py-1.5 rounded font-medium transition-colors ${
                      isActive ? "bg-blue-800 text-white font-bold" : "hover:bg-blue-700 text-blue-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-white text-[#0046ad] py-2.5 rounded-md font-bold text-center"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" aria-hidden="true" />
                <span>Donate Now</span>
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}