import { create } from 'zustand';
import axios from 'axios';
import { PatientState } from '../utils/api';
import { PatientDataProps } from '../utils/component';

export const usePatient = create<PatientState>((set) => ({
  data: [],
  loading: false,
  error: null,
  loginPatient: async (email: string, password: string) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post('/v1/patients/login', {
        email: email,
        password: password,
      });
      set({ data: [response.data], loading: false, error: null });
      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post patient data: ${error.message}`,
      });
      throw error;
    }
  },
  getPatient: async (page: number, limit: number, token: string) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
      });
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve patient data: ${error.message}`,
      });
    }
  },

  postPatient: async (patientData: PatientDataProps) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post('/v1/patients', patientData);
      set({ data: [response.data], loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post patient data: ${error.message}`,
      });
      throw error;
    }
  },

  putPatient: async (patientId: number, patientData: PatientDataProps) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `/v1/patients/${patientId}`,
        patientData
      );

      set((prevState) => {
        if (!Array.isArray(prevState.data)) {
          return prevState;
        }

        const updatedData = prevState.data.map((patient) => {
          if (patient.id === patientId) {
            return { ...patient, ...response.data };
          }
          return patient;
        });

        return { ...prevState, data: updatedData, loading: false, error: null };
      });
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;
      set({
        loading: false,
        error: `Failed to edit patient data: ${errorMessage}`,
      });
      throw error;
    }
  },

  getPatientById: async (patientId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/v1/patients/${patientId}`);
      set({ data: [response.data], loading: false, error: null });
      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve patient data: ${error.message}`,
      });
      throw error;
    }
  },

  getList: async () => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/patients');
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve patient list: ${error.message}`,
      });
    }
  },
  deletePatient: async (patientId: number) => {
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
          (patient: { id: number }) => patient.id !== patientId
        );
        return {
          ...prevState,
          data: updatedData,
          loading: false,
          error: null,
        };
      });
    } catch (error: any) {
      set((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: `Failed to delete patient data: ${error.message}`,
        };
      });
    }
  },
}));
