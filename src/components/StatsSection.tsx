"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  FocusEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import type { PanInfo } from "framer-motion";

const STATS = [
  {
    num: 4500,
    label: "Keluarga yang terlayani dengan penuh empati",
    icon: "/assets/icons/kedatangan_jenazah.svg",
  },
  {
    num: 2250,
    label: "Pengiriman jenazah & abu dalam / luar negeri",
    icon: "/assets/icons/pengiriman_jenazah.svg",
  },
  {
    num: 2179,
    label: "Penanganan kedatangan & pemakaman tuntas",
    icon: "/assets/icons/pelayanan_pemakaman.svg",
  },
  {
    num: 4500,
    label: "Perjalanan ambulance & armada siaga",
    icon: "/assets/icons/ambulance.svg",
  },
];

const GALLERY = [
  { title: "Pengiriman Jenazah", img: "/assets/ambulance.jpeg" },
  { title: "Pengiriman Abu Jenazah", img: "/assets/abu.jpeg" },
  { title: "Kedatangan Jenazah", img: "/assets/kedatangan.jpeg" },
  { title: "Pelayanan Pemakaman", img: "/assets/pelayanan.jpeg" },
  { title: "Peti Jenazah", img: "/assets/cargo.jpg" },
  { title: "Mobil Jenazah & Ambulance", img: "/assets/card-workplace.webp" },
];

const TOTAL = GALLERY.length;
// Digandakan 3 kali agar perputaran terlihat tanpa putus
const SLIDES = [...GALLERY, ...GALLERY, ...GALLERY];

const GAP = 16; // harus sama dengan class gap-4
const FIRST_DELAY = 300; // jeda geseran pertama (ms)
const AUTOPLAY_DELAY = 3500; // jeda geseran berikutnya (ms)
const SPRING = { type: "spring", stiffness: 280, damping: 32 } as const;

const ARROW_CLASS =
  "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300/70 bg-white/60 text-[#b81424] shadow-md backdrop-blur-sm transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81424] md:h-12 md:w-12";

