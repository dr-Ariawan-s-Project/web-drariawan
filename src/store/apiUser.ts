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
        set({ loading: false, error: 'Error fetching data' });
      }
    },
    postUser: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/user', data);
          set({ data: response.data, loading: false });
          return response.data;
        } catch (error) {
          set({ loading: false, error: 'Error posting data' });
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
          set({ loading: false, error: 'Error edit data' });
          throw error;
        }
    },
    getList: async() => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get('/user/list');
          set({ data: response.data, loading: false });
        } catch (error) {
          set({ loading: false, error: 'Error fetching data' });
        }
    },
    postDeactivate: async(data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/user/deactivate', data);
          set({ data: response.data, loading: false });
          return response.data;
        } catch (error) {
          set({ loading: false, error: 'Error fetching data' });
        }
    }
  }));