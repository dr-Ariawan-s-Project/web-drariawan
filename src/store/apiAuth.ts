import { create } from 'zustand';
import axios from 'axios';

import { AuthState } from '../utils/api';

export const useAuth = create<AuthState>((set) => ({
  data: [],
  loading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password,
      });
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error: any) {
      set({ loading: false, error: error });
    }
  },
}));
