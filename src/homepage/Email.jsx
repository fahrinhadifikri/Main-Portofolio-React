import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, Mail, MessageSquare, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Email = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    purpose: 'Project Inquiry',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    // KONFIGURASI EMAILJS
    const serviceID = 'service_25d5pjr'; 
    const templateID = 'template_i21a39q'; 
    const publicKey = '6tD1_lIlU6L-8_EIq'; 

    const templateParams = {
      from_email: formData.email,
      purpose: formData.purpose,
      message: formData.message,
      to_name: "Fahrin",
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        
        setTimeout(() => {
          setStatus('idle');
          setFormData({ email: '', purpose: 'Project Inquiry', message: '' });
          onClose();
        }, 3000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // UBAH 1: Backdrop color (sedikit lebih terang di light mode)
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              // UBAH 2: Background Modal (Putih vs Hitam) & Border
              className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"></div>

              <button 
                onClick={onClose}
                // UBAH 3: Close Button Color
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle size={32} />
                  </div>
                  {/* UBAH 4: Text Success */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400">Terima kasih, saya akan membalas email Anda segera.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  
                  <div className="space-y-1">
                    {/* UBAH 5: Judul Form */}
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Let's Talk</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Ceritakan kebutuhan Anda atau sekadar menyapa.</p>
                  </div>

                  {/* --- INPUT EMAIL --- */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                       <Mail size={14} /> Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      // UBAH 6: Input Field Style (Light vs Dark)
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>

                  {/* --- INPUT PURPOSE --- */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                       <Briefcase size={14} /> Purpose
                    </label>
                    <div className="relative">
                      <select 
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                      >
                        {/* UBAH 7: Option Background (Penting agar dropdown terbaca) */}
                        <option className="bg-white dark:bg-[#111]" value="Project Inquiry">🔥 Project Baru</option>
                        <option className="bg-white dark:bg-[#111]" value="Hiring">💼 Hiring / Fulltime</option>
                        <option className="bg-white dark:bg-[#111]" value="Collaboration">🤝 Kolaborasi</option>
                        <option className="bg-white dark:bg-[#111]" value="Consultation">💡 Konsultasi</option>
                        <option className="bg-white dark:bg-[#111]" value="Other">👋 Sekadar Menyapa</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* --- INPUT MESSAGE --- */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                       <MessageSquare size={14} /> Message
                    </label>
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      placeholder="Ceritakan detail project atau pertanyaan Anda..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                    ></textarea>
                  </div>

                  {/* --- SUBMIT BUTTON --- */}
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    // UBAH 8: Button Color (Tetap kontras di kedua mode)
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95 ${
                        status === 'error' 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-black dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-black'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Sending...
                      </>
                    ) : status === 'error' ? (
                        "Failed. Try Again."
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>

                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Email;