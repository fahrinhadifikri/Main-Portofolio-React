import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Code2, Layout, ShoppingCart, BarChart3, Building2, MonitorSmartphone } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Template E-Commerce",
      desc: "Platform belanja online modern dengan fitur keranjang, checkout, dan payment gateway dummy.",
      tech: ["React", "Redux", "Tailwind"],
      icon: <ShoppingCart size={24} className="text-pink-600 dark:text-pink-500" />,
      color: "from-pink-500 to-rose-500",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80"
    },
    {
      id: 2,
      title: "Admin Dashboard",
      desc: "Sistem manajemen data interaktif dengan grafik real-time dan dark mode.",
      tech: ["Next.js", "Recharts", "TypeScript"],
      icon: <BarChart3 size={24} className="text-purple-600 dark:text-purple-500" />,
      color: "from-purple-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    },
    {
      id: 3,
      title: "Template Portfolio",
      desc: "Personal website minimalis dengan animasi framer motion dan SEO friendly.",
      tech: ["React", "Framer Motion", "Vite"],
      icon: <Layout size={24} className="text-cyan-600 dark:text-cyan-500" />,
      color: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
    },
    {
      id: 4,
      title: "Company Profile",
      desc: "Landing page korporat yang elegan untuk meningkatkan kredibilitas bisnis.",
      tech: ["HTML5", "Sass", "JavaScript"],
      icon: <Building2 size={24} className="text-orange-600 dark:text-orange-500" />,
      color: "from-orange-500 to-amber-500",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
    },
    {
      id: 5,
      title: "Learning Management",
      desc: "Platform kursus online dengan fitur video player dan progress tracking.",
      tech: ["Laravel", "Vue.js", "MySQL"],
      icon: <MonitorSmartphone size={24} className="text-green-600 dark:text-green-500" />,
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80"
    },
    {
      id: 6,
      title: "API Documentation",
      desc: "Situs dokumentasi teknis dengan fitur pencarian dan code snippet interactive.",
      tech: ["React", "MDX", "Node.js"],
      icon: <Code2 size={24} className="text-blue-600 dark:text-blue-500" />,
      color: "from-blue-500 to-sky-500",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80"
    }
  ];

  return (
    // UBAH 1: Background Section & Text Color
    <section id="projects" className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full px-8 md:px-16 relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
            Behind the Curtains
          </p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white"
          >
            Crafting What Others <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600 font-serif italic">
              Already Crafted
            </span>
          </motion.h2>
        </div>

        {/* GRID PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              // UBAH 2: Card Background (Putih vs Hitam), Border, Shadow
              className="group relative bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col h-[400px] shadow-lg dark:shadow-none transition-all duration-300"
            >
              
              {/* Bagian Atas: Header Kartu */}
              <div className="p-6 flex justify-between items-start relative z-20">
                {/* Icon Box */}
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 backdrop-blur-sm group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition">
                   {item.icon}
                </div>
                {/* Social Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="p-2 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer transition">
                      <Github size={16} />
                   </div>
                   <div className="p-2 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer transition">
                      <ExternalLink size={16} />
                   </div>
                </div>
              </div>

              {/* Bagian Tengah: Judul, Deskripsi & Tags */}
              <div className="px-6 relative z-20">
                 {/* UBAH 3: Warna Judul */}
                 <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-white dark:group-hover:to-slate-400 transition-all">
                    {item.title}
                 </h3>
                 <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {item.desc}
                 </p>
                 {/* Tech Stack Pills */}
                 <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, idx) => (
                       <span key={idx} className="text-[10px] font-medium px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 bg-opacity-80 backdrop-blur-sm">
                          {t}
                       </span>
                    ))}
                 </div>
              </div>

              {/* Bagian Bawah: Image Preview */}
              <div className="absolute bottom-0 left-0 w-full h-[40%] overflow-hidden mt-6 z-10">
                 {/* UBAH 4: Gradient Overlay Image (Harus Putih di Siang, Hitam di Malam agar menyatu dengan kartu) */}
                 <div className="w-full h-full bg-gradient-to-t from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent absolute z-10 transition-colors duration-300"></div>
                 <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform translate-y-4 group-hover:translate-y-0 scale-110 group-hover:scale-100 transition-all duration-700 opacity-50 group-hover:opacity-100" 
                 />
              </div>

              {/* Hover Glow Effect Border */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-3xl group-hover:border-purple-500/20 transition-all duration-500 pointer-events-none z-30`}></div>
              
              {/* Background Gradient Halus saat Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none z-0`}></div>

            </motion.div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="text-center mt-16">
           <Link to="/all-projects">
             {/* UBAH 5: Tombol Style (Light vs Dark) */}
             <button className="px-8 py-3 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-full text-sm font-bold text-slate-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-2 mx-auto group shadow-sm dark:shadow-none">
                View All Projects 
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
             </button>
           </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;