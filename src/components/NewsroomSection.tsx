"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Komponen Bintang Interaktif & Animasi
function AnimatedStarRating({
  rating,
  animate,
}: {
  rating: number;
  animate: boolean;
}) {
  return (
    <div
      className="flex items-center gap-0.5 sm:gap-1 text-xs md:text-sm lg:text-xl"
      aria-label={`${rating} dari 5 bintang`}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        // Hitung persentase pengisian untuk tiap bintang (0% - 100%)
        const fillPercentage = Math.max(
          0,
          Math.min(100, (rating - (starIndex - 1)) * 100),
        );

        return (
          <div
            key={starIndex}
            className="relative inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0"
          >
            {/* Background Bintang (Abu-abu / Kosong) */}
            <svg
              className="w-full h-full text-gray-300 fill-current block"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>

            {/* Foreground Bintang (Kuning Emas) dengan Animasi Pengisian Smooth */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-1000 ease-out"
              style={{
                width: animate ? `${fillPercentage}%` : "0%",
                transitionDelay: `${(starIndex - 1) * 150 + 400}ms`,
              }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-amber-400 fill-current block"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animasi hanya berjalan sekali saat pertama kali di-scroll ke sini
        }
      },
      { threshold: 0.4 }, // Trigger ketika 40% bagian section terlihat di layar
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const testimonials = [
    {
      quote:
        "“Pelayanan Almeera sangat cepat dan sigap. Timnya ramah, sopan, dan benar-benar peduli dengan kondisi pasien. Ambulans datang tepat waktu dan perjalanan terasa aman serta nyaman. Sangat membantu di saat kondisi darurat.”",
      name: "Client",
      rating: 5,
    },
    {
      quote:
        "“Saya menggunakan layanan ambulance jenazah dari Almeera dan sangat puas. Prosesnya tertata rapi, petugasnya profesional, dan penuh empati. Di saat keluarga kami berduka, mereka sangat membantu dan menenangkan.”",
      name: "Client",
      rating: 4.5,
    },
    {
      quote:
        "“Ambulance VIP yang digunakan sangat bersih dan lengkap. Tenaga medisnya berpengalaman dan komunikatif, sehingga keluarga merasa tenang selama perjalanan. Pelayanan 24 jamnya benar-benar bisa diandalkan.”",
      name: "Client",
      rating: 4.8,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f9f9f9] font-sans pt-12 pb-0 overflow-hidden"
    >
      {/* Testimonials Title */}
      <h2
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className={`text-3xl md:text-4xl font-extrabold text-center text-[#1a1a1a] mb-16 mt-10 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Apa Kata Mereka?
      </h2>

      {/* Testimonial Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {testimonials.map((item, idx) => (
          <article
            key={idx}
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              transitionDelay: `${idx * 200}ms`,
            }}
            className={`bg-white rounded-md p-6 pb-6 shadow-md border border-gray-100 flex flex-col justify-between relative min-h-[220px] transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } ${
              idx === 2
                ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto lg:col-span-1 lg:w-auto"
                : ""
            }`}
          >
            {/* Isi Quote */}
            <p className="text-xs md:text-sm text-black leading-relaxed font-normal mb-8">
              {item.quote}
            </p>

            {/* Footer Kartu */}
            <footer className="flex items-center justify-between pt-2 pl-14">
              <span className="font-bold text-sm text-gray-900">
                {item.name}
              </span>
              <AnimatedStarRating rating={item.rating} animate={isVisible} />
            </footer>

            {/* Avatar */}
            <div className="absolute -bottom-6 left-5" aria-hidden="true">
              <div className="w-14 h-14 rounded-full bg-[#b81424] flex items-center justify-center text-white shrink-0 shadow-md">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Banner Section */}
      <div
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className={`w-full grid grid-cols-1 md:grid-cols-2 transition-all duration-1000 delay-500 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* button We Accept */}
        <section className="relative overflow-hidden min-h-[110px] flex items-center justify-between px-6 sm:px-12 py-4 bg-[#b81424]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/card-workplace.webp"
              alt="Workplace Background"
              fill
              className="object-cover mix-blend-multiply opacity-50"
            />
            <div className="absolute inset-0 bg-[#b81424]/80" />
          </div>

          <div className="relative z-10 flex items-center justify-between w-full max-w-xl mx-auto gap-4">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight whitespace-nowrap">
              We Accept
            </h3>
            <a
              href="tel:081298200895"
              className="bg-white text-[#b81424] font-bold text-xs md:text-sm py-3 px-8 rounded-full uppercase tracking-wider hover:bg-gray-100 transition text-center cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* button Send Us an Email */}
        <section className="bg-[#ededed] min-h-[110px] flex items-center justify-between px-6 sm:px-12 py-4 relative z-10">
          <div className="flex items-center justify-between w-full max-w-xl mx-auto gap-4">
            <h3 className="text-gray-900 text-lg md:text-xl font-bold tracking-tight">
              Send Us an Email
            </h3>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=almeeraambulance@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1d20] text-white font-bold text-xs md:text-sm py-3 px-12 rounded-full uppercase tracking-wider hover:bg-black transition text-center cursor-pointer inline-block"
            >
              E-MAIL
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
