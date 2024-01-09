export interface IBookPayload {
  patient_id: string;
  schedule_id: number;
  booking_date: string;
}

export interface ISchedule {
  booking: any[];
  day: string;
  health_care_address: string;
  schedule_id: number;
  time_start: string;
  time_end: string;
  user_id: number;
  user: {
    email: string;
    name: string;
    phone: string;
    picture: string;
    specialization: string;
    user_id: number;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IMySchedule {
  booking_code: string;
  booking_date: string;
  id: string;
  patient: {
    email: string;
    name: string;
    patient_id: string;
  };
  patient_id: string;
  schedule: {
    day: string;
    health_care_address: string;
    schedule_id: number;
    time_start: string;
    time_end: string;
    user: {
      id: number;
      name: string;
      picture: string;
      specialization: string;
    };
    user_id: number;
  };
  schedule_id: string;
  state: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
