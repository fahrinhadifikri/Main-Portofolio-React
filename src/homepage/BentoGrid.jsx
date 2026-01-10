import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- 1. IMPORT LINK
import { Github, Linkedin, Instagram, Copy, Check, ArrowUpRight, MapPin } from 'lucide-react';

// --- KONFIGURASI ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const BentoGrid = () => {
  // --- 1. LOGIC JAM ---
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDegrees = (time.getSeconds() / 60) * 360;
  const minutesDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hoursDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;

  // --- 2. LOGIC COPY EMAIL ---
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("phfikri01@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 3. LOGIC TYPEWRITER EFFECT ---
  const fullText = "Menciptakan interaksi mikro yang halus. Bukan sekadar visual, tapi pengalaman yang memuaskan jari pengguna.";
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (startTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [typedText, startTyping]);

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      <div className="w-full px-8 md:px-16">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setStartTyping(true)} 
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[650px]"
        >
          
          {/* --- GRID 1: PROFIL --- */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(6,182,212,0.5)" }}
            className="md:row-span-2 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative group shadow-xl dark:shadow-2xl transition-all duration-300"
          >
              {/* Glow Effect */}
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition duration-500"></div>

              <div className="z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-white/20">
                       <img src="/images.png" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className="font-bold text-xl leading-none text-slate-900 dark:text-white">Fahrin Hadi Fikri</h3>
                       <span className="text-xs text-slate-500">@fahrinhadifikri</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 w-fit px-3 py-1 rounded-full border border-slate-200 dark:border-transparent">
                    <MapPin size={12} />
                    <span>Banjarmasin • {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
              </div>

              {/* Stacked Cards Visual */}
              <div className="flex-1 flex items-center justify-center gap-3 scale-110 my-6 group-hover:scale-105 transition duration-700 ease-out z-10">
                 <div className="w-24 h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden -rotate-6 border border-slate-300 dark:border-white/10 opacity-60 group-hover:opacity-100 transition duration-500 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition" alt="Code" />
                 </div>
                 <div className="w-28 h-56 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden z-10 border border-slate-300 dark:border-white/20 shadow-2xl -mt-4 group-hover:-mt-8 transition-all duration-500">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80" className="w-full h-full object-cover" alt="Setup" />
                 </div>
                 <div className="w-24 h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden rotate-6 border border-slate-300 dark:border-white/10 opacity-60 group-hover:opacity-100 transition duration-500 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition" alt="Laptop" />
                 </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 justify-center mt-2 z-10">
                 <Github size={20} className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white cursor-pointer transition" />
                 <Linkedin size={20} className="text-slate-400 dark:text-slate-500 hover:text-[#0077b5] cursor-pointer transition" />
                 <Instagram size={20} className="text-slate-400 dark:text-slate-500 hover:text-[#C13584] dark:hover:text-[#1DA1F2] cursor-pointer transition" />
              </div>
              
              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent pointer-events-none z-0"></div>
          </motion.div>

          {/* --- GRID 2: FILOSOFI --- */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(6,182,212,0.5)" }}
            className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group shadow-xl dark:shadow-xl transition-all duration-300"
          >
              <div className="absolute top-6 right-6 flex gap-2 opacity-50 group-hover:opacity-100 transition z-10">
                 <span className="text-[10px] uppercase border border-slate-300 dark:border-white/20 px-2 py-1 rounded-full text-slate-500 dark:text-slate-300">UX</span>
                 <span className="text-[10px] uppercase border border-slate-300 dark:border-white/20 px-2 py-1 rounded-full text-slate-500 dark:text-slate-300">Motion</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-[0.9] z-10 mt-4 text-slate-900 dark:text-white">
                 Interfaces <br />
                 <span className="font-serif italic text-slate-400 font-normal group-hover:text-black dark:group-hover:text-white transition-colors duration-500">you can feel.</span>
              </h2>
              
              <div className="mt-6 h-20 z-10">
                <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed font-mono">
                   {typedText}
                   <span className="animate-pulse text-cyan-500">|</span>
                </p>
              </div>
              
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition duration-700"></div>
          </motion.div>

          {/* --- GRID 3: KONTAK --- */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.5)" }}
            className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 flex flex-col justify-between group shadow-xl dark:shadow-xl relative overflow-hidden transition-all duration-300"
          >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-[60px] group-hover:bg-green-500/20 transition duration-700"></div>

              <div className="flex justify-between items-start z-10">
                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition duration-300">
                    <ArrowUpRight size={20} />
                 </div>
                 <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wide">Available</span>
                 </div>
              </div>
              <div className="space-y-2 mt-4 z-10">
                 <p className="text-xl font-bold text-slate-900 dark:text-white">Let's build together.</p>
                 <div 
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer transition p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg -ml-2"
                 >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    <span className="text-sm font-mono">{copied ? "Copied!" : "phfikri01@gmail.com"}</span>
                 </div>
              </div>

              {/* UBAH 2: Button 'Start Project' jadi Link */}
              <Link 
                to="/all-projects" 
                className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-black font-bold py-3 rounded-xl mt-4 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-black hover:scale-[1.02] transition-all text-sm z-10 shadow-md block text-center"
              >
                 Start Project
              </Link>
          </motion.div>

          {/* --- GRID 4: JAM DUNIA --- */}
          <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(33, 197, 94, 0.5)" }}
              className="md:col-span-2 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group shadow-xl dark:shadow-2xl transition-all duration-300"
          >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-gradient-to-b from-transparent via-green-900/10 dark:via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-1000 rotate-45 pointer-events-none z-0"></div>

              <div className="z-10 max-w-sm mb-8 md:mb-0 text-center md:text-left">
                 <div className="inline-block p-2 bg-slate-100 dark:bg-white/5 rounded-lg mb-4 border border-slate-200 dark:border-white/10">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-[0.2em]">Global Mindset</h3>
                 </div>
                 <p className="text-3xl font-medium text-slate-900 dark:text-slate-200 leading-tight">
                    Adaptable across <br/>
                    <span className="text-slate-400 dark:text-slate-500 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">Time Zones.</span>
                 </p>
                 <p className="text-sm text-slate-500 mt-4">Fleksibilitas kerja remote tinggi, siap kolaborasi.</p>
              </div>
              
              {/* Jam Analog Visual */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(34,197,94,0.1)] transition duration-500 z-10">
                 {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-0.5 h-3 bg-slate-400 dark:bg-slate-700" style={{ transform: `rotate(${i * 30}deg) translateY(-88px)` }}></div>
                 ))}
                 <div className="absolute w-1.5 h-16 bg-slate-800 dark:bg-gradient-to-t dark:from-slate-400 dark:to-white rounded-full origin-bottom shadow-lg z-10" style={{ transform: `rotate(${hoursDegrees}deg)`, bottom: '50%' }}></div>
                 <div className="absolute w-1 h-24 bg-slate-500 dark:bg-slate-300 rounded-full origin-bottom shadow-lg z-10" style={{ transform: `rotate(${minutesDegrees}deg)`, bottom: '50%' }}></div>
                 <div className="absolute w-0.5 h-28 bg-green-500 rounded-full origin-bottom shadow-lg z-20" style={{ transform: `rotate(${secondsDegrees}deg)`, bottom: '50%' }}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full shadow-[green]"></div>
                 </div>
                 <div className="absolute w-3 h-3 bg-white border-2 border-slate-900 rounded-full z-30"></div>
              </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;