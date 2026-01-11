import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
// HAPUS import Lanyard karena sudah diganti ProfileCard
import TextPressure from '../components/TextPressure'; 
import ProfileCard from '../components/ProfileCard';  

// --- 1. KOMPONEN COUNTER (TETAP SAMA) ---
const Counter = ({ from = 0, to, duration = 2, suffix = "", prefix = "" }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) {
          node.textContent = `${prefix}${value.toFixed(0)}${suffix}`;
        },
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, suffix, duration]);

  return <span ref={nodeRef} />;
};

// --- KOMPONEN MARQUEE (TETAP SAMA) ---
const Marquee = () => {
  const words = [
    "FULLSTACK DEV", "CREATIVE", "PROBLEM SOLVER", "DISCIPLINED", 
    "FAST LEARNER", "TEAM PLAYER", "INNOVATIVE", "ADAPTIVE", 
    "DETAIL-ORIENTED", "PASSIONATE"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-10">
      <div className="relative z-10 flex bg-cyan-500 py-4 border-y border-white/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
        <motion.div
          className="flex flex-nowrap gap-8 whitespace-nowrap font-bold text-white tracking-widest text-sm md:text-base items-center"
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
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

// --- MAIN COMPONENT ---
const Profile = () => {
  // Fungsi untuk scroll ke footer saat tombol contact diklik
  const handleContactClick = () => {
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="profile" className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white py-20 overflow-hidden transition-colors duration-300 relative">
      
      {/* BAGIAN MARQUEE */}
      <div className="mb-24">
         <Marquee />
      </div>

      <div className="w-full px-8 md:px-16">
        
        <div className="flex flex-col md:flex-row items-center gap-16 min-h-[600px]">
          
          {/* KIRI: Text Content */}
          <div className="md:w-1/2 space-y-8 z-10 order-2 md:order-1">
             <div className="space-y-4 w-full">
                <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-[0.2em] uppercase mb-2">
                   Who Am I?
                </p>
                
                {/* IMPLEMENTASI TEXT PRESSURE */}
                <div className="relative w-full h-auto space-y-2">
                    <TextPressure 
                        text="More Than Code" 
                        flex={true} 
                        alpha={false} 
                        stroke={false} 
                        width={true} 
                        weight={true} 
                        italic={true} 
                        textColor="#0f172a" 
                        className="dark:text-white dark:invert"
                        minFontSize={36}
                    />
                     <TextPressure 
                        text="I Build Solutions" 
                        flex={true} 
                        alpha={false} 
                        stroke={false} 
                        width={true} 
                        weight={true} 
                        italic={true} 
                        textColor="#06b6d4"
                        minFontSize={36}
                    />
                </div>
             </div>

             <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-xl mt-6">
                Halo! Saya Fahrin, seorang Fullstack Developer yang berfokus pada performa dan estetika. 
                Saya percaya bahwa website yang hebat tidak hanya berfungsi dengan baik, tapi juga memberikan pengalaman yang tak terlupakan.
             </p>

             {/* STATS */}
             <div className="flex gap-8 border-t border-slate-200 dark:border-white/10 pt-6">
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                      <Counter from={0} to={3} duration={2} suffix="-" />
                   </h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Years Exp.</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                      <Counter from={0} to={20} duration={2.5} suffix="-" />
                   </h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Projects</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                      <Counter from={0} to={1000} duration={3} suffix="%" />
                   </h4>
                   <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Commitment</p>
                </div>
             </div>

             <div className="pt-4">
                <a href="#footer" className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b border-slate-900 dark:border-white pb-1 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all">
                   Hubungi Saya <ArrowUpRight size={18} />
                </a>
             </div>
          </div>

          {/* KANAN: PROFILE CARD */}
          <div className="md:w-1/2 w-full relative flex justify-center items-center h-[500px] md:h-[600px] order-1 md:order-2">
             <div className="w-full h-full relative z-20 flex justify-center items-center">
                
                {/* --- UPDATE: DATA PRIBADI KAMU --- */}
                <ProfileCard
                  name="Fahrin Hadi Fikri" // Sesuaikan nama
                  title="Fullstack Developer" // Sesuaikan role
                  handle="fahrinhadifikri" // Username sosmed
                  status="Open to Work"
                  contactText="Hire Me"
                  avatarUrl="/user1.png" // Menggunakan aset dari folder public
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={true} 
                  onContactClick={handleContactClick} // Arahkan ke footer
                />

             </div>

             {/* Dekorasi Belakang */}
             <div className="absolute -z-10 w-[80%] h-[80%] bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;