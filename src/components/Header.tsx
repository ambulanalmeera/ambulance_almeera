"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header({ children }: { children?: React.ReactNode }) {
  // state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);

  // refs & hooks
  const lastScrollY = useRef(0);
  const scrollPositionRef = useRef(0);
  const pathname = usePathname();

  // scroll behavior effect
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20 || currentScrollY < lastScrollY.current) {
        setIsTopBarVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setIsTopBarVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // body scroll lock effect
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
      document.body.style.position = "relative";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.width = "auto";
      document.body.style.position = "static";
      window.scrollTo(0, scrollPositionRef.current);
      lastScrollY.current = scrollPositionRef.current;
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/services" },
    { name: "Galeri", href: "/gallery" },
    { name: "Kontak", href: "/contact" },
    { name: "Tentang Kami", href: "/about" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f5f2eb]">
      {/* styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* wrapper */}
      <div
        className={`flex flex-col min-h-screen w-full transition-transform duration-300 ease-in-out bg-[#f5f2eb] ${
          mobileMenuOpen
            ? "-translate-x-[280px] blur-[3px] pointer-events-none select-none"
            : "translate-x-0 blur-0"
        }`}
      >
        {/* top red bar */}
        <div
          className={`w-full bg-[#b81424] overflow-hidden transition-all duration-300 ease-in-out ${
            isTopBarVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <aside
            aria-label="Informasi Darurat"
            className="text-white text-xs py-2.5 px-4 md:px-12 max-w-7xl mx-auto w-full flex justify-between items-center gap-3"
          >
            {/* ticker */}
            <div className="flex items-center gap-2 font-semibold text-white text-xs min-w-0 flex-1">
              <div className="overflow-hidden whitespace-nowrap w-full relative min-w-0">
                <div className="animate-marquee inline-flex font-black text-white">
                  <span className="inline-block pr-8">
                    Hubungi kami kapanpun Anda membutuhkan di nomor Whatsapp
                    0812-9820-0895
                  </span>
                  <span className="inline-block pr-8">
                    Jl. Raden Fatah, Peninggilan Utara, Gang Haji Sibun, RT
                    001/RW 001 No. 14, Kota Tangerang, Banten.
                  </span>
                  <span className="inline-block pr-8" aria-hidden="true">
                    Hubungi kami kapanpun Anda membutuhkan di nomor Whatsapp
                    0812-9820-0895
                  </span>
                  <span className="inline-block pr-8" aria-hidden="true">
                    Jl. Raden Fatah, Peninggilan Utara, Gang Haji Sibun, RT
                    001/RW 001 No. 14, Kota Tangerang, Banten.
                  </span>
                </div>
              </div>
            </div>

            {/* social media */}
            <nav
              aria-label="Media Sosial"
              className="flex items-center gap-3 text-xs font-bold shrink-0"
            >
              <span className="hidden md:inline text-gray-100 font-bold tracking-wider text-[13px]">
                Ikuti Kami :
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#ig"
                  aria-label="Instagram"
                  className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition shadow-sm"
                >
                  <svg
                    className="w-5 h-5 fill-current text-black"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#fb"
                  aria-label="Facebook"
                  className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition shadow-sm"
                >
                  <svg
                    className="w-5 h-5 fill-current text-black"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#tt"
                  aria-label="TikTok"
                  className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition shadow-sm"
                >
                  <svg
                    className="w-5 h-5 fill-current text-black"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.28 2.56.02.93.52 1.82 1.32 2.3 1.06.63 2.45.56 3.42-.18.73-.55 1.16-1.43 1.17-2.34.02-5.4.01-10.8.01-16.2z" />
                  </svg>
                </a>
                <a
                  href="#yt"
                  aria-label="YouTube"
                  className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition shadow-sm"
                >
                  <svg
                    className="w-5 h-5 fill-current text-black"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </nav>
          </aside>
        </div>

        {/* main navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm font-sans w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-stretch relative">
            {/* logo */}
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center group py-2"
            >
              <div className="relative w-20 h-16 md:w-34 md:h-23 flex items-center justify-center overflow-hidden">
                {!logoError ? (
                  <Image
                    src="/assets/logo.png"
                    alt="Logo Ambulance Bandung Center"
                    fill
                    className="object-contain object-left"
                    priority
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="text-sm font-bold text-gray-500">Logo</div>
                )}
              </div>
            </Link>

            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-10 text-lg font-semibold text-black">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/" && pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`transition ${
                      isActive
                        ? "bg-[#b81424] text-white px-2 font-abold rounded-sm"
                        : "hover:text-[#b81424]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* emergency button */}
            <div className="flex items-center gap-2 py-2">
              <a
                href="tel:081289264252"
                className="bg-[#b81424] text-white hover:bg-[#9c0e1b] px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 flex items-center gap-2 sm:gap-3 rounded-sm"
                title="Hubungi Nomor Darurat"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative flex items-center justify-center">
                  <img
                    src="/assets/call.svg"
                    alt="Telepon Darurat"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <span className="text-xs sm:text-sm font-black tracking-tight">
                  Layanan Darurat
                </span>
              </a>

              {/* mobile toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 text-gray-900 focus:outline-none flex items-center justify-center relative z-50 transition-opacity duration-200 ${
                  mobileMenuOpen
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                aria-label="Toggle Menu"
              >
                <div className="w-7 h-5 flex flex-col justify-between relative">
                  <span
                    className={`w-full h-1 bg-current rounded-full transition-all duration-300 origin-left ${
                      mobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-1 bg-current rounded-full transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0 translate-x-3" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-1 bg-current rounded-full transition-all duration-300 origin-left ${
                      mobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* main content */}
        <main className="flex-grow w-full">{children}</main>
      </div>

      {/* mobile drawer menu */}
      <aside
        aria-label="Menu Navigasi Mobile"
        className={`fixed top-0 right-0 w-[280px] h-full bg-[#f5f2eb] shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* close button */}
          <div className="flex items-center justify-end px-6 py-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-12 h-12 bg-[#f5f2eb] flex items-center justify-center text-gray-900 font-extrabold text-4xl focus:outline-none group"
              aria-label="Tutup Menu"
            >
              <span className="inline-block transition-transform duration-300 group-hover:rotate-90">
                ✕
              </span>
            </button>
          </div>

          {/* nav links */}
          <nav className="flex flex-col px-4 font-bold text-lg text-black">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/" && pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`px-5 py-3 rounded-lg transition-all duration-200 tracking-wide ${
                      isActive
                        ? "bg-[#b81424] text-white font-extrabold"
                        : "hover:bg-[#b81424] hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
