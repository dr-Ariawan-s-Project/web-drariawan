import { create } from 'zustand';
import axios from 'axios';

import { UserState } from '../utils/api';

export const useUser = create<UserState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getUser: async (page: number, limit: number, token: string) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/user', {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve User data: ${error.message}`,
      });
    }
  },
  
  postUser: async (data, token) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post('/v1/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  putUser: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put('/v1/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error edit user' });
      throw error;
    }
  },
  
  getList: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/user/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: '',
          rp: 10,
          page: 1,
        },
      });
      set({ data: response.data.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Gagal mengambil daftar Pengguna: ${error.message}`,
      });
    }
  },
  
  
  postDeactivate: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/v1/user/deactivate', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error deactivate user' });
    }
  },
  
}));
