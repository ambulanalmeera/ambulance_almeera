"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WhatsAppFloating() {
  const [showAlert, setShowAlert] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iconBounce, setIconBounce] = useState(false);

  // alert & bounce effect
  useEffect(() => {
    const triggerAlert = () => {
      // Muncul (keluar membesar dari ikon)
      setShowAlert(true);
      setIconBounce(true);
      setTimeout(() => setIconBounce(false), 400);

      // Sembunyikan (masuk mengecil ke ikon) setelah 4 detik
      setTimeout(() => {
        setShowAlert(false);
        setIconBounce(true);
        setTimeout(() => setIconBounce(false), 400);
      }, 4000);
    };

    const initialTimer = setTimeout(triggerAlert, 1000);
    const interval = setInterval(triggerAlert, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // menu state listener
  useEffect(() => {
    const checkMenuState = () => {
      const isBodyLocked = document.body.style.overflow === "hidden";
      setIsMenuOpen(isBodyLocked);
    };

    const observer = new MutationObserver(checkMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    checkMenuState();

    return () => observer.disconnect();
  }, []);

  if (isMenuOpen) return null;

  return (
    <aside
      aria-label="Bantuan WhatsApp"
      className="fixed bottom-10 right-6 z-50 flex items-center gap-3 group select-none"
    >
      {/* icon pop animation */}
      <style jsx>{`
        @keyframes iconPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-icon-pop {
          animation: iconPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* bubble text with ios dynamic island scale & blur effect */}
      <div
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className={`bg-white text-[#0b221d] px-4 py-2.5 rounded-2xl shadow-xl font-bold text-[12px] md:text-sm tracking-wide border border-gray-100 origin-right transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          showAlert
            ? "opacity-100 scale-100 blur-0 translate-x-0 pointer-events-auto"
            : "opacity-0 scale-50 blur-lg translate-x-6 pointer-events-none"
        }`}
      >
        Ada yg bisa dibantu?
      </div>

      {/* whatsapp button */}
      <Link
        href="https://wa.me/6281298200895"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp 24 Jam"
        className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20"
      >
        {/* logo */}
        <div
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          className={`relative w-full h-full drop-shadow-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-110 ${
            iconBounce ? "animate-icon-pop" : ""
          }`}
        >
          <Image
            src="/assets/whatsapp.png"
            alt="Logo WhatsApp"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </aside>
  );
}
