import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import Email from '../homepage/Email'; // Pastikan path ini benar (cek folder components)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State Active & Hover
  const [activeTab, setActiveTab] = useState('Home'); 
  const [hoveredTab, setHoveredTab] = useState(null); 

  // State Modal Email
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // --- LOGIKA DARK MODE ---
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Cek LocalStorage / System Preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi Toggle
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
  ];

  return (
    <>
      <nav 
        className={`fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 ${
          isScrolled 
            ? "top-6 w-[90%] md:w-[85%] bg-white/80 dark:bg-black/80 border border-black/5 dark:border-white/10 rounded-full shadow-2xl backdrop-blur-xl px-4 py-3" 
            : "top-0 w-full bg-transparent border-none px-6 py-6"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          
          {/* 1. KIRI: LOGO */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="text-black dark:text-white p-1.5 rounded-full transition-colors">
               <Code2 size={20} />
            </div>
            <div className="hidden md:flex flex-col leading-none">
               <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-widest">Fahrin Hadi Fikri</span>
               <span className="text-[10px] font-bold text-blue-500 tracking-widest">Fullstack Developer</span>
            </div>
          </div>

          {/* 2. TENGAH: NAVIGATION */}
          <div 
            className="hidden md:flex items-center border-white/5 p-1 relative"
            onMouseLeave={() => setHoveredTab(null)} 
          >
            {navLinks.map((link) => {
              const isSelected = hoveredTab === link.name || (!hoveredTab && activeTab === link.name);

              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  onMouseEnter={() => setHoveredTab(link.name)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
                    isSelected 
                      ? "text-white dark:text-black" // Text active mengikuti warna pill
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {link.name}
                  {isSelected && (
                    <motion.span
                      layoutId="nav-pill"
                      // Pill: Hitam di Light Mode, Putih di Dark Mode
                      className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* 3. KANAN: TOMBOL TOGGLE & CTA */}
          <div className="flex items-center gap-4">
             
             {/* --- TOMBOL SIANG/MALAM (UPDATED) --- */}
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-200 dark:bg-white/10 hover:scale-110 transition-transform shadow-sm"
                title="Toggle Theme"
             >
                {isDarkMode ? (
                    // Jika Dark Mode Aktif -> Tampilkan Matahari (Kuning)
                    <Sun size={20} className="text-yellow-500" />
                ) : (
                    // Jika Light Mode Aktif -> Tampilkan Bulan (Ungu)
                    <Moon size={20} className="text-purple-600" />
                )}
             </button>

             {/* Tombol HIRE ME */}
             <button 
               onClick={() => setIsEmailOpen(true)}
               className="hidden md:block bg-black dark:bg-white/10 border border-transparent dark:border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 dark:hover:bg-white dark:hover:text-black transition-all duration-300"
             >
               Hire Me
             </button>

             {/* Hamburger Menu (Mobile) */}
             <div className="md:hidden text-slate-800 dark:text-slate-200 cursor-pointer p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
             </div>
          </div>

        </div>
      </nav>

      {/* 4. MOBILE DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl pt-28 px-6 md:hidden flex flex-col items-center gap-6 text-slate-800 dark:text-slate-200"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => { setActiveTab(link.name); setIsMobileMenuOpen(false); }}
                className={`text-lg font-medium px-6 py-2 rounded-full transition-all ${
                   activeTab === link.name ? "bg-black text-white dark:bg-white dark:text-black" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Tombol Theme Mobile (Opsional jika ingin ada di menu juga) */}
            <div className="flex gap-4">
                <button 
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-slate-100 dark:bg-white/10 flex items-center gap-2"
                >
                    {isDarkMode ? (
                        <> <Sun className="text-yellow-500 fill-yellow-500" /> <span className="text-sm font-bold">Light Mode</span> </>
                    ) : (
                        <> <Moon className="text-purple-600 fill-purple-600" /> <span className="text-sm font-bold">Dark Mode</span> </>
                    )}
                </button>
            </div>

            <button 
              onClick={() => { setIsEmailOpen(true); setIsMobileMenuOpen(false); }}
              className="mt-4 bg-cyan-500 text-black font-bold px-8 py-3 rounded-full w-full max-w-xs hover:bg-cyan-400 transition-all"
            >
               Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Email 
        isOpen={isEmailOpen} 
        onClose={() => setIsEmailOpen(false)} 
      />
    </>
  );
};

export default Navbar;