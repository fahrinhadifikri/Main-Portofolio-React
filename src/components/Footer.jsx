import React, { useState } from 'react';
import { 
  Github, Linkedin, Instagram, 
  ArrowUpRight, Copy, Check, Mail, Heart, Code2, 
  PhoneCall
} from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("phfikri01@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/fahrinhadifikri" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/pahrin-hadi-fikri-0a8231222/" },
    { icon: <PhoneCall size={20} />, href: "https://wa.me/082211026943" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/itsfrinciple?igsh=MXdzeHRoaDQ3MDA0Yg==" },
  ];

  const footerLinks = [
    {
      title: "Sitemap",
      links: ["Home", "About", "Work", "Blogs"]
    },
    {
      title: "Services",
      links: ["Web Development", "UI/UX Design", "System Architecture", "Consultation"]
    },
    {
      title: "Resources",
      links: ["Guestbook", "Uses", "Docs", "Starter Kits"]
    }
  ];

  return (
    // UBAH 1: Background & Text Color (Light vs Dark)
    <footer id="footer" className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white pt-20 pb-10 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="w-full px-8 md:px-16 relative z-10">
        
        {/* --- MAIN CONTAINER (BENTO STYLE) --- */}
        {/* UBAH 2: Background Kartu (Putih vs Hitam Pekat) & Border */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group shadow-xl dark:shadow-none transition-colors duration-300">
           
           {/* Decorative Glow */}
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/20 transition duration-700"></div>

           <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
              
              {/* KIRI: CTA & BRANDING */}
              <div className="md:w-1/2 space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                       Let’s ruin something <br />
                       <span className="font-serif italic text-slate-500 dark:text-slate-400">unforgiven.</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-500 text-lg">
                       Punya ide gila? Menjauhlah, kau terlalu gila.
                    </p>
                 </div>

                 {/* Interactive Email Button */}
                 {/* UBAH 3: Warna tombol email & hover state */}
                 <div 
                    onClick={handleCopy}
                    className="inline-flex items-center gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 hover:border-cyan-500/30 transition-all group/email w-full md:w-auto"
                 >
                    <div className="p-2 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400">
                       <Mail size={24} />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Drop me a line</p>
                       <p className="text-lg font-mono text-slate-900 dark:text-white">phfikri01@gmail.com</p>
                    </div>
                    <div className="text-slate-400 dark:text-slate-500 group-hover/email:text-slate-900 dark:group-hover/email:text-white transition">
                       {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </div>
                 </div>
              </div>

              {/* KANAN: LINKS NAVIGATION */}
              <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-8">
                 {footerLinks.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                       <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{section.title}</h4>
                       <ul className="space-y-3">
                          {section.links.map((link, i) => (
                             <li key={i}>
                                {/* UBAH 4: Warna Link */}
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors flex items-center gap-1 group/link">
                                   {link}
                                   <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                </a>
                             </li>
                          ))}
                       </ul>
                    </div>
                 ))}
              </div>

           </div>

           {/* --- BOTTOM SECTION (SOCIALS & COPYRIGHT) --- */}
           <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Logo / Brand */}
              <div className="flex items-center gap-2">
                 {/* UBAH 5: Warna Logo (Hitam di Siang, Putih di Malam) */}
                 <div className=" text-black dark:text-white p-1.5 rounded-lg transition-colors">
                    <Code2 size={16} />
                 </div>
                 <span className="font-bold text-lg text-slate-900 dark:text-white">Fahrin Hadi Fikri</span>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                 {socialLinks.map((social, idx) => (
                    <a 
                       key={idx} 
                       href={social.href}
                       target="_blank" 
                       rel="noopener noreferrer"
                       // UBAH 6: Warna Icon Social Media
                       className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 border border-slate-200 dark:border-white/5 hover:scale-110"
                    >
                       {social.icon}
                    </a>
                 ))}
              </div>

              {/* Copyright */}
              <div className="text-slate-500 text-sm flex items-center gap-1">
                 <span>© 2026. Built with</span>
                 <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
                 <span>(ChadGPT) and React.</span>
              </div>

           </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;