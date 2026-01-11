import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
// 1. IMPORT CONTEXT (Pastikan path-nya sesuai dengan lokasi file context kamu)
import { useCursor } from '../context/CursorContext'; 
import { 
  Code2, Palette, Terminal, Atom, Layers, Layout, Wind, Zap,
  Cpu, Server, Flame, Globe, Database, Table2,
  GitBranch, Github, Container, Cloud, Figma,
  Network, Share2, Bot, Workflow
} from 'lucide-react';

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTargeting, setIsTargeting] = useState(false);
  
  // 2. AMBIL FUNGSI SAKLAR DARI CONTEXT
  const { setShowSplash } = useCursor();

  const TARGET_RADIUS = 125;
  const IDLE_RADIUS = 3000; 

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(IDLE_RADIUS); 

  const diameter = useTransform(radius, r => r * 2);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  useEffect(() => {
    if (isTargeting) {
      animate(radius, TARGET_RADIUS, {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      });
    } else {
      animate(radius, IDLE_RADIUS, {
        duration: 0.6,
        ease: "easeInOut",
      });
    }
  }, [isTargeting, radius]);

  const skillsData = [
    { name: 'HTML5', icon: <Code2 /> },
    { name: 'CSS3', icon: <Palette /> },
    { name: 'JavaScript', icon: <Terminal /> },
    { name: 'React', icon: <Atom /> },
    { name: 'Next.js', icon: <Layers /> },
    { name: 'Bootstrap', icon: <Layout /> },
    { name: 'Tailwind', icon: <Wind /> },
    { name: 'Vite', icon: <Zap /> },
    { name: 'Node.js', icon: <Cpu /> },
    { name: 'Laravel', icon: <Server /> },
    { name: 'CodeIgniter', icon: <Flame /> },
    { name: 'REST API', icon: <Globe /> },
    { name: 'MySQL', icon: <Database /> },
    { name: 'HeidiSQL', icon: <Table2 /> },
    { name: 'Git', icon: <GitBranch /> },
    { name: 'GitHub', icon: <Github /> },
    { name: 'Docker', icon: <Container /> },
    { name: 'Hosting/VPS', icon: <Cloud /> },
    { name: 'Figma', icon: <Figma /> },
    { name: 'PowerDesigner', icon: <Network /> },
    { name: 'StarUML', icon: <Share2 /> },
    { name: 'ChatGPT', icon: <Bot /> },
    { name: 'Automation', icon: <Workflow /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-14 bg-slate-50 dark:bg-black relative overflow-hidden flex flex-col justify-center items-center min-h-[60vh] transition-colors duration-300 cursor-none [--overlay-color:rgba(0,0,0,0.9)] dark:[--overlay-color:rgba(255,255,255,0.9)]"
      
      // 3. LOGIC UTAMA DISINI:
      onMouseEnter={() => {
        setIsHovered(true);   // Nyalakan Crosshair
        setShowSplash(false); // MATIKAN Splash Cursor (Fade Out)
      }}
      onMouseLeave={() => {
        setIsHovered(false);  // Matikan Crosshair
        setShowSplash(true);  // NYALAKAN Splash Cursor (Fade In)
      }}
      
      onMouseMove={handleMouseMove}
    >
       
       {/* --- 1. MODE NORMAL: SIMPLE CROSSHAIR --- */}
       <motion.div 
         className="pointer-events-none absolute inset-0 z-50"
         animate={{ opacity: isHovered && !isTargeting ? 1 : 0 }}
       >
          <motion.div style={{ x: mouseX }} className="absolute top-0 bottom-0 w-[1px] bg-slate-400/50" />
          <motion.div style={{ y: mouseY }} className="absolute left-0 right-0 h-[1px] bg-slate-400/50" />
       </motion.div>


       {/* --- 2. MODE TARGET: OVERLAY "SHAPE" --- */}
       
       {/* A. SHAPE MASKING (THE HOLE) */}
       <motion.div 
          className="absolute z-40 pointer-events-none rounded-full"
          animate={{ opacity: isHovered ? 1 : 0 }} 
          style={{ 
             left: mouseX, 
             top: mouseY,
             x: "-50%", 
             y: "-50%",
             width: diameter, 
             height: diameter,
             background: "transparent", 
             boxShadow: "0 0 0 9999px var(--overlay-color)" 
          }}
       />

       {/* B. SCOPE HUD (Merah) */}
       <motion.div
          className="absolute z-50 pointer-events-none flex items-center justify-center"
          animate={{ 
            opacity: isTargeting ? 1 : 0,
            scale: isTargeting ? 1 : 0.8 
          }}
          transition={{ duration: 0.2 }}
          style={{ 
             left: mouseX, 
             top: mouseY,
             x: "-50%", 
             y: "-50%",
             width: TARGET_RADIUS * 2,
             height: TARGET_RADIUS * 2
          }}
       >
          <div className="w-full h-full border-2 border-red-500/50 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.2)] relative flex items-center justify-center">
             <div className="absolute w-full h-[1px] bg-red-500/30" />
             <div className="absolute h-full w-[1px] bg-red-500/30" />
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_red] z-10" />
             {/* Corner Brackets */}
             <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-red-500 rounded-tl-md" />
             <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-red-500 rounded-tr-md" />
             <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-red-500 rounded-bl-md" />
             <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-red-500 rounded-br-md" />
          </div>
       </motion.div>


       {/* --- 3. BACKGROUND GLOW --- */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div 
            animate={{ opacity: isHovered ? 0.5 : 0.1, scale: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-[150px] h-[150px] bg-cyan-500/20 dark:bg-cyan-500 rounded-full blur-[100px]"
          />
       </div>

       {/* --- 4. KONTEN SKILLS --- */}
       <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100"
            >
              Pura-pura <span className="text-cyan-600 dark:text-cyan-400 font-serif italic font-normal">Bisa.</span>
            </motion.h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto"
          >
             {skillsData.map((skill, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setIsTargeting(true)}
                  onMouseLeave={() => setIsTargeting(false)}
                  whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: "rgba(239, 68, 68, 0.1)", 
                      borderColor: "rgba(239, 68, 68, 0.6)"      
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full cursor-none transition-all duration-200 group shadow-sm hover:shadow-red-500/20 backdrop-blur-sm relative z-20"
                >
                   <div className="relative z-10 text-slate-500 dark:text-slate-400 group-hover:text-red-500 transition-colors duration-200">
                      {React.cloneElement(skill.icon, { size: 18, strokeWidth: 2 })}
                   </div>
                   <span className="relative z-10 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200">
                      {skill.name}
                   </span>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  );
};

export default Skills;