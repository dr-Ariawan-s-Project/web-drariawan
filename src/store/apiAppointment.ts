import { create } from 'zustand';
import axios from 'axios';

import { AppointmentState } from '../utils/api';
import { BookingDataProps } from '../utils/component';
export const useAppointment = create<AppointmentState>((set) => ({
  data: [],
  loading: false,
  error: null,

  getListBooking : async function (token: string): Promise<void> {
    set({ loading: true, error: null, data: [] });
    try {
      const response = await axios.get('/v1/booking/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
  
      set({
        data: responseData.data || [],
        loading: false,
        error: null,
      });
    } catch (error:any) {
      console.error('Error fetching appointment data:', error);
  
      set({
        loading: false,
        error: `Failed to retrieve appointment data: ${error.message || 'Unknown error'}`,
        data: [],
      });
    }
  },
  
  putBooking: async (bookingData: BookingDataProps, token: string) => {
    const response = await axios.put(
      `/booking/${bookingData.id}`,
      {
        patient_id: bookingData.Patient.patientId,
        schedule_id: bookingData.scheduleId,
        booking_date: bookingData.bookingDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
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
