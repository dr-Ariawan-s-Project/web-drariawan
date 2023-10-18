import { create } from 'zustand';
import axios from 'axios';

import { PatientState } from '../utils/api';

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
      console.log('res ', response.data);
      set({ data: [response.data], loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post patient data: ${error.message}`,
      });
      throw error;
    }
  },
  getPatient: async (page: number, limit: number) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/patients', {
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
  postPatient: async (
    name: string,
    email: string,
    password: string,
    nik: string | number,
    dob: string,
    phone: string | number,
    gender: string,
    marriage_status: string,
    nationality: string,
    partner_option: string,
    partner_email: string
  ) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post('/v1/patients', {
        name: name,
        email: email,
        password: password,
        nik: nik,
        dob: dob,
        phone: phone,
        gender: gender,
        marriage_status: marriage_status,
        nationality: nationality,
        partner_option: partner_option,
        partner_email: partner_email,
      });
      set({ data: [response.data], loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post patient data: ${error.message}`,
      });
      throw error;
    }
  },
  putPatient: async (patientId: number, patientData: any) => {
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
            return response.data;
          }
          return patient;
        });

        return { ...prevState, data: updatedData, loading: false, error: null };
      });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to edit patient data: ${error.message}`,
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
