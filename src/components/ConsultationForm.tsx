import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { ConsultationFormData } from '../types/consultation';
import { saveConsultation } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ConsultationForm() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: '',
    requirements: '',
    date: format(selectedDate, 'yyyy-MM-dd'),
    time: '10:00'
  });

  const availableTimes = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const consultationRequest = {
        ...formData,
        id: crypto.randomUUID(),
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        date: format(selectedDate, 'yyyy-MM-dd')
      };

      await saveConsultation(consultationRequest);
      toast.success('Consultation request submitted! We will contact you shortly to confirm.');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Failed to submit consultation request. Please try again.');
      console.error('Failed to save consultation:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const dateOptions = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Free Consultation</h1>
          <p className="text-gray-400 text-lg">
            Schedule a one-on-one session with our PC building experts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <User className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                      placeholder="07700 900000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Consultation Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <select
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                  >
                    {dateOptions.map((date) => (
                      <option key={date.toISOString()} value={format(date, 'yyyy-MM-dd')}>
                        {format(date, 'EEEE, MMMM d, yyyy')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                    >
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Your Requirements</h2>
              </div>
              
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                placeholder="Tell us about your ideal PC build (budget, primary use, specific requirements, etc.)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Book Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}