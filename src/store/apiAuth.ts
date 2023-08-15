import { create } from 'zustand';
import axios from 'axios';

import { AuthState } from '../utils/api';

export const useAuth = create<AuthState>((set) => ({
    data: [],
    loading: false,
    error: null,
    login: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/login', data);
          set({ data: response.data, loading: false });
          return response.data
        } catch (error) {
          set({ loading: false, error: 'error login' });
        }
    }
}))