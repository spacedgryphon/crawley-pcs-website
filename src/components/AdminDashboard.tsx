import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react';
import { ConsultationRequest } from '../types/consultation';
import { getConsultations, updateConsultationStatus } from '../utils/storage';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [filter, setFilter] = useState<ConsultationRequest['status'] | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const { signOut, user } = useAuth();

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      const data = await getConsultations();
      setConsultations(data);
    } catch (error) {
      toast.error('Failed to load consultations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleStatusUpdate = async (id: string, status: ConsultationRequest['status']) => {
    try {
      await updateConsultationStatus(id, status);
      await loadConsultations();
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const filteredConsultations = consultations
    .filter(consultation => filter === 'all' || consultation.status === filter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: ConsultationRequest['status']) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      case 'completed': return 'text-blue-500';
      default: return 'text-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Logged in as {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="mb-8">
          <div className="flex space-x-4">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg ${
                  filter === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredConsultations.map((consultation) => (
            <div key={consultation.id} className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{consultation.name}</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${consultation.email}`} className="hover:text-purple-400">
                        {consultation.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${consultation.phone}`} className="hover:text-purple-400">
                        {consultation.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {consultation.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {consultation.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                    {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <h4 className="font-medium mb-2">Requirements:</h4>
                <p className="text-gray-300 whitespace-pre-wrap">{consultation.requirements}</p>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusUpdate(consultation.id, 'confirmed')}
                    className="flex items-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(consultation.id, 'cancelled')}
                    className="flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(consultation.id, 'completed')}
                    className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredConsultations.length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-xl">
              <p className="text-gray-400">No consultation requests found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}