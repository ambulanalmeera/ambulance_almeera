"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Location() {
  const [loadMap, setLoadMap] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Berikan jeda sebentar agar animasi Framer Motion selesai dengan sangat mulus tanpa lag
          const timer = setTimeout(() => {
            setLoadMap(true);
          }, 400);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden"
    >
      {/* Kolom Kiri: Teks (Geser dari Kiri ke Kanan) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className="space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-black text-[#0b221d]">
          Alamat Almeera Sejahtera Abadi
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          Jl. Raden Fatah, Peninggilan Utara, Gang Haji Sibun, RT 001/RW 001 No.
          14, Kota Tangerang, Banten.
        </p>
        <div>
          <a
            href="https://maps.app.goo.gl/2MKHjKismR2BaZyK7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-[#b81424] underline underline-offset-4 inline-flex items-center gap-1"
          >
            Google Maps →
          </a>
        </div>
      </motion.div>

      {/* Kolom Kanan: Maps (Geser dari Kanan ke Kiri dengan Jelas & Mulus) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className="relative w-full h-[300px] md:h-[350px] bg-gray-100 overflow-hidden rounded-lg shadow-sm"
      >
        {loadMap && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4880.2515971449475!2d106.70030537586833!3d-6.2409528611142315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fa15cba0bcbd%3A0x9e8947ad9d763e24!2sJl.%20Raden%20Patah%2C%20RT.001%2FRW.001%2C%20Paninggilan%20Utara%2C%20Kec.%20Ciledug%2C%20Kota%20Tangerang%2C%20Banten!5e1!3m2!1sid!2sid!4v1793550321693!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full object-cover"
            title="Peta Lokasi Almeera Sejahtera Abadi"
          ></iframe>
        )}
      </motion.div>
    </section>
  );
}
