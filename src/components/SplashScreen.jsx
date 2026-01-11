import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ finishLoading }) => {
  const [count, setCount] = useState(0);

  // Efek Counter 0% -> 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20); // Kecepatan counter

    // Selesai loading setelah 2.5 detik (sesuaikan durasi ini)
    const timeout = setTimeout(() => {
      finishLoading();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Angka Persentase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl md:text-8xl font-bold font-mono mb-8"
      >
        {count}%
      </motion.div>

      {/* Progress Bar Line */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className="h-full bg-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
        />
      </div>

      {/* Pesan Desktop Mode */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase text-center px-4"
      >
        Use desktop mode for better experience
      </motion.p>

    </div>
  );
};

export default SplashScreen;