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
      const response = await axios.get('/questionaire');
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error fetching data' });
    }
  },
  postQuestionaire: async (newData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/questionaire', newData);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'Error posting data' });
      throw error;
    }
  },
  validateQuestionaire: async (validateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/questionaire/validate', validateData);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'Error posting data' });
      throw error;
    }
  },
}));
