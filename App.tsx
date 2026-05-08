/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar, Hero } from './components/Hero';
import { AboutSection, Services } from './components/ContentSections';
import { FeaturedProperties } from './components/Properties';
import { AwardedWorks, Footer } from './components/FooterAndAwarded';
import { PROPERTIES } from './data';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [filters, setFilters] = useState({ location: 'All', type: 'All', priceRange: 'All' });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(prop => {
      // Location filter (check if prop.location includes the filter string)
      const matchesLocation = filters.location === 'All' || prop.location.toLowerCase().includes(filters.location.toLowerCase());
      
      // Type filter
      const matchesType = filters.type === 'All' || prop.type.toLowerCase().includes(filters.type.toLowerCase());
      
      // Price filter
      let matchesPrice = true;
      if (filters.priceRange !== 'All') {
        const priceNumMatch = prop.price.match(/₹(\d+\.?\d*)/);
        const isCr = prop.price.includes('Cr');
        if (priceNumMatch) {
          const priceVal = parseFloat(priceNumMatch[1]);
          // If it's in Cr, use as is. If it was in L (not in our current data but safety), would divide.
          if (filters.priceRange === '0-5') {
            matchesPrice = priceVal <= 5;
          } else if (filters.priceRange === '5-10') {
            matchesPrice = priceVal > 5 && priceVal <= 10;
          } else if (filters.priceRange === '10+') {
            matchesPrice = priceVal > 10;
          }
        }
      }
      
      return matchesLocation && matchesType && matchesPrice;
    });
  }, [filters]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        id="scroll-progress"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
      />

      <Navbar />
      
      <main>
        <Hero onSearch={setFilters} resultCount={filteredProperties.length} />
        
        <div id="about">
          <AboutSection />
        </div>
        
        <FeaturedProperties properties={filteredProperties} />
        
        <Services />
        
        <AwardedWorks />
      </main>
      
      <Footer />
    </div>
  );
}


