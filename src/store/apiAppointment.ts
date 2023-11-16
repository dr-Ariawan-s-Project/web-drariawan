import { create } from 'zustand';
import axios from 'axios';

import { AppointmentState } from '../utils/api';
import { BookingDataProps } from '../utils/component';
export const useAppointment = create<AppointmentState>((set) => ({
  data: [],
  loading: false,
  error: null,

  getListBooking: async (token: string): Promise<void> => {
    set({ loading: true, error: null, data: [] });

    try {
      const response = await axios.get('/v1/booking/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      set({ data: responseData.data || [], loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve appointment data: ${error.message}`,
        data: [],
      });
    }
  },

  putBooking: async (bookingId: string, bookingData: BookingDataProps, token: string): Promise<void> => {
    set({ loading: true, error: null });

    try {
      const response = await axios.put(`/v1/booking/${bookingId}`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((prevState) => ({
        ...prevState,
        data: prevState.data.map((booking) => (booking.id === bookingId ? response.data : booking)),
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data.message || error.message;
      set({
        loading: false,
        error: `Failed to edit appointment data: ${errorMessage}`,
        data: [],
      });
      throw error;
    }
  },

  getBookingById: async (bookingId: string, token: string): Promise<BookingDataProps | null> => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`/v1/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ data: response.data ? [response.data] : [], loading: false, error: null });
      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: `Failed to retrieve appointment data: ${error.message}`,
        data: [],
      });
      throw error;
    }
  },

  deleteBooking: async (bookingId: string, token: string): Promise<void> => {
    set((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    try {
      await axios.delete(`/v1/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((prevState) => ({
        ...prevState,
        loading: false,
        error: null,
        data: prevState.data.filter((booking) => booking.id !== bookingId),
      }));
    } catch (error: any) {
      set((prevState) => ({
        ...prevState,
        loading: false,
        error: `Failed to delete appointment data: ${error.message}`,
        data: [],
      }));
    }
  },
}));
