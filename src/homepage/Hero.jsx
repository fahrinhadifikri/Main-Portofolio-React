import React, { useState, useEffect, useRef } from 'react'; // <--- PERBAIKAN: Import Hooks ditambahkan
import { motion } from 'framer-motion';
import { MapPin, Layers, ArrowDown } from 'lucide-react';

// --- KOMPONEN SHUFFLE TEXT (Decrypted Effect) ---
const DecryptedText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  
  // Karakter pengacak
  const chars = "FAHRINHADIFIKRI";

  const scramble = () => {
    let pos = 0;
    
    // Clear interval sebelumnya biar gak numpuk
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("").map((char, index) => {
        // Jika posisi index sudah dilewati 'pos', tampilkan huruf asli
        if (index < pos) {
          return text[index];
        }
        // Sisanya tampilkan karakter acak
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");

      setDisplayText(scrambled);
      
      // Kecepatan reveal
      pos += 1 / 3; 

      if (pos >= text.length) {
        clearInterval(intervalRef.current);
      }
    }, 30); // Kecepatan frame (30ms)
  };

  // Jalan otomatis saat pertama kali load
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
      onMouseEnter={scramble} // Efek jalan lagi pas di-hover
      className={className}
    >
      {displayText}
    </span>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  return (
    // UBAH 1: Background Global (Putih vs Hitam) & Transition
    <section id="home" className="relative h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* 1. BACKGROUND ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>

      {/* 2. MAIN CONTENT */}
      <div className="z-10 text-center flex flex-col items-center">
        
        {/* BIG NAME dengan SHUFFLE EFFECT */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
           <DecryptedText 
              text="FRINCIPLE"
              className="text-[20vw] md:text-[14rem] font-black leading-none tracking-tighter text-slate-900 dark:text-slate-100 cursor-default block"
           />
        </motion.div>

        {/* TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 md:mt-2 space-y-2"
        >
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-500 uppercase">
            Unexperienced Fullstack Developer
          </p>
          {/* UBAH 3: Warna Text Deskripsi */}
          <p className="text-2xl md:text-4xl font-serif italic text-slate-600 dark:text-slate-300">
            I don't have <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent not-italic font-sans font-bold">5 years experiences</span> for matter.
          </p>
        </motion.div>

      </div>

      {/* 3. INFO POJOK BAWAH (Floating Elements) */}
      
      {/* Kiri Bawah: Lokasi */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-8 md:left-16 hidden md:flex items-center gap-4 text-left"
      >
        {/* UBAH 4: Kotak Icon */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-full border border-slate-200 dark:border-slate-800 text-green-500 shadow-sm dark:shadow-none">
           <MapPin size={20} />
        </div>
        <div>
           <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">Based in</p>
           <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Banjarmasin, ID</p>
        </div>
      </motion.div>

      {/* Kanan Bawah: Role/Status */}
      <motion.div 
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1, duration: 0.8 }}
         className="absolute bottom-10 right-8 md:right-16 hidden md:flex items-center gap-4 text-right"
      >
        <div>
           <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">Specialized in</p>
           <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Unknown</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-full border border-slate-200 dark:border-slate-800 text-cyan-500 shadow-sm dark:shadow-none">
           <Layers size={20} />
        </div>
      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600"
      >
        <ArrowDown size={24} />
      </motion.div>

    </section>
  );
};

export default Hero;