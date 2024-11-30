export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  requirements: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export type ConsultationFormData = Omit<ConsultationRequest, 'id' | 'status' | 'createdAt'>;