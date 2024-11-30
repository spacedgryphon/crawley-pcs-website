import React from 'react';
import { Cpu, Zap, Shield, MapPin } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';

const features = [
  {
    icon: Cpu,
    title: "Premium Components",
    description: "Only the highest quality, carefully selected parts from trusted manufacturers."
  },
  {
    icon: Zap,
    title: "Maximum Performance",
    description: "Optimized builds ensuring peak performance for your specific needs."
  },
  {
    icon: Shield,
    title: "Professional Builders",
    description: "Expert technicians with years of custom PC building experience."
  },
  {
    icon: MapPin,
    title: "Free Local Collection",
    description: "Collect your custom-built PC from our workshop in Crawley at your convenience."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Crawley PC's?</h2>
          <p className="text-gray-400 text-lg">Experience the difference of truly custom PC building</p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} className="bg-gray-900 p-6 rounded-xl hover:transform hover:scale-105 transition-all">
              <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}