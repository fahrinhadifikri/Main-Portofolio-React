import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Tambah AnimatePresence
import { Settings, ArrowLeft, Construction, Play, X } from 'lucide-react'; // Tambah Icon Play & X
import { Link } from 'react-router-dom';

const AllProject = () => {
  // 1. State untuk Modal Video
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* ICON SETTING BERPUTAR */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 8, 
              ease: "linear" 
            }}
          >
            <Settings size={80} className="text-cyan-600 dark:text-cyan-500" />
          </motion.div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700 dark:text-white">
             <Construction size={30} />
          </div>
        </div>

        {/* TEKS */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
            Work in Progress
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
            Halaman ini sedang dalam tahap pengembangan. Silakan kembali lagi nanti untuk melihat koleksi lengkap project saya.
          </p>
        </div>

        {/* CONTAINER TOMBOL */}
        <div className="flex flex-col items-center gap-4">
            
            {/* TOMBOL KEMBALI (Existing) */}
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-sm dark:shadow-none"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Homepage
            </Link>

            {/* 2. TOMBOL POP-UP VIDEO (New) */}
            <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors text-sm"
            >
                <Play size={16} fill="currentColor" /> Don't Click This
            </button>
        </div>

      </div>

      {/* 3. MODAL POP-UP VIDEO */}
      <AnimatePresence>
        {isVideoOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // Klik background untuk tutup
                onClick={() => setIsVideoOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    // Stop propagasi agar klik di video tidak menutup modal
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    {/* Tombol Close */}
                    <button 
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Embed Video (Contoh YouTube Lofi Code) */}
                    {/* Ganti src dengan link embed video project kamu */}
                    <iframe 
                        className="w-full h-full"
                        // TAMBAHKAN &autoplay=1&mute=1
                        src="https://www.youtube.com/embed/hPr-Yc92qaY?si=XO_tduwhHxgYBjgh&autoplay=1" 
                        title="Work in Progress" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AllProject;