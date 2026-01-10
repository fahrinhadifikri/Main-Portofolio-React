import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false); // State untuk Pop-up Judul
  const audioRef = useRef(null);
  const timeoutRef = useRef(null); // Ref untuk timer agar bisa di-reset

  // --- 1. HANDLING AUTOPLAY & TIMER ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; 
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            triggerPopup(); // Munculkan judul jika autoplay berhasil
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // --- 2. FUNGSI MEMUNCULKAN POP-UP SEMENTARA ---
  const triggerPopup = () => {
    setShowTitle(true);
    // Reset timer jika user klik cepat
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Hilangkan judul setelah 4 detik
    timeoutRef.current = setTimeout(() => {
      setShowTitle(false);
    }, 4000);
  };

  // --- 3. TOGGLE MUSIC ---
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowTitle(false); // Langsung tutup jika pause
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      triggerPopup(); // Munculkan judul saat play
    }
  };

  return (
    // Container Utama: Flex Row agar elemen memanjang ke kiri
    <div className="fixed top-1/2 -translate-y-1/2 right-6 z-[9999] flex items-center justify-end gap-3">
      
      <audio ref={audioRef} loop>
        <source src="/bg-music.mp3" type="audio/mpeg" />
      </audio>

      {/* --- POP-UP JUDUL LAGU (MUNCUL KE KIRI) --- */}
      <AnimatePresence>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-2 bg-black/80 dark:bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-xl whitespace-nowrap">
              {/* Animasi Bar Spectrum Mini */}
              <div className="flex gap-1 items-end h-4">
                <motion.div 
                    animate={{ height: [4, 12, 6, 16, 4] }} 
                    transition={{ repeat: Infinity, duration: 0.5 }} 
                    className="w-1 bg-cyan-400 rounded-full" 
                />
                <motion.div 
                    animate={{ height: [8, 4, 16, 6, 8] }} 
                    transition={{ repeat: Infinity, duration: 0.7 }} 
                    className="w-1 bg-cyan-400 rounded-full" 
                />
                <motion.div 
                    animate={{ height: [12, 8, 4, 10, 12] }} 
                    transition={{ repeat: Infinity, duration: 0.6 }} 
                    className="w-1 bg-cyan-400 rounded-full" 
                />
              </div>

              {/* Teks Judul */}
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Now Playing</span>
                <span className="text-sm font-bold text-white">INERTIA - To be Hero X</span> {/* Ganti Judul Disini */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOMBOL BULAT UTAMA --- */}
      <button
        onClick={toggleMusic}
        className={`relative group flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg z-20 ${
          isPlaying 
            ? "bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-400" 
            : "bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/20"
        }`}
      >
        {/* Efek Ping (Radar) saat play */}
        {isPlaying && (
           <span className="absolute inset-0 rounded-full border border-cyan-500 opacity-50 animate-ping pointer-events-none"></span>
        )}

        {/* Icon Volume */}
        <motion.div
            key={isPlaying ? "playing" : "muted"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.div>
      </button>

    </div>
  );
};

export default BackgroundMusic;