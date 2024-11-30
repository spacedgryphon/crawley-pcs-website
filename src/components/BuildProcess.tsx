import React from 'react';
import { Wrench } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Book a free online appointment with our technicians for personalized part recommendations."
  },
  {
    number: "02",
    title: "Build",
    description: "Professional assembly with meticulous cable management and testing."
  },
  {
    number: "03",
    title: "Collection",
    description: "Free collection from our workshop in Crawley at your convenience."
  }
];

export default function BuildProcess() {
  return (
    <section id="process" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Build Process</h2>
          <p className="text-gray-400 text-lg">Simple, transparent, and professional from start to finish</p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} className="relative">
              <div className="bg-gray-800 p-6 rounded-xl h-full">
                <span className="text-5xl font-bold text-purple-500 opacity-50">{step.number}</span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}