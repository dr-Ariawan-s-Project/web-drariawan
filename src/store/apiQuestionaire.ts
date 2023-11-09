import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Answer } from '../utils/data';
import { QuestionaireState } from '../utils/api';

const axiosInstance = axios.create({
  baseURL: 'https://drariawan.altapro.online',
});

export const useQuestionaire = create<QuestionaireState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getQuestionaire: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/v1/questioner');
      console.log('Response from API:', response.data);
      set({ data: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching questionaire:', error);
      set({
        loading: false,
        error: 'Terjadi kesalahan saat mengambil data questionaire',
      });
    }
  },

  postQuestionaire: async (code_attempt: string, answer: []) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/v1/questioner', {
        code_attempt: code_attempt,
        answer: answer,
      });
      set({ data: response.data, loading: false });
      console.log('res ', response?.data);
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error post questioner' });
      throw error;
    }
  },
  validateQuestionaire: async (validateData: any) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/v1/questioner/validate', {
        email: validateData.email,
        phone: validateData.phone,
        as: validateData.as,
        partner_email: validateData.partner_email,
      });
      set({ data: response.data, loading: false });
      Cookies.set('code_attempt', response?.data?.data?.code_attempt);
      return response.data;
    } catch (error) {
      set({ loading: false, error: 'error validate questioner' });
      throw error;
    }
  },

  getAttempts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/v1/questioner/attempts');
      console.log('Response from GET attempts:', response.data);
      set({ data: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching attempts:', error);
      set({
        loading: false,
        error: 'Terjadi kesalahan saat mengambil data attempts',
      });
    }
  },
  getAnswers: async (attempt_id: any): Promise<Answer[]> => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/v1/questioner/attempts/${attempt_id}/answers`);
      console.log('Response from GET answers:', response.data);
      set({ data: response.data, loading: false });
      return response.data; 
    } catch (error) {
      console.error('Error fetching attempts:', error);
      set({
        loading: false,
        error: 'Terjadi kesalahan saat mengambil data list all answers',
      });
      throw error; 
    }
  }
  
}));

