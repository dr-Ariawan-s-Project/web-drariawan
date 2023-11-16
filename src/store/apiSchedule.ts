import { create } from 'zustand';
import axios from 'axios';
import { ScheduleState } from '../utils/api';
import { ScheduleData } from '../utils/component';

export const useSchedule = create<ScheduleState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getSchedules: async (token: string) => {
    try {
      set({ loading: true, error: null, data: [] });
  
      const response = await axios.get('https://drariawan.altapro.online/v1/schedule/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ data: response.data.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve Schedule data: ${error.message}`,
      });
    }
  },

  postSchedule: async (scheduleData: ScheduleData, token: string) => {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.post(
        'https://drariawan.altapro.online/v1/schedule',
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        set({ data: response.data, loading: false, error: null });
      } catch (error: any) {
      set({
        loading: false,
        error: `Failed to post schedule data: ${error.message}`,
      });
      throw error;
    }
  },
  
  putSchedule: async (scheduleId: number, scheduleData: ScheduleData, token: string) => {
    if (!token) {
      set({
        loading: false,
        error: 'Token is missing. Unable to update Schedule data.',
      });
      return;
    }

    set((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    });
    try {
      const response = await axios.put(
        `/v1/schedule?id=${scheduleId}`,
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((prevState) => {
        if (!Array.isArray(prevState.data)) {
          return prevState;
        }
        const updatedData = prevState.data.map((schedule) => {
          if (schedule.id === scheduleId) {
            return response.data;
          }
          return schedule;
        });
        return { ...prevState, data: updatedData, loading: false, error: null };
      });
    } catch (error: any) {
      set((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: `Failed to update schedule data: ${error.message}`,
        };
      });
    }
  },

  deleteSchedule: async (scheduleId: number, token: string) => {
    if (!token) {
      set({
        loading: false,
        error: 'Token is missing. Unable to delete Schedule data.',
      });
      return;
    }

    set((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    });
    try {
      await axios.post(`/v1/schedule/delete?id=${scheduleId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((prevState) => {
        const updatedData = prevState.data.filter(
          (schedule) => schedule.id !== scheduleId
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
          error: `Failed to delete schedule data: ${error.message}`,
        };
      });
    }
  },
}));
