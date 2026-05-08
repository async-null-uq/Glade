import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    price: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'sell',
          data: formData
        })
      });
    } catch (err) {
      console.error('Failed to send notification:', err);
    }

    setView('success');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setView('form');
        setFormData({ name: '', phone: '', location: '', price: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-brand/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl p-8 md:p-12"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {view === 'form' ? (
                <motion.div
                  key="sell-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-3xl font-display font-bold text-brand mb-2">Sell Your Property</h3>
                  <p className="text-slate-500 mb-8">Fill in the details below and we'll help you find the right buyer.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-accent/20 outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Phone Number
                      </label>
                      <input 
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-accent/20 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Location
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Bandra, Mumbai"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-accent/20 outline-none transition-all"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> Expected Price (INR)
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. 5 Cr or 75 L"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-accent/20 outline-none transition-all"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-4 mt-4 bg-brand text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-brand/10"
                    >
                      List My Property
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="sell-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-brand mb-4">Submission Received!</h3>
                  <p className="text-slate-500 mb-10 leading-relaxed">
                    Thank you, <span className="text-brand font-bold">{formData.name}</span>. <br />
                    We've received details for your property in <span className="text-brand font-bold">{formData.location}</span>. One of our senior agents will call you at <span className="text-brand font-bold">{formData.phone}</span> shortly.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="w-full py-4 bg-brand text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
