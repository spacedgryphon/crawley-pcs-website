export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          requirements: string;
          date: string;
          time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Insert: Omit<Database['public']['Tables']['consultations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['consultations']['Insert']>;
      };
    };
  };
}