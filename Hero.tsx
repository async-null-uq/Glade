import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, Phone } from 'lucide-react';

export const Navbar = () => {
  // ... (keep Navbar as is, it's fine)
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  );
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(241, 245, 249, 1)']
  );
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 1)', 'rgba(15, 23, 42, 1)']
  );

  return (
    <motion.nav 
      style={{ backgroundColor, backdropBlur, borderBottomColor: borderOpacity }}
      className="fixed top-0 left-0 right-0 z-50 transition-all border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <motion.span 
              style={{ color: textColor }}
              className="text-2xl font-display font-bold tracking-tighter"
            >
              Glade.
            </motion.span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <motion.a style={{ color: textColor }} href="#" className="text-sm font-medium hover:text-accent transition-colors">Home</motion.a>
            <motion.a style={{ color: textColor }} href="#properties" className="text-sm font-medium hover:text-accent transition-colors">Properties</motion.a>
            <motion.a style={{ color: textColor }} href="#services" className="text-sm font-medium hover:text-accent transition-colors">Services</motion.a>
            <motion.a style={{ color: textColor }} href="#agents" className="text-sm font-medium hover:text-accent transition-colors">Agents</motion.a>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              style={{ color: textColor }}
              className="flex items-center gap-3 font-display font-bold"
            >
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Call Us</span>
                <span className="text-sm md:text-base font-bold tracking-tight">+91 9900 8877 665</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface HeroProps {
  onSearch: (filters: { location: string; type: string; priceRange: string }) => void;
  resultCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, resultCount }) => {
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const handleSearch = () => {
    onSearch({ location, type, priceRange });
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center pt-20 overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Villa"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/60 to-brand/20 backdrop-brightness-75" />
      </div>
      
      <div className="section-container relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1]"
          >
            Find Your Dream Property <br />
            <span className="text-accent">with Confidence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200 mb-12 max-w-xl"
          >
            We help you find the perfect place that suits your personality and lifestyle. 
            Discover modern homes in prime locations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 rounded-3xl md:flex items-center gap-4 max-w-5xl"
          >
            <div className="flex-1 p-3 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Location</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent font-medium border-none focus:ring-0 p-0 text-sm"
              >
                <option value="All">All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
            
            <div className="flex-1 p-3 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-transparent font-medium border-none focus:ring-0 p-0 text-sm"
              >
                <option value="All">All Types</option>
                <option value="Modern">Modern Villa</option>
                <option value="Luxury">Luxury Apartment</option>
                <option value="Classic">Heritage/Classic</option>
                <option value="Minimalist">Minimalist</option>
              </select>
            </div>
            
            <div className="flex-1 p-3 flex flex-col">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-transparent font-medium border-none focus:ring-0 p-0 text-sm"
              >
                <option value="All">Any Price</option>
                <option value="0-5">₹0 - ₹5 Cr</option>
                <option value="5-10">₹5 Cr - ₹10 Cr</option>
                <option value="10+">₹10 Cr+</option>
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-brand text-white p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-bold">Search</span>
                <span className="text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">{resultCount} results</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

