import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';

// --- DATA BLOG DUMMY ---
const blogPosts = [
  {
    id: 1,
    title: "Why React Server Components Change Everything",
    desc: "Memahami bagaimana RSC mengubah cara kita membangun aplikasi web modern dengan performa maksimal.",
    category: "Tech",
    readTime: "5 min read",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS: Beyond the Basics",
    desc: "Tips dan trik advanced menggunakan Tailwind untuk arsitektur CSS yang scalable dan rapi.",
    category: "Design",
    readTime: "7 min read",
    date: "Jan 08, 2026",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80"
  },
  {
    id: 3,
    title: "The Psychology of Micro-interactions",
    desc: "Bagaimana animasi kecil dapat meningkatkan UX dan membuat user betah berlama-lama.",
    category: "UX/UI",
    readTime: "4 min read",
    date: "Jan 05, 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80"
  },
  {
    id: 4,
    title: "Building Scalable Backend with Laravel",
    desc: "Best practice struktur folder dan design pattern dalam pengembangan API Laravel.",
    category: "Backend",
    readTime: "10 min read",
    date: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&q=80"
  },
  {
    id: 5,
    title: "Dockerizing Your Fullstack Application",
    desc: "Panduan lengkap membungkus aplikasi React dan Node.js ke dalam container.",
    category: "DevOps",
    readTime: "8 min read",
    date: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80"
  }
];

// --- KOMPONEN KARTU BLOG ---
const BlogCard = ({ post }) => (
  // UBAH 1: Card Background (Putih vs Hitam Pekat)
  <div className="w-[350px] md:w-[400px] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex-shrink-0 group hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden mx-4 shadow-md dark:shadow-none">
    
    {/* Background Gradient Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="flex flex-col h-full relative z-10">
       {/* Category & Date */}
       <div className="flex justify-between items-center mb-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5 text-cyan-600 dark:text-cyan-400">
             <Tag size={12} />
             <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-1">
             <Calendar size={12} />
             <span>{post.date}</span>
          </div>
       </div>

       {/* Title */}
       {/* UBAH 2: Judul Hitam di Siang, Putih di Malam */}
       <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
          {post.title}
       </h3>

       {/* Desc */}
       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.desc}
       </p>

       {/* Footer: Read Time & Link */}
       <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
             <Clock size={12} />
             <span>{post.readTime}</span>
          </div>
          <button className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
             Read Article <ArrowUpRight size={16} />
          </button>
       </div>
    </div>
  </div>
);

// --- KOMPONEN MARQUEE TRACK ---
const MarqueeGroup = ({ children, direction = "left" }) => {
  return (
    <div className="flex overflow-hidden relative w-full py-4">
      {/* UBAH 3: Gradient Fade Kiri-Kanan (Agar menyatu dengan background section) */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent dark:from-black dark:to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent dark:from-black dark:to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
      >
        {children}
        {children} {/* Render double untuk seamless loop */}
      </motion.div>
    </div>
  );
};

// --- MAIN SECTION ---
const Blogs = () => {
  return (
    // UBAH 4: Section Background (Putih vs Hitam)
    <section id="blogs" className="py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/10 dark:bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase mb-4">
              Thoughts & Insights
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              I Created this (Fake) <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 font-serif italic">
                Blogs Yesterday.
              </span>
          </h2>
        </div>
      </div>

      {/* --- MARQUEE BLOGS (2 BARIS BERLAWANAN ARAH) --- */}
      <div className="space-y-6">
         {/* Baris 1: Gerak ke Kiri */}
         <MarqueeGroup direction="left">
            <div className="flex">
               {blogPosts.map((post) => (
                  <BlogCard key={`row1-${post.id}`} post={post} />
               ))}
            </div>
         </MarqueeGroup>

         {/* Baris 2: Gerak ke Kanan */}
         <MarqueeGroup direction="right">
            <div className="flex">
               {/* Kita reverse urutan biar visualnya beda dikit */}
               {[...blogPosts].reverse().map((post) => (
                  <BlogCard key={`row2-${post.id}`} post={post} />
               ))}
            </div>
         </MarqueeGroup>
      </div>

    </section>
  );
};

export default Blogs;