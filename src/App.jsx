import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Komponen
import BackgroundMusic from './components/BackgroundMusic';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './homepage/Hero';
import BentoGrid from './homepage/BentoGrid';
import Skills from './homepage/Skills';
import Profile from './homepage/Profile';
import Projects from './homepage/Projects';
import Blogs from './homepage/Blogs';
import AllProject from './homepage/AllProject';

const App = () => {
  return (
    <Router>

    <BackgroundMusic />

      <Routes>
        
        {/* --- RUTE 1: HOMEPAGE (Halaman Utama) --- */}
        <Route 
          path="/" 
          element={
            <div className="bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
              <Navbar />
              <Hero />
              <BentoGrid />
              <Skills />
              <Profile />
              <Projects />
              <Blogs />
              <Footer />
            </div>
          } 
        />

        {/* --- RUTE 2: ALL PROJECTS (Halaman Baru) --- */}
        <Route 
          path="/all-projects" 
          element={<AllProject />} 
        />

      </Routes>
    </Router>
  );
};

export default App;