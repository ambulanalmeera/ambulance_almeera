"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import FormModal from "../components/FormModal";
import ServicingSectionSkeleton from "../components/skeletton/servicingsectionskeletton";

interface ServiceItem {
  readonly title: string;
  readonly desc: string;
  readonly img: string;
  readonly icon: string;
}

interface ServiceCardItemProps {
  readonly card: ServiceItem;
  readonly onOpenModal: (title: string) => void;
  readonly priority?: boolean;
}

function ServiceCardItem({
  card,
  onOpenModal,
  priority = false,
}: ServiceCardItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // skeleton timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      className="card-item w-[calc(100vw-3rem)] sm:w-[340px] md:w-[360px] flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col justify-between relative"
    >
      {/* skeleton */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-500 ${
          isLoaded
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <ServicingSectionSkeleton className="w-full h-full" />
      </div>

      {/* content */}
      <div
        className={`flex flex-col justify-between w-full h-full transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* top content */}
        <div className="bg-[#193286] text-white p-6 md:p-8 flex flex-col justify-between h-[350px]">
          <div>
            <div className="flex justify-between items-start mb-4 h-[64px] md:h-[72px]">
              <h3 className="text-xl md:text-xl font-bold max-w-[200px] leading-tight">
                {card.title}
              </h3>
              <div className="w-15 h-15 relative flex-shrink-0 mt-0.5 filter brightness-0 invert">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-full h-[3px] bg-[#2e50c0] my-3" />

            <p className="text-sm text-gray-100 leading-relaxed">{card.desc}</p>
          </div>

          {/* button */}
          <div className="mt-8">
            <button
              onClick={() => onOpenModal(card.title)}
              draggable={false}
              className="bg-[#b81424] hover:bg-[#9c0e1b] transition-colors py-3 px-6 rounded-full text-center text-white text-sm font-semibold inline-flex items-center justify-center w-full cursor-pointer shadow"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>

        {/* image */}
        <div className="relative h-52 md:h-62 w-full bg-gray-100 overflow-hidden pointer-events-none">
          <Image
            src={card.img}
            alt={card.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) calc(100vw - 3rem), 360px"
            onLoad={() => setIsLoaded(true)}
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export default function ServicingSection() {
  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // state
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [snapPositions, setSnapPositions] = useState<number[]>([]);
  const [currentDot, setCurrentDot] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const x = useMotionValue(0);

  // cards data
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
    {
      title: "Penyediaan Peti Muslim & Non-Muslim",
      desc: "Menyediakan berbagai pilihan peti jenazah Muslim dan non-Muslim dengan kualitas terbaik untuk memenuhi kebutuhan keluarga sesuai tradisi, agama, dan anggaran yang tersedia.",
      img: "/assets/card/peti_jenazah.jpeg",
      icon: "/assets/icons/peti_jenazah.svg",
    },
  ];

  const totalDots = cards.length;

  // effect for precise DOM-based layout and snap calculations
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const cardElements = Array.from(
          trackRef.current.children,
        ) as HTMLElement[];

        if (cardElements.length > 0) {
          const positions = cardElements.map((card) => -card.offsetLeft);
          setSnapPositions(positions);

          const totalWidth = trackRef.current.scrollWidth;
          const scrollLimit = totalWidth - containerWidth;
          setDragConstraints({
            left: scrollLimit > 0 ? -scrollLimit : 0,
            right: 0,
          });
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [cards.length]);

  // handlers
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (snapPositions.length === 0) return;

    const currentX = x.get();
    const velocity = info.velocity.x;

    let closestIndex = 0;
    let minDistance = Infinity;

    snapPositions.forEach((pos, idx) => {
      const distance = Math.abs(currentX - pos);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (velocity < -300 && closestIndex < snapPositions.length - 1) {
      closestIndex += 1;
    } else if (velocity > 300 && closestIndex > 0) {
      closestIndex -= 1;
    }

    setCurrentDot(closestIndex);
    animate(x, snapPositions[closestIndex], {
      type: "spring",
      stiffness: 400,
      damping: 35,
    });
  };

  const goToDot = (index: number) => {
    if (
      snapPositions.length === 0 ||
      index < 0 ||
      index >= snapPositions.length
    )
      return;
    setCurrentDot(index);
    animate(x, snapPositions[index], {
      type: "spring",
      stiffness: 400,
      damping: 35,
    });
  };

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <section
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      aria-label="Paket Layanan Transportasi"
    >
      {/* header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className="text-3xl md:text-4xl font-black text-[#193286] text-center mb-14"
      >
        Paket layanan transportasi
      </motion.h2>

      {/* carousel */}
      <motion.div
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className="overflow-hidden py-4 will-change-transform"
        ref={containerRef}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragTransition={{ power: 0.1, timeConstant: 100 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="flex gap-4 md:gap-8 cursor-grab active:cursor-grabbing select-none will-change-transform"
        >
          {cards.map((card, idx) => (
            <ServiceCardItem
              key={idx}
              card={card}
              onOpenModal={handleOpenModal}
              priority={idx === 0}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ transform: "translateZ(0)" }}
        className="flex justify-center items-center gap-2 mt-10"
        role="tablist"
        aria-label="Carousel pagination dots"
      >
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToDot(idx)}
            style={{ transform: "translateZ(0)" }}
            className={`h-5 w-5 rounded-full transition-all duration-300 cursor-pointer ${
              currentDot === idx
                ? "bg-[#b81424] scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            role="tab"
            aria-selected={currentDot === idx}
            aria-label={`Go to slide group ${idx + 1}`}
          />
        ))}
      </motion.div>

      {/* modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </section>
  );
}
