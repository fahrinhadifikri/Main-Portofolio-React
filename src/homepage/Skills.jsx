import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Palette, Terminal, Atom, Layers, Layout, Wind, Zap,
  Cpu, Server, Flame, Globe, Database, Table2,
  GitBranch, Github, Container, Cloud, Figma,
  Network, Share2, Bot, Workflow
} from 'lucide-react';

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);

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
      // FIX 1: Hindari menggunakan 'dark:text-white' di section utama untuk mencegah inheritance warna putih yang tidak diinginkan pada icon
      className="py-14 bg-slate-50 dark:bg-black relative overflow-hidden flex flex-col justify-center items-center min-h-[60vh] transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div 
            animate={{ 
               opacity: isHovered ? 0.5 : 0.1, 
               scale: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-[150px] h-[150px] bg-cyan-500/20 dark:bg-cyan-500 rounded-full blur-[100px]"
          />
       </div>

       <div className="container mx-auto px-6 relative z-10 text-center">
          
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Warna judul didefinisikan secara eksplisit di sini
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
                  whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(6,182,212,0.1)", 
                      borderColor: "rgba(6,182,212,0.5)" 
                  }}
                  // FIX 2: Warna background eksplisit (bg-white vs bg-slate-900)
                  className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full cursor-default transition-all duration-300 group shadow-sm hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/10 backdrop-blur-sm"
                >
                   {/* FIX 3: Wrapper Icon dibuat 'relative' dan warnanya didefinisikan Ulang dengan 'text-slate-500' agar TIDAK mewarisi warna putih */}
                   <div className="relative z-10 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {React.cloneElement(skill.icon, { size: 18, strokeWidth: 2 })}
                   </div>
                   
                   {/* FIX 4: Text Nama Skill juga didefinisikan ulang */}
                   <span className="relative z-10 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
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