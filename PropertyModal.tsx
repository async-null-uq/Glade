import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Bed, Bath, Move, CheckCircle2, Youtube, User, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { Property } from '../data';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [view, setView] = useState<'details' | 'form' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: 'Book Site Visit',
    timeline: 'Within 1 month'
  });

  if (!property) return null;

  const handleClose = () => {
    setView('details');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          data: {
            ...formData,
            propertyTitle: property.title,
            propertyLocation: property.location,
            propertyPrice: property.price
          }
        })
      });
    } catch (err) {
      console.error('Failed to send notification:', err);
    }

    setView('success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-brand/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh]"
        >
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Left: Image (Dynamic sizing) */}
          <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Right: Content Area */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
            <AnimatePresence mode="wait">
              {view === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                      {property.type}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl font-display font-bold text-brand mb-2">{property.title}</h2>
                  <div className="flex items-center gap-2 text-slate-500 mb-8">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Move className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Area</span>
                      </div>
                      <span className="text-lg font-bold leading-tight">{property.sqft} <small className="text-slate-400 font-normal">Sqft</small></span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Bed className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Beds</span>
                      </div>
                      <span className="text-lg font-bold leading-tight">{property.beds}</span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Bath className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Baths</span>
                      </div>
                      <span className="text-lg font-bold leading-tight">{property.baths}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Asking Price</p>
                        <p className="text-3xl font-display font-bold text-brand">{property.price}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {property.youtubeUrl && (
                        <a 
                          href={property.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-700 transition-all active:scale-95 group shadow-xl shadow-red-600/10"
                        >
                          <Youtube className="w-5 h-5" />
                          <span>YouTube Home Tour</span>
                        </a>
                      )}

                      <button 
                        className="w-full py-4 bg-brand text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 group shadow-xl shadow-brand/10"
                        onClick={() => setView('form')}
                      >
                        <span>Confirm Inquiry</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-3xl font-display font-bold text-brand mb-2">Request Inquiry</h3>
                  <p className="text-slate-500 mb-8">Please fill in your details to express interest in {property.title}.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Mobile Number
                      </label>
                      <input 
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" /> You are looking for?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {['Book Site Visit', 'Speak to Agent Today', 'Get Best Price'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({...formData, intent: option})}
                            className={`p-4 text-left rounded-xl border transition-all ${
                              formData.intent === option 
                                ? 'bg-accent/5 border-accent text-brand font-bold' 
                                : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> When you want to buy?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {['Within 1 month', '1-3 months', '6 months'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({...formData, timeline: time})}
                            className={`p-3 text-sm text-left rounded-xl border transition-all ${
                              formData.timeline === time 
                                ? 'bg-brand/5 border-brand text-brand font-bold' 
                                : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setView('details')}
                        className="flex-1 py-4 font-bold text-slate-400 hover:text-brand transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="flex-[2] py-4 bg-brand text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 s-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-brand mb-4">Request Sent!</h3>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                    Thank you, <span className="text-brand font-bold">{formData.name}</span>! <br />
                    One of our premium agents will contact you at <span className="text-brand font-bold">{formData.phone}</span> shortly to discuss <strong>{property.title}</strong>.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="px-10 py-4 bg-brand text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl"
                  >
                    Back to Listings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
