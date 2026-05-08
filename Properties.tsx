import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property } from '../data';
import { Bed, Bath, Move, ArrowUpRight } from 'lucide-react';
import { PropertyModal } from './PropertyModal';

interface PropertyCardProps {
  property: Property;
  index: number;
  onClick: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(property)}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-brand" />
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-brand mb-1">{property.title}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1">{property.location}</p>
          </div>
          <span className="text-xl font-bold text-brand">{property.price}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Move className="w-4 h-4" />
              <span className="text-xs uppercase font-bold tracking-wider">Sqft</span>
            </div>
            <span className="text-sm font-semibold">{property.sqft}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Bed className="w-4 h-4" />
              <span className="text-xs uppercase font-bold tracking-wider">Bed</span>
            </div>
            <span className="text-sm font-semibold">{property.beds}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Bath className="w-4 h-4" />
              <span className="text-xs uppercase font-bold tracking-wider">Bath</span>
            </div>
            <span className="text-sm font-semibold">{property.baths}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedProperties = ({ properties }: { properties: Property[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <section id="properties" className="section-container">
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Featured</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-brand">Featured Properties</h2>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-slate-200 font-medium hover:bg-slate-50 transition-colors group">
          Explore All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <PropertyCard 
              key={`prop-${property.id}`} 
              property={property} 
              index={index} 
              onClick={setSelectedProperty}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-2xl font-display font-medium text-slate-400 mb-2">No properties found</h3>
            <p className="text-slate-500">Try adjusting your filters to find more properties.</p>
          </div>
        )}
      </div>
    </section>
  );
};

