import { create } from 'zustand';
import axios from 'axios';
import { DashboardState } from '../utils/api';

export const useDashboard = create<DashboardState>((set) => ({
  data: {
    questioner_all: 0,
    questioner_need_assess: 0,
    questioner_this_month: 0,
  },
  loading: false,
  error: null,
  getDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        'https://drariawan.altapro.online/v1/dashboard'
      );
      set({ data: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching Dashboard data:', error);
      set({
        loading: false,
        error: 'Terjadi kesalahan saat mengambil data Dashboard',
      });
    }
  },
}));
