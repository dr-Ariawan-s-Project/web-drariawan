import { create } from 'zustand';
import axios from 'axios';

import { AuthState, RoleData } from '../utils/api';

export const useAuth = create<AuthState>((set) => ({
  data: {
    name: '',
    role: '',
    token: '',
  },
  loading: false,
  error: null,
  login: async (email: string, password: string, onSuccess?: (data: RoleData) => void) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password,
      });

      const responseData: RoleData = response.data.data;
      console.log('Login Response:', response.data);
      set({
        data: {
          name: responseData.name,
          role: responseData.role,
          token: responseData.token,
        },
        loading: false,
      });

      if (onSuccess) {
        onSuccess(responseData);
      }
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
