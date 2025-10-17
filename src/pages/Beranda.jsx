// src/pages/Beranda.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Beranda() {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  const headerHeight = "88px"; 

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-between items-center py-5 px-6 sm:px-12 lg:px-24 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <h1 className="text-2xl font-bold text-blue-700">PMB UNISMUH</h1>
        <nav className="space-x-10 hidden md:flex">
          {["PROGRAM PMB", "News UNISMUH", "Contact", "Informasi"].map(
            (text) => (
              <a
                key={text}
                href="#"
                className="relative text-base font-medium text-gray-600 transition-colors hover:text-blue-600 group"
              >
                {text}
                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 -mb-1"></span>
              </a>
            )
          )}
        </nav>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
          Daftar Sekarang
        </Button>
      </motion.header>

      <main>
        <section
          className="grid grid-cols-1 lg:grid-cols-11 items-center gap-8 w-full"
          style={{ minHeight: `calc(100vh - ${headerHeight})` }}
        >
          <motion.div
            className="flex flex-col items-start lg:col-span-5 px-6 sm:px-12 lg:px-0 lg:pl-24 py-12 lg:py-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block px-4 py-2 mb-4 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
            >
              #1 Smart Campus for the Next Generation
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-5"
            >
              PMB Penerimaan <br /> Mahasiswa Baru <br /> TA 2025/2026
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mb-8 text-gray-700 leading-relaxed max-w-lg"
            >
              Kami dengan bangga mengumumkan bahwa{" "}
              <span className="text-blue-600 font-bold">UNISMUH</span> Makassar
              telah meraih prestasi luar biasa dengan mendapatkan Akreditasi{" "}
              <span className="text-blue-600 font-bold">UNGGUL</span> dari
              BAN-PT.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 text-base rounded-lg mb-12 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                Download Tata Cara Pendaftaran
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full max-w-md">
              <img
                src="/partner-logos.png"
                alt="Logo Partner dan Akreditasi Unismuh"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 h-full w-full flex items-center justify-center order-first lg:order-last"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/hero-illustration-complete.png"
              alt="Ilustrasi Penerimaan Mahasiswa Baru Unismuh"
              className="w-full h-auto max-w-3xl object-contain"
            />
          </motion.div>
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <span className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-blue-500/50"></span>
          <motion.button
            onClick={goToChatbot}
            className="flex items-center gap-4 bg-white p-4 rounded-full shadow-2xl focus:outline-none border-2 border-blue-100"
            aria-label="Buka chatbot TARI"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
          >
            <div className="text-right">
              <p className="font-extrabold text-base text-slate-900">TARI</p>
              <p className="text-sm text-slate-500 leading-tight">
                Teman Akrab
                <br />
                Mahasiswa Baru
              </p>
            </div>
            <div>
              <img
                src="/chatbot-icon.gif"
                alt="Ikon chatbot animasi"
                className="w-16 h-16"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
