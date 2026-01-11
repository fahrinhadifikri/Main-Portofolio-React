import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorProvider, useCursor } from './context/CursorContext'; // 1. Import Context
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

// Komponen perantara untuk mengambil logic showSplash
const MainLayout = () => {
  const { showSplash } = useCursor(); // 2. Ambil remote control status

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
        <Skills /> {/* Skills nanti akan mematikan splash dari dalam */}
        <Profile />
        <Projects />
        <Blogs />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <CursorProvider> {/* 4. Bungkus semua dengan Provider */}
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
    </CursorProvider>
  );
};

export default App;