function AnimatedCounter({
  value,
  duration = 2,
}: {
  readonly value: number;
  readonly duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

function ChevronIcon({ direction }: { readonly direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-6 md:w-6"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function GalleryCarousel() {
  const [activeDot, setActiveDot] = useState(0);
  const [slideStep, setSlideStep] = useState(0); // lebar 1 kartu + gap
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const indexRef = useRef(TOTAL); // mulai dari salinan tengah
  const hasStartedRef = useRef(false);
  const firstSlideRef = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);

  const isPaused = isHovered || isFocused || isDragging;

  // Ukur lebar kartu saat pertama tampil dan setiap ukurannya berubah
  useEffect(() => {
    const slide = firstSlideRef.current;
    if (!slide) return;

    const observer = new ResizeObserver(() => {
      const nextStep = slide.getBoundingClientRect().width + GAP;
      x.jump(-indexRef.current * nextStep);
      setSlideStep(nextStep);
    });

    observer.observe(slide);
    return () => observer.disconnect();
  }, [x]);

  const goTo = useCallback(
    (target: number) => {
      if (!slideStep) return;

      let next = target;
      let shift = 0;
      if (next >= TOTAL * 2) shift = -TOTAL;
      else if (next < TOTAL) shift = TOTAL;

      // Pindah ke salinan tengah tanpa terlihat (fotonya identik)
      if (shift !== 0) {
        next += shift;
        x.jump(x.get() - shift * slideStep);
      }

      indexRef.current = next;
      setActiveDot(next % TOTAL);
      animate(x, -next * slideStep, SPRING);
    },
    [slideStep, x],
  );

  const nextSlide = () => goTo(indexRef.current + 1);
  const prevSlide = () => goTo(indexRef.current - 1);

  // Pilih arah terpendek menuju foto yang diklik
  const goToDot = (dot: number) => {
    let diff = dot - (indexRef.current % TOTAL);
    if (diff > TOTAL / 2) diff -= TOTAL;
    if (diff < -TOTAL / 2) diff += TOTAL;
    goTo(indexRef.current + diff);
  };

  // Autoplay: geseran pertama hampir langsung, berikutnya berjeda
  useEffect(() => {
    if (isPaused || !slideStep) return;

    const delay = hasStartedRef.current ? AUTOPLAY_DELAY : FIRST_DELAY;
    const timer = window.setTimeout(() => {
      hasStartedRef.current = true;
      goTo(indexRef.current + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeDot, isPaused, slideStep, goTo]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);
    if (!slideStep) return;

    // Prediksi posisi akhir berdasarkan kecepatan geseran
    const projectedX = x.get() + info.velocity.x * 0.2;
    const target = Math.round(-projectedX / slideStep);
    goTo(Math.max(0, Math.min(target, SLIDES.length - 3)));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevSlide();
    }
  };

  // Hanya mouse yang menjeda; sentuhan di HP tidak membuat autoplay macet
  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") setIsHovered(true);
  };

  // Hanya fokus dari keyboard yang menjeda autoplay
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(":focus-visible")) setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Galeri Foto Pelayanan"
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="pb-8"
    >
      <div className="relative px-6 md:px-8">
        <div
          tabIndex={0}
          className="w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#b81424]/40"
        >
          <motion.ul
            className="flex cursor-grab touch-pan-y gap-4 active:cursor-grabbing"
            drag="x"
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              left: -(SLIDES.length - 3) * slideStep,
              right: 0,
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            {SLIDES.map((slide, index) => (
              <li
                key={`${slide.img}-${index}`}
                ref={index === 0 ? firstSlideRef : undefined}
                aria-hidden={index < TOTAL || index >= TOTAL * 2}
                className="shrink-0 basis-full select-none border border-stone-300/50 bg-white p-4 pb-6 md:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
              >
                <figure className="relative h-80 w-full bg-white md:h-[300px]">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    loading="eager"
                    draggable={false}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="pointer-events-none object-cover"
                  />
                </figure>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Chevron berada tepat di garis tepi kontainer, di luar foto */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Foto sebelumnya"
          className={`${ARROW_CLASS} left-0 -translate-x-1/2`}
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Foto berikutnya"
          className={`${ARROW_CLASS} right-0 translate-x-1/2`}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      {/* Dot: satu untuk setiap foto */}
      <ul className="mt-5 flex items-center justify-center gap-1">
        {GALLERY.map((item, index) => {
          const isActive = index === activeDot;
          return (
            <li key={item.img}>
              <button
                type="button"
                onClick={() => goToDot(index)}
                aria-label={`Tampilkan foto ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-6 min-w-6 items-center justify-center focus-visible:outline-none"
              >
                <span
                  className={`block h-5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#b81424] group-focus-visible:ring-offset-2 ${
                    isActive
                      ? "w-5 bg-[#b81424]"
                      : "w-5 bg-stone-300 group-hover:bg-stone-400"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden bg-[#fcfbf9] pb-24 text-[#1a1a1a]"
    >
      {/* Banner atas */}
      <div className="relative overflow-hidden bg-[#193286] px-6 pb-80 pt-28 text-white md:px-16 md:pb-96 md:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/background.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#193286] via-[#193286]/85 to-[#193286]/40" />
        </div>

        <header className="relative z-10 mx-auto max-w-7xl text-center">
          <p className="mb-1 font-script text-3xl font-normal tracking-wide text-[#d4af37] drop-shadow-md md:text-5xl">
            Almeera Sejahtera Abadi
          </p>
          <h2
            id="stats-heading"
            className="text-3xl font-black tracking-tight text-white md:text-4xl"
          >
            Kami telah melayani
          </h2>
        </header>

        {/* Statistik */}
        <ul className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center">
              <div
                aria-hidden="true"
                className="relative mb-3 h-[60px] w-[60px] brightness-[73%] contrast-[26%] hue-rotate-[3deg] invert-[74%] saturate-[637%] sepia-[97%] filter"
              >
                <Image src={stat.icon} alt="" fill className="object-contain" />
              </div>
              <data
                value={stat.num}
                className="block text-4xl font-black tracking-tight text-white lg:text-5xl"
              >
                <AnimatedCounter value={stat.num} />
              </data>
              <span
                aria-hidden="true"
                className="my-4 block h-[2px] w-full max-w-[260px] bg-[#EBC54B]/70"
              />
              <p className="max-w-[220px] text-sm font-medium leading-relaxed text-gray-100">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Kartu dokumentasi */}
      <article
        aria-labelledby="gallery-heading"
        className="relative z-20 mx-auto -mt-48 max-w-7xl px-6 sm:px-12 md:-mt-64"
      >
        <div className="rounded-lg border border-stone-200/60 bg-[#f5f2eb]">
          <header className="mx-auto max-w-3xl space-y-3 px-6 pb-8 pt-10 text-center md:pb-10 md:pt-14">
            <h3
              id="gallery-heading"
              className="font-script text-3xl font-normal tracking-wide text-[#b81424] md:text-4xl"
            >
              Dokumentasi Kegiatan Kami
            </h3>
            <p className="text-sm font-medium text-stone-600 md:text-base">
              Berikut beberapa foto kegiatan kami
            </p>
            <p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-[#b81424] underline underline-offset-4 sm:text-sm"
              >
                Selengkapnya <span aria-hidden="true">→</span>
              </Link>
            </p>
          </header>

          <GalleryCarousel />
        </div>
      </article>
    </section>
  );
}
