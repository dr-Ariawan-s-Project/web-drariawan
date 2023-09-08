import { create } from 'zustand';
import axios from 'axios';

import { QuestionaireState } from '../utils/api';

export const useQuestionaire = create<QuestionaireState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getQuestionaire: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/questioner');
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: 'error get questioner' });
    }
  },
  postQuestionaire: async (newData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/v1/questioner', newData);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error post questioner' });
      throw error;
    }
  },
  validateQuestionaire: async (validateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        '/v1/questioner/validate',
        validateData
      );
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error validate questioner' });
      throw error;
    }
  },
}));
