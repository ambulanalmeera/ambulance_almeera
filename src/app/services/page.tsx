"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import FormModal from "../../components/FormModal";
import ServicesSkeleton from "../../components/skeletton/servicesskeletton";

interface ServiceItem {
  readonly title: string;
  readonly desc: string;
  readonly img: string;
  readonly icon: string;
}

interface ServiceCardProps {
  readonly card: ServiceItem;
  readonly onOpenModal: (title: string) => void;
}

function ServiceCard({ card, onOpenModal }: ServiceCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  // skeleton timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="relative bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col justify-between">
      {/* skeleton */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-500 ${
          isLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ServicesSkeleton className="w-full h-full" />
      </div>

      {/* content */}
      <div
        className={`flex flex-col justify-between w-full h-full transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* top section */}
        <div className="bg-[#193286] text-white p-3.5 sm:p-5 md:p-8 flex flex-col justify-between h-[240px] sm:h-[290px] md:h-[360px]">
          <div>
            <div className="flex justify-between items-start gap-2 mb-2 md:mb-4 h-[42px] sm:h-[54px] md:h-[72px]">
              <h3 className="text-[13px] sm:text-base md:text-xl font-bold leading-snug md:leading-tight line-clamp-3 md:line-clamp-none md:max-w-[200px]">
                {card.title}
              </h3>
              <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-15 md:h-15 relative flex-shrink-0 mt-0.5 filter brightness-0 invert">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-full h-[2px] md:h-[3px] bg-[#2e50c0] my-2 md:my-3" />

            <p className="text-[11px] sm:text-xs md:text-sm text-gray-100 leading-normal md:leading-relaxed line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
              {card.desc}
            </p>
          </div>

          {/* button */}
          <div className="mt-3 sm:mt-5 md:mt-8">
            <button
              onClick={() => onOpenModal(card.title)}
              draggable={false}
              className="bg-[#b81424] hover:bg-[#9c0e1b] transition-colors py-2 px-3 sm:py-2.5 sm:px-5 md:py-3 md:px-6 rounded-full text-center text-white text-[11px] sm:text-xs md:text-sm font-semibold inline-flex items-center justify-center w-full cursor-pointer shadow"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>

        {/* image */}
        <div className="relative h-28 sm:h-40 md:h-62 w-full bg-gray-100 overflow-hidden pointer-events-none">
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const cards: readonly ServiceItem[] = [
    {
      title: "Pelayanan Jemput Antar Pasien",
      desc: "Layanan transportasi medis untuk menjemput dan mengantar pasien dari rumah ke rumah sakit, klinik, puskesmas, atau fasilitas kesehatan lainnya dengan aman, nyaman, dan tepat waktu.",
      img: "/assets/card/antar_jemput.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Pelayanan Pasien Kontrol",
      desc: "Melayani kebutuhan transportasi pasien yang harus menjalani pemeriksaan atau kontrol rutin ke rumah sakit maupun klinik. Didukung armada yang nyaman untuk memastikan perjalanan pasien tetap aman.",
      img: "/assets/card/pasien_control.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Jenazah Dalam & Luar Kota",
      desc: "Menyediakan layanan transportasi jenazah untuk tujuan dalam maupun luar kota dengan penanganan yang profesional, hormat, dan sesuai prosedur yang berlaku.",
      img: "/assets/card/mobil_jenazah.jpeg",
      icon: "/assets/icons/kedatangan_jenazah.svg",
    },
    {
      title: "Pelayanan Pasien Ventilator",
      desc: "Layanan ambulance khusus yang dilengkapi peralatan medis pendukung untuk pasien yang membutuhkan ventilator selama proses pemindahan atau rujukan antar fasilitas kesehatan.",
      img: "/assets/card/ventilator.jpeg",
      icon: "/assets/icons/ventilator.svg",
    },
    {
      title: "Pelayanan Ambulance Evakuasi",
      desc: "Layanan evakuasi pasien dalam kondisi darurat maupun non-darurat dari lokasi kejadian, rumah, kantor, atau fasilitas kesehatan menuju tempat perawatan yang dituju.",
      img: "/assets/card/evakuasi.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Standar",
      desc: "Pilihan ambulance dengan fasilitas standar yang ideal untuk kebutuhan transportasi pasien umum, kontrol kesehatan, rujukan medis, maupun kebutuhan non-darurat lainnya.",
      img: "/assets/card/ambulance_standar.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance VIP",
      desc: "Layanan ambulance premium dengan fasilitas yang lebih lengkap dan nyaman untuk memberikan pengalaman perjalanan medis yang aman, eksklusif, dan berkualitas.",
      img: "/assets/card/ambulance_vip.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Standby Event",
      desc: "Menyediakan unit ambulance dan tenaga medis yang siap siaga untuk berbagai kegiatan seperti seminar, konser, olahraga, acara perusahaan, kegiatan sosial, dan event lainnya.",
      img: "/assets/card/evakuasi.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Pelayanan Kedukaan, Kremasi, & Formalin",
      desc: "Memberikan layanan kedukaan secara menyeluruh mulai dari penanganan jenazah, proses formalin, hingga layanan kremasi dengan pendampingan yang profesional dan penuh empati.",
      img: "/assets/card/kremasi.jpeg",
      icon: "/assets/icons/kremasi.svg",
    },
  ];

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 text-neutral-900">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Layanan Kami" }]} />

      {/* header */}
      <header className="mb-8 md:mb-14 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          className="text-2xl sm:text-3xl md:text-[40px] font-black text-[#193286] mb-3 md:mb-4 tracking-tight will-change-transform"
        >
          Layanan Kami
        </motion.h1>
      </header>

      {/* grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
        {cards.map((card, idx) => (
          <ServiceCard key={idx} card={card} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {/* modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </main>
  );
}
