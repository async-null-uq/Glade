import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROPERTIES } from '../data';
import { ArrowUpRight } from 'lucide-react';
import { SellPropertyModal } from './SellPropertyModal';

export const StatsSection = () => {
  const stats = [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Happy Clients', value: '2,000+' },
    { label: 'Verified Properties', value: '1,500+' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center"
        >
          <span className="text-4xl font-display font-bold text-brand mb-2">{stat.value}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section className="section-container border-b border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent font-sans">About Us</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-brand mb-8 leading-tight">
            We are a full-service property agency helping buyers, sellers, and investors.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
            Our experienced agents blend deep market insight, modern technology, 
            and personalized service to deliver transparent guidance, strong results, 
            and long-term value.
          </p>
          <StatsSection />
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1000" 
              alt="About Glade"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block">
            <p className="text-brand font-medium italic mb-4">
              "Glade helped me find my dream home in less than 2 weeks. The process was seamless!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent" />
              <div>
                <p className="text-sm font-bold">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Home Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const services = [
    { 
      title: 'Buy Property', 
      desc: 'Find homes perfectly tailored to your lifestyle, preferences, and budget.', 
      icon: '🏠',
      action: () => {
        const el = document.getElementById('properties');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      title: 'Sell Property', 
      desc: 'Maximize your property\'s value and find the right buyers through our network.', 
      icon: '🔑',
      action: () => setIsSellModalOpen(true)
    },
    { 
      title: 'Rent Property', 
      desc: 'Discover the perfect rental that fits your needs, from short to long-term.', 
      icon: '📋',
      action: () => alert('Rental services coming soon!')
    },
  ];

  return (
    <section id="services" className="bg-brand py-24">
      <SellPropertyModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
      />
      
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Services</span>
            </div>
            <h2 className="text-5xl font-display font-bold text-white">Our focus is to provide high quality results</h2>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors group">
            Explore All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm flex flex-col"
            >
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{s.desc}</p>
              <button 
                onClick={s.action}
                className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all self-start"
              >
                Read More <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
