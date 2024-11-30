import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    navigate('/consultation');
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80"
          alt="Gaming PC Setup"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="lg:w-2/3">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Craft Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Gaming Experience</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Custom-built gaming PCs tailored to your performance needs and aesthetic preferences. 
            Professional assembly, premium components, lifetime support.
          </p>
          <button 
            onClick={handleBookConsultation}
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Book Free Consultation
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}