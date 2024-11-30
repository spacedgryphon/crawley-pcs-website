import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Monitor, Settings } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
}

export default function Navbar({ isAdmin }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto px-6 h-16 rounded-2xl bg-gray-900/50 backdrop-blur-lg border border-gray-800/20 shadow-lg">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center">
            <Monitor className="h-8 w-8 text-purple-500" />
            <span className="ml-2 text-xl font-bold text-white">Crawley PC's</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#process" className="text-gray-300 hover:text-purple-400 transition-colors">
              Our Process
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors">
              Testimonials
            </a>
            
            <Link
              to="/consultation"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              Book Consultation
            </Link>

            <Link
              to={isAdmin ? "/admin" : "/admin/login"}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Admin Dashboard"
            >
              <Settings className="h-5 w-5 text-gray-400 hover:text-purple-400" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}