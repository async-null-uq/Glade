import { motion } from 'motion/react';
import { PROPERTIES } from '../data';
import { ArrowUpRight } from 'lucide-react';

export const AwardedWorks = () => {
  const awarded = PROPERTIES.filter(p => p.isAwarded);
  
  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Project</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-brand">Awarded Works</h2>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-slate-200 font-medium hover:bg-slate-50 transition-colors group">
          View All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="grid grid-cols-12 gap-8 h-[700px]">
        {/* Main large item */}
        <div className="col-span-12 md:col-span-7 relative group overflow-hidden rounded-[3rem]">
          <img 
            src={awarded[0]?.image} 
            alt="Awarded 1"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
            <h3 className="text-3xl font-display font-bold text-white mb-2">{awarded[0]?.title}</h3>
            <p className="text-white/80">{awarded[0]?.location}</p>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-8 h-full">
          <div className="relative group overflow-hidden rounded-[3rem]">
            <img 
              src={awarded[1]?.image} 
              alt="Awarded 2"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 glass-card m-6 rounded-3xl translate-y-full group-hover:translate-y-0 transition-transform">
               <h3 className="font-display font-bold">{awarded[1]?.title}</h3>
               <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Award Winner 2024</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[3rem]">
            <img 
              src={awarded[2]?.image} 
              alt="Awarded 3"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
             <div className="absolute inset-x-0 bottom-0 p-8 glass-card m-6 rounded-3xl translate-y-full group-hover:translate-y-0 transition-transform">
               <h3 className="font-display font-bold">{awarded[2]?.title}</h3>
               <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Modern Design Award</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter text-brand">Glade.</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              Providing modern architectural excellence and superior real estate services since 2014.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand mb-6 uppercase text-sm tracking-widest">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="nav-link">About Us</a></li>
              <li><a href="#" className="nav-link">Our Agents</a></li>
              <li><a href="#" className="nav-link">Careers</a></li>
              <li><a href="#" className="nav-link">Services</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-bold text-brand mb-6 uppercase text-sm tracking-widest">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="nav-link">Privacy Policy</a></li>
              <li><a href="#" className="nav-link">Terms of Service</a></li>
              <li><a href="#" className="nav-link">Cookie Policy</a></li>
              <li><a href="#" className="nav-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-brand mb-6 uppercase text-sm tracking-widest">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-6 font-sans">Subscribe to get the latest listings.</p>
            <div className="flex p-2 bg-white rounded-2xl border border-slate-200">
              <input type="email" placeholder="Email Address" className="flex-1 bg-transparent border-none text-sm px-4 focus:ring-0" />
              <button className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400">© 2026 Glade Real Estate. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-accent transition-colors">FB</a>
            <a href="#" className="text-slate-400 hover:text-accent transition-colors">TW</a>
            <a href="#" className="text-slate-400 hover:text-accent transition-colors">IG</a>
            <a href="#" className="text-slate-400 hover:text-accent transition-colors">LI</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
