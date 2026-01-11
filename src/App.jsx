import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // 1. Import Animation Library
import { CursorProvider, useCursor } from './context/CursorContext';
import SplashScreen from './components/SplashScreen'; // 2. Import SplashScreen

import BackgroundMusic from './components/BackgroundMusic';
import SplashCursor from './components/SplashCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './homepage/Hero';
import BentoGrid from './homepage/BentoGrid';
import Skills from './homepage/Skills';
import Profile from './homepage/Profile';
import Projects from './homepage/Projects';
import Blogs from './homepage/Blogs';
import AllProject from './homepage/AllProject';

// --- Komponen Layout Utama (Tetap Sama) ---
const MainLayout = () => {
  const { showSplash } = useCursor();

  return (
    <>
      <BackgroundMusic />
      <div 
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-500 ${showSplash ? 'opacity-100' : 'opacity-0'}`}
      >
        <SplashCursor />
      </div>

      <div className="bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative z-10">
        <Navbar />
        <Hero />
        <BentoGrid />
        <Skills />
        <Profile />
        <Projects />
        <Blogs />
        <Footer />
      </div>
    </>
  );
};

// --- Komponen App Utama (Diupdate dengan Loading Logic) ---
const App = () => {
  // State untuk Loading Screen
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CursorProvider>
      
      {/* Bungkus transisi antar Loading Screen dan Website */}
      <AnimatePresence mode="wait">
        
        {isLoading ? (
          // === TAMPILAN 1: LOADING SCREEN ===
          <motion.div key="splash-screen">
             <SplashScreen finishLoading={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          // === TAMPILAN 2: WEBSITE UTAMA ===
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Router>
              <Routes>
                <Route path="/" element={<MainLayout />} />
                
                <Route 
                  path="/all-projects" 
                  element={
                    <div className="relative z-10 bg-slate-900 min-h-screen">
                        <AllProject />
                    </div>
                  } 
                />
              </Routes>
            </Router>
          </motion.div>
        )}

      </AnimatePresence>

    </CursorProvider>
  );
};

export default App;