import { ConsultationRequest } from '../types/consultation';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'consultation_requests';

export const saveConsultation = async (consultation: ConsultationRequest): Promise<void> => {
  try {
    if (supabase) {
      const { error } = await supabase
        .from('consultations')
        .insert([{
          id: consultation.id,
          name: consultation.name,
          email: consultation.email,
          phone: consultation.phone,
          requirements: consultation.requirements,
          date: consultation.date,
          time: consultation.time,
          status: consultation.status,
          created_at: new Date(consultation.createdAt).toISOString()
        }]);
      
      if (error) throw error;
      toast.success('Consultation request submitted successfully!');
    } else {
      saveToLocalStorage(consultation);
      toast.success('Consultation request saved locally!');
    }
  } catch (error) {
    console.error('Failed to save consultation:', error);
    toast.error('Failed to save consultation. Please try again.');
    throw error;
  }
};

export const getConsultations = async (): Promise<ConsultationRequest[]> => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        requirements: row.requirements,
        date: row.date,
        time: row.time,
        status: row.status,
        createdAt: row.created_at
      }));
    }
    return getFromLocalStorage();
  } catch (error) {
    console.error('Failed to fetch consultations:', error);
    toast.error('Failed to load consultations');
    return [];
  }
};

export const updateConsultationStatus = async (
  id: string,
  status: ConsultationRequest['status']
): Promise<void> => {
  try {
    if (supabase) {
      const { error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Status updated successfully');
    } else {
      updateInLocalStorage(id, status);
      toast.success('Status updated locally');
    }
  } catch (error) {
    console.error('Failed to update status:', error);
    toast.error('Failed to update status');
    throw error;
  }
};

// Local storage helpers
const saveToLocalStorage = (consultation: ConsultationRequest): void => {
  const existingData = getFromLocalStorage();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingData, consultation]));
};

const getFromLocalStorage = (): ConsultationRequest[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const updateInLocalStorage = (id: string, status: ConsultationRequest['status']): void => {
  const consultations = getFromLocalStorage();
  const updatedConsultations = consultations.map(consultation => 
    consultation.id === id ? { ...consultation, status } : consultation
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConsultations));
};