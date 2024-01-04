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
  
      const response = await axios.get('/v1/schedule/list', {
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
        '/v1/schedule',
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
  
  putSchedule: async (scheduleId, scheduleData, token) => {
    try {
      set({ loading: true, error: null });
  
      const response = await axios.put(
        `/v1/schedule?id=${scheduleId}`,
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      set({ loading: false, error: null });

      return response.data;
    } catch (error:any) {
      set({
        loading: false,
        error: `Failed to update schedule data: ${error.message}`,
      });
  
      throw error;
    }
  },
  
  
  deleteSchedule: async (id: string, token: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`/v1/user/deactive?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Server response:', response);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error: any) {
      console.error('Error in postDeactivate: ', error.message);
      set({ loading: false, error: 'error deactivate user' });
    }
  },
  
}));
