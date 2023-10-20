import { create } from 'zustand';
import axios from 'axios';

import { UserState } from '../utils/api';

export const useUser = create<UserState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getUser: async (page: number, limit: number) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/user?id=', {
        params: { page, limit },
      });
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve User data: ${error.message}`,
      });
    }
  },
  postUser: async (data) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post('/v1/user', data);
      set({ data: [...response.data], loading: false, error: null });
      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post User data: ${error.message}`,
      });
      throw error;
    }
  },
  putUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put('/v1/user?id=', data);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error edit user' });
      throw error;
    }
  },
  getList: async (page: number, rp: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/user/list', {
        params: { search: '', page, rp },
      });
      set({ data: response.data.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve User list: ${error.message}`,
      });
    }
  },

  postDeactivate: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/v1/user/deactive?id=', data);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error deactivate user' });
    }
  },
}));
