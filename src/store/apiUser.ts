import {create} from 'zustand'
import axios from 'axios'

import { UserState } from '../utils/api'

export const useUser = create<UserState>((set) => ({
    data: [],
    loading: false,
    error: null,
    getUser: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get('/user');
        set({ data: response.data, loading: false });
      } catch (error) {
        set({ loading: false, error: 'error get user' });
      }
    },
    postUser: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/user', data);
          set({ data: response.data, loading: false });
          return response.data;
        } catch (error) {
          set({ loading: false, error: 'error post user' });
          throw error;
        }
    },
    putUser: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.put('/user', data);
          set({ data: response.data, loading: false });
          return response.data;
        } catch (error) {
          set({ loading: false, error: 'error edit user' });
          throw error;
        }
    },
    getList: async() => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get('/user/list');
          set({ data: response.data, loading: false });
        } catch (error) {
          set({ loading: false, error: 'error get user list' });
        }
    },
    postDeactivate: async(data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/user/deactivate', data);
          set({ data: response.data, loading: false });
          return response.data;
        } catch (error) {
          set({ loading: false, error: 'error deactivate user' });
        }
    }
  }));