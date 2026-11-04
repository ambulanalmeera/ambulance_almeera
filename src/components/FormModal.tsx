"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Phone, FileText, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedService: string;
}

export default function FormModal({
  isOpen,
  onClose,
  selectedService,
}: FormModalProps) {
  // state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [notes, setNotes] = useState("");

  // scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || typeof window === "undefined") return null;

  // submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waNumber = "6281289264252";
    const message = `Halo, saya ingin memesan layanan kedukaan.%0A%0A*Layanan:* ${selectedService}%0A*Nama:* ${name}%0A*Nomor Telepon / WhatsApp:* ${phone}%0A*Rencana Tanggal:* ${date || "Segera"}%0A*Alamat Penjemputan:* ${pickupAddress || "-"}%0A*Alamat Tujuan:* ${destinationAddress || "-"}%0A*Catatan:* ${notes || "-"}%0A%0AMohon konfirmasinya, terima kasih.`;

    const waUrl = `https://wa.me/${waNumber}?text=${message}`;
    window.open(waUrl, "_blank");
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[99999] overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          className="relative w-full max-w-2xl bg-[#f5f2eb] shadow-2xl overflow-hidden rounded-sm border border-neutral-300 max-h-[90vh] flex flex-col my-auto"
        >
          {/* header */}
          <header className="bg-[#f5f2eb] text-neutral-900 px-8 py-4 flex items-center justify-between flex-shrink-0 border-b border-neutral-300 rounded-sm">
            <h2
              id="modal-title"
              className="text-xl md:text-2xl font-bold text-neutral-900 pr-4 truncate"
            >
              {selectedService || "Layanan Kedukaan"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-neutral-900 cursor-pointer rounded-sm transition-transform duration-300 hover:rotate-90 flex-shrink-0"
              aria-label="Tutup modal"
            >
              <X className="w-9 h-9 stroke-[2.5]" />
            </button>
          </header>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-5 overflow-y-auto bg-[#f5f2eb] text-neutral-900 rounded-sm"
          >
            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-neutral-700" /> Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm"
              />
            </div>

            {/* phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-neutral-700" /> Nomor WhatsApp /
                Telepon
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan nomer Whatsapp"
                className="w-full px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm"
              />
            </div>

            {/* date */}
            <div>
              <label
                htmlFor="date"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-neutral-700" /> Tanggal
                Pemesanan
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-w-0 box-border appearance-none px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm"
              />
            </div>

            {/* pickup address */}
            <div>
              <label
                htmlFor="pickupAddress"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-neutral-700" /> Alamat
                Penjemputan
              </label>
              <textarea
                id="pickupAddress"
                rows={2}
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap lokasi penjemputan"
                className="w-full px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm resize-none"
              />
            </div>

            {/* destination address (optional) */}
            <div>
              <label
                htmlFor="destinationAddress"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-neutral-700" /> Alamat Tujuan
                (Opsional)
              </label>
              <textarea
                id="destinationAddress"
                rows={2}
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap lokasi tujuan (opsional)"
                className="w-full px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm resize-none"
              />
            </div>

            {/* notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-semibold text-neutral-800 mb-1.5 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-neutral-700" /> Catatan
                Tambahan
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis keterangan detail lainnya jika ada"
                className="w-full px-4 py-3 bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 text-neutral-900 text-sm rounded-sm resize-none"
              />
            </div>

            {/* buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 px-4 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-sm transition-colors text-center cursor-pointer rounded-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 px-6 bg-[#b81424] hover:bg-[#aa0c1c] text-white font-semibold text-sm transition-colors flex items-center justify-center shadow-none rounded-sm cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}
