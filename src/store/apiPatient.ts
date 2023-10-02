import { create } from 'zustand';
import axios from 'axios';

import { PatientState } from '../utils/api';

export const usePatient = create<PatientState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getPatient: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/patients');
      set({ data: response.data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'error get patient' });
    }
  },
  postPatient: async (patientData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/v1/patients', patientData);
      set({ data: [...response.data], loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'error post patient' });
      throw error;
    }
  },
  putPatient: async (patientId, patientData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `/v1/patients/${patientId}`,
        patientData
      );
      set((prevState) => {
        const updatedData = prevState.data.map((patient) => {
          if (patient.id === patientId) {
            return response.data;
          }
          return patient;
        });
        return { data: updatedData, loading: false, error: null };
      });
    } catch (error) {
      set({ loading: false, error: 'error edit patient' });
      throw error;
    }
  },

  getList: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/patients');
      set({ data: response.data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'error get patient list' });
    }
  },
  deletePatient: async (patientId) => {
    set((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    });
    try {
      await axios.delete(`/v1/patients/${patientId}`);
      set((prevState) => {
        const updatedData = prevState.data.filter(
          (patient) => patient.id !== patientId
        );
        return {
          ...prevState,
          data: updatedData,
          loading: false,
          error: null,
        };
      });
    } catch (error) {
      set((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: 'error delete patient',
        };
      });
    }
  },
}));
