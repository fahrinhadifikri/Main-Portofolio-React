import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';

// --- KOMPONEN RUNNING TEXT (MARQUEE) ---
const Marquee = () => {
  const words = [
    "FULLSTACK DEV", "CREATIVE", "PROBLEM SOLVER", "DISCIPLINED", 
    "FAST LEARNER", "TEAM PLAYER", "INNOVATIVE", "ADAPTIVE", 
    "DETAIL-ORIENTED", "PASSIONATE"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-10">
      {/* Container Text Berjalan */}
      <div className="relative z-10 flex bg-cyan-500 py-4 border-y border-white/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
        <motion.div
          className="flex flex-nowrap gap-8 whitespace-nowrap font-bold text-white tracking-widest text-sm md:text-base items-center"
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
        >
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>{word}</span>
              <Star size={12} fill="white" className="text-white" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- DATA GAMBAR CAROUSEL ---
const profileImages = [
  "/user1.png", 
  "/user2.png", 
  "/user3.png",
  "/user4.png",
  "/user5.png"
];

// --- MAIN COMPONENT ---
const Profile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide 6 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profileImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // UBAH 1: Background Global (Putih vs Hitam) & Text Color
    <section id="profile" className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white py-20 overflow-hidden transition-colors duration-300">
      
      {/* 1. BAGIAN MARQUEE */}
      <div className="mb-24">
         <Marquee />
      </div>

      <div className="w-full px-8 md:px-16">
        
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* KIRI: Text Content */}
          <div className="md:w-1/2 space-y-8 z-10">
             <div className="space-y-2">
                <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-[0.2em] uppercase">
                   Who Am I?
                </p>
                {/* UBAH 2: Warna Heading */}
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                   More than just code, I build <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 italic font-serif">
                      solutions.
                   </span>
                </h2>
             </div>

             {/* UBAH 3: Warna Deskripsi */}
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-xl">
                Halo! Saya Fahrin, seorang Fullstack Developer yang berfokus pada performa dan estetika. 
                Saya percaya bahwa website yang hebat tidak hanya berfungsi dengan baik, tapi juga memberikan pengalaman yang tak terlupakan.
             </p>

             {/* Stats */}
             <div className="flex gap-8 border-t border-slate-200 dark:border-white/10 pt-6">
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white">-3</h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Years Exp.</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white">-20</h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Projects</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white">1000%</h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Commitment</p>
                </div>
             </div>

             <div className="pt-4">
                {/* UBAH 4: Link Color (Hitam vs Putih) */}
                <a href="#footer" className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b border-slate-900 dark:border-white pb-1 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all">
                   Hubungi Saya <ArrowUpRight size={18} />
                </a>
             </div>
          </div>

          {/* KANAN: Image Carousel */}
          <div className="md:w-1/2 w-full relative flex justify-center md:justify-end h-[400px] md:h-[500px]">
             
             {/* Frame Gambar */}
             {/* UBAH 5: Frame Background & Shadow */}
             <div className="relative w-full max-w-md h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/20 shadow-2xl bg-white dark:bg-[#0a0a0a] transition-all duration-300">
                
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentIndex}
                    src={profileImages[currentIndex]}
                    alt="Profile Slideshow"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ x: "100%", opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }}      
                    exit={{ x: "-100%", opacity: 0 }}   
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>

                {/* Overlay Text (Tetap text putih karena di atas gambar gelap/gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20 flex flex-col justify-end p-8 pointer-events-none">
                   <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-1">My Journey</p>
                   <p className="text-white text-xl font-medium">Capturing moments in life.</p>
                </div>

                {/* Indikator Dots */}
                <div className="absolute bottom-4 right-8 z-30 flex gap-2">
                   {profileImages.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                           idx === currentIndex ? "bg-cyan-400 w-6" : "bg-white/30"
                        }`}
                      />
                   ))}
                </div>

             </div>

             {/* Dekorasi Belakang */}
             {/* UBAH 6: Warna dekorasi (Abu terang vs Abu gelap) */}
             <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-slate-200 dark:border-white/5 rounded-3xl bg-slate-100 dark:bg-white/5 blur-sm transition-colors duration-300"></div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;