import React from 'react';
import { Monitor, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Monitor className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">Crawley PC's</span>
            </div>
            <p className="text-gray-400">
              Professional custom PC building service in Crawley, West Sussex.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Build Guide</a></li>
              <li><a href="#" className="hover:text-purple-400">Support</a></li>
              <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@crawleypcs.co.uk
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                01293 123456
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Crawley, West Sussex
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest builds and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Crawley PC's. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}