import React from 'react';
import { Trophy } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';

const testimonials = [
  {
    quote: "The attention to detail and build quality exceeded my expectations. Best gaming PC I've ever owned!",
    author: "Alex Chen",
    role: "Professional Streamer"
  },
  {
    quote: "Customer service was outstanding, and my PC handles everything I throw at it with ease.",
    author: "Sarah Martinez",
    role: "3D Artist"
  },
  {
    quote: "From ordering to delivery, the whole process was smooth and professional. Highly recommended!",
    author: "James Wilson",
    role: "Competitive Gamer"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-400 text-lg">Join hundreds of satisfied customers</p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} className="bg-gray-900 p-8 rounded-xl">
              <Trophy className="h-8 w-8 text-purple-500 mb-4" />
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-purple-400 text-sm">{testimonial.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}