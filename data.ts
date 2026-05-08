export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Minimalist' | 'Modern' | 'Luxury' | 'Classic';
  sqft: number;
  beds: number;
  baths: number;
  image: string;
  isAwarded?: boolean;
  youtubeUrl?: string;
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Marine Drive Pearl',
    price: '₹24.5 Cr',
    location: 'Marine Drive, Mumbai',
    type: 'Luxury',
    sqft: 3200,
    beds: 4,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Himalayan Retreat',
    price: '₹3.2 Cr',
    location: 'Mall Road, Shimla',
    type: 'Classic',
    sqft: 4200,
    beds: 4,
    baths: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Tech Enclave Villa',
    price: '₹5.8 Cr',
    location: 'Whitefield, Bangalore',
    type: 'Modern',
    sqft: 3500,
    beds: 3,
    baths: 3,
    image: 'https://i.pinimg.com/1200x/89/22/4d/89224d691cb744e848827979387c571a.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '4',
    title: 'Heritage Palace',
    price: '₹12.0 Cr',
    location: 'Civil Lines, Jaipur',
    type: 'Classic',
    sqft: 6800,
    beds: 5,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    isAwarded: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '5',
    title: 'Green Valley Residency',
    price: '₹1.85 Cr',
    location: 'New Town, Kolkata',
    type: 'Modern',
    sqft: 2000,
    beds: 3,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '6',
    title: 'Lutyens Leaf',
    price: '₹45.0 Cr',
    location: 'Golf Links, Delhi',
    type: 'Luxury',
    sqft: 8200,
    beds: 6,
    baths: 7,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '7',
    title: 'Seaside Serenity',
    price: '₹15.5 Cr',
    location: 'Juhu, Mumbai',
    type: 'Modern',
    sqft: 4800,
    beds: 4,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    isAwarded: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '8',
    title: 'Cyber City Heights',
    price: '₹4.2 Cr',
    location: 'DLF Phase 5, Gurgaon',
    type: 'Modern',
    sqft: 2800,
    beds: 3,
    baths: 3,
    image: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '9',
    title: 'Royal Palms Estate',
    price: '₹8.9 Cr',
    location: 'Banjara Hills, Hyderabad',
    type: 'Luxury',
    sqft: 5500,
    beds: 5,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    isAwarded: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '10',
    title: 'Lake View Mansion',
    price: '₹6.5 Cr',
    location: 'Anna Nagar, Chennai',
    type: 'Modern',
    sqft: 3600,
    beds: 4,
    baths: 3,
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800',
    isAwarded: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

export const SERVICES = [
  {
    title: 'Buy Property',
    description: 'Find homes perfectly tailored to your lifestyle, preferences, and budget with expert guidance every step.',
    icon: 'Search',
  },
  {
    title: 'Sell Property',
    description: 'Maximize your property\'s value and find the right buyers through our strategic marketing and broad network.',
    icon: 'Home',
  },
  {
    title: 'Rent Property',
    description: 'Discover the perfect rental that fits your needs, from short-term stays to long-term residency options.',
    icon: 'Key',
  },
];
