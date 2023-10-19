import { create } from 'zustand';
import axios from 'axios';
import { ScheduleState } from '../utils/api';
import { ScheduleData, UserData } from '../utils/component';

export const useSchedule = create<ScheduleState>((set) => ({
  data: [],
  loading: false,
  error: null,
  getSchedules: async (page: number, limit: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/v1/schedule/list', {
        params: { page, limit },
      });
      set({ data: response.data.data, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve Schedule data: ${error.message}`,
      });
    }
  },

  postSchedule: async (scheduleData: ScheduleData, selectedUser: UserData) => {
    set((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    });
    try {
      const response = await axios.post(
        `/v1/schedule?id=${selectedUser.id}`,
        scheduleData
      );

      console.log('Response from POST request:', response.data);

      set((prevState) => {
        if (!Array.isArray(prevState.data)) {
          return prevState;
        }
        const updatedData = [...prevState.data, response.data];
        return { ...prevState, data: updatedData, loading: false, error: null };
      });
    } catch (error: any) {
      set((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: `Failed to post Schedule data: ${error.message}`,
        };
      });
      throw error;
    }
  },
  putSchedule: async (scheduleId: number, scheduleData: ScheduleData) => {
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
        scheduleData
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

  deleteSchedule: async (scheduleId) => {
    set((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    });
    try {
      await axios.post(`/v1/schedule/delete?id=${scheduleId}`);
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
