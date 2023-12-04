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

  putBooking : async (bookingId: string, patientId: string, scheduleId: number, bookingDate: string, token: string
  ): Promise<void> => {
    try {
      const response = await axios.put(
        `https://drariawan.altapro.online/v1/booking/${bookingId}`,
        {
          patient_id: patientId,
          schedule_id: scheduleId,
          booking_date: bookingDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  deleteBooking : async (bookingId: string, token: string): Promise<void> => {
    set({ loading: true, error: null, data: [] })
    try {
      await axios.delete(`/v1/booking/delete/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      set({ loading: false, error: null, data: [] });
      console.log('Appointment data deleted successfully.');
    } catch (error:any) {
      console.error(`Failed to delete appointment data: ${error.message}`);
      set({
        loading: false,
        error: `Failed to retrieve appointment data: ${error.message}`,
        data: [],
      });
    }
  }
}));
