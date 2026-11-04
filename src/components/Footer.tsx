"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import FormModal from "../components/FormModal"; // Sesuaikan jalur import jika berbeda

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <footer className="bg-[#193286] text-white pt-14 pb-8 px-4 sm:px-6 lg:px-8 font-sans border-t-4 border-[#b81424]">
      <div className="max-w-7xl mx-auto px-0 md:px-12">
        {/* bagian atas */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-[#2442a8] gap-6">
          {/* logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="Almeera Logo"
              width={200}
              height={60}
              className="object-contain filter brightness-0 invert"
              priority
            />
          </div>

          {/* sosmed */}
          <div className="flex items-center gap-3">
            <a
              href="#instagram"
              aria-label="Instagram"
              className="w-10 h-10 bg-white text-[#193286] hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#962fbf] hover:text-white rounded-full flex items-center justify-center transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#facebook"
              aria-label="Facebook"
              className="w-10 h-10 bg-white text-[#193286] hover:bg-[#0030cf] hover:text-white rounded-full flex items-center justify-center transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#tiktok"
              aria-label="TikTok"
              className="w-10 h-10 bg-white text-[#193286] hover:bg-black hover:text-white rounded-full flex items-center justify-center transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.5.18-1.92 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.05-3.57.07-5.36.01-4.03-.01-8.05.02-12.08z" />
              </svg>
            </a>
            <a
              href="#youtube"
              aria-label="YouTube"
              className="w-10 h-10 bg-white text-[#193286] hover:bg-[#b81424] hover:text-white rounded-full flex items-center justify-center transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* bagian tengah grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-[#2442a8]">
          {/* kontak */}
          <div className="space-y-5">
            <h4 className="text-sm uppercase tracking-wider text-white font-bold">
              Layanan Ambulance Almeera
            </h4>
            <div className="space-y-3 text-sm text-gray-100">
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a
                  href="tel:02155781234"
                  className="font-bold text-white underline hover:text-gray-300"
                >
                  0812-9820-0895
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Jl. Raden Fatah, Peninggilan Utara, Gang Haji Sibun, RT 001/RW
                  001 No. 14, Kota Tangerang, Banten.
                </span>
              </p>
            </div>
          </div>

          {/* menu 1 */}
          <nav aria-label="Layanan Almeera">
            <ul className="space-y-4 text-base font-semibold text-white">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Pelayanan Jemput Antar Pasien")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Pelayanan Jemput Antar Pasien
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenModal("Pelayanan Pasien Kontrol")}
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Pelayanan Pasien Kontrol
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Sewa Ambulance Jenazah Dalam & Luar Kota")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Ambulance Jenazah Dalam & Luar Kota
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenModal("Pelayanan Pasien Ventilator")}
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Pelayanan Pasien Ventilator
                </button>
              </li>
            </ul>
          </nav>

          {/* menu 2 */}
          <nav aria-label="Informasi">
            <ul className="space-y-4 text-base font-semibold text-white">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Pelayanan Ambulance Evakuasi")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Pelayanan Ambulance Evakuasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenModal("Sewa Ambulance Standar")}
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Sewa Ambulance Standar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenModal("Sewa Ambulance VIP")}
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Sewa Ambulance VIP
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Sewa Ambulance Standby Event")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Sewa Ambulance Standby Event
                </button>
              </li>
            </ul>
          </nav>

          {/* menu 3 */}
          <nav aria-label="Bantuan">
            <ul className="space-y-4 text-base font-semibold text-white">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Pelayanan Kedukaan, Kremasi, & Formalin")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Pelayanan Kedukaan, Kremasi & Formalin
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal("Penyediaan Peti Muslim & Non-Muslim")
                  }
                  className="hover:text-gray-300 transition text-left cursor-pointer w-full bg-transparent border-none p-0 font-semibold text-base text-white"
                >
                  Penyediaan Peti Muslim & Non Muslim
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* bagian bawah */}
        <div className="pt-8 space-y-5 text-sm text-gray-200">
          {/* kebijakan */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-white text-sm">
            <Link href="#" className="hover:underline">
              Kebijakan Privasi
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Syarat & Ketentuan
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Kebijakan Layanan
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Informasi Pengiriman
            </Link>
          </div>

          {/* deskripsi */}
          <div className="space-y-3 leading-relaxed text-gray-200 text-xs sm:text-sm">
            <p>
              Ambulans Almeera (Tangerang) menyediakan layanan darurat medis,
              penyediaan mobil jenazah, serta pengurusan kargo jenazah domestik
              maupun internasional dengan standar profesional dan penuh empati.
            </p>
            <p>
              Kami berdedikasi untuk memberikan pelayanan yang cepat, aman, dan
              terpercaya bagi seluruh keluarga yang membutuhkan bantuan dalam
              situasi darurat maupun kedukaan.
            </p>
          </div>

          {/* hak cipta */}
          <p className="pt-4 text-center text-gray-300 text-xs sm:text-sm">
            &copy; 2026 Ambulans Almeera. Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </div>

      {/* Modal Form */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </footer>
  );
}
