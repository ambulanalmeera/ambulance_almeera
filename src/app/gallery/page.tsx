"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import GallerySkeleton from "../../components/skeletton/galleryskeletton";

const GALLERY_ITEMS = [
  {
    title: "Pelayanan Jemput Antar Pasien",
    img: "/assets/card/antar_jemput.jpeg",
  },
  {
    title: "Pelayanan Pasien Kontrol",
    img: "/assets/card/pasien_control.jpeg",
  },
  {
    title: "Sewa Ambulance Jenazah Dalam & Luar Kota",
    img: "/assets/card/mobil_jenazah.jpeg",
  },
  {
    title: "Pelayanan Pasien Ventilator",
    img: "/assets/card/ventilator.jpeg",
  },
  {
    title: "Pelayanan Ambulance Evakuasi",
    img: "/assets/card/evakuasi.jpeg",
  },
  {
    title: "Sewa Ambulance Standar",
    img: "/assets/card/ambulance_standar.jpeg",
  },
  {
    title: "Sewa Ambulance VIP",
    img: "/assets/card/ambulance_vip.jpeg",
  },
  {
    title: "Sewa Ambulance Standby Event",
    img: "/assets/card/evakuasi.jpeg",
  },
  {
    title: "Pelayanan Kedukaan, Kremasi, & Formalin",
    img: "/assets/card/kremasi.jpeg",
  },
];

type GalleryItem = (typeof GALLERY_ITEMS)[number];

const NAV_BUTTON_CLASS =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  readonly item: GalleryItem;
  readonly index: number;
  readonly onOpen: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
    >
      <figure>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Perbesar foto ${item.title}`}
          className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193286] focus-visible:ring-offset-2"
        >
          {!isLoaded && (
            <GallerySkeleton className="absolute inset-0 z-10 h-full w-full" />
          )}
          <Image
            src={item.img}
            alt={item.title}
            fill
            priority={index < 3}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
            className={`object-cover  ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#000000]/0"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#193286] opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
        <figcaption className="mt-3 text-sm font-semibold leading-snug text-gray-900 md:text-base">
          {item.title}
        </figcaption>
      </figure>
    </motion.li>
  );
}

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  readonly index: number;
  readonly onChange: (index: number) => void;
  readonly onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = GALLERY_ITEMS[index];
  const total = GALLERY_ITEMS.length;

  const showPrev = () => onChange((index - 1 + total) % total);
  const showNext = () => onChange((index + 1) % total);
  const close = () => dialogRef.current?.close();

  // buka sebagai modal dan kunci scroll halaman
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") showPrev();
    if (event.key === "ArrowRight") showNext();
  };

  // klik area kosong di samping foto untuk menutup
  const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      aria-label="Pratinjau foto"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-0 text-white backdrop:bg-transparent"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between px-4 py-4 sm:px-6">
          <p aria-live="polite" className="text-sm font-medium text-white/70">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div
          onClick={handleBackdropClick}
          className="relative flex min-h-0 flex-1 justify-center px-4 sm:px-20"
        >
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_event, { offset, velocity }) => {
              if (offset.x > 50 || velocity.x > 500) showPrev();
              else if (offset.x < -50 || velocity.x < -500) showNext();
            }}
            className="relative h-full w-full max-w-5xl cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              priority
              draggable={false}
              sizes="(max-width: 1023px) 100vw, 1024px"
              className="pointer-events-none object-contain"
            />
          </motion.div>

          <button
            type="button"
            onClick={showPrev}
            aria-label="Foto sebelumnya"
            className={`${NAV_BUTTON_CLASS} left-3 sm:left-6`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Foto berikutnya"
            className={`${NAV_BUTTON_CLASS} right-3 sm:right-6`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <footer className="px-6 py-5 text-center">
          <p className="text-sm font-semibold md:text-base">{item.title}</p>
        </footer>
      </div>
    </dialog>
  );
}

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 text-black md:px-12">
      <Breadcrumb items={[{ label: "Dokumentasi" }]} />

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 border-b border-gray-200 pb-8"
      >
        <h1 className="text-3xl font-black tracking-tight text-[#000000] md:text-[40px]">
          Galeri Dokumentasi
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
          Dokumentasi kegiatan dan layanan kami.
        </p>
      </motion.header>

      <section aria-label="Daftar foto dokumentasi">
        <ul className="grid grid-cols-2 gap-x-2 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryCard
              key={item.title}
              item={item}
              index={index}
              onOpen={() => setSelectedIndex(index)}
            />
          ))}
        </ul>
      </section>

      {selectedIndex !== null && (
        <Lightbox
          index={selectedIndex}
          onChange={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </main>
  );
}
