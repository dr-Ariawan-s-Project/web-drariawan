import React, { InputHTMLAttributes } from 'react';

export interface ButtonProps {
  id: string;
  type: 'blue' | 'red';
  active?: boolean;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface CircleButtonProps {
  id: string;
  label?: any;
  onClick?: () => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  value?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  register?: any;
  error?: string;
  onChange?: (e?: any) => void;
}

export interface RadioButtonProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

export interface ModalProps {
  id: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface LoadingProps {
  id: string;
  isOpen?: boolean;
  title?: string;
}

export interface CardProps {
  id: string;
  type?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

export interface ProgressBarProps {
  value: number;
  maxValue: number;
  type?: 'primary' | 'secondary';
}

export interface VideoPlayerProps {
  src?: string;
}

export interface AudioRecorderProps {
  isRecording: boolean;
  handleReset: () => void;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

export interface PageInfoProps {
  id: string;
}

export interface ModalInformationProps {
  id?: string;
  message?: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
export interface PatientDataProps {
  name: string;
  email: string;
  password: string;
  nik: string | number;
  dob: string;
  phone: string | number;
  gender: string;
  marriage_status: string;
  nationality: string;
  partner_option: string;
  partner_email?: string;
  patientId:string
}

export interface LoginFormProps {
  email: string;
  password: string;
  remember: boolean;
}

export interface SearchBarProps {
  onSearch: (searchTerms: string[] | string) => void;
  searchTerm?: string;
  setSearchTerm: (term: string) => void;
}

export interface ScheduleData  {
  user?: UserData;
  scheduleId?: number | undefined; 
  user_id?: number | undefined;
  health_care_address?: string | undefined;
  day?: string | undefined;
  time_start?: string | undefined;
  time_end?: string | undefined;
}

export type UserData = {
  id: number;
  name: string;
  picture: string;
  specialization: string;
};

export interface RespondenDataProps {
  type: string;
  question: string;
  answer: string;
}
export interface DateInfoProps {
  date: string;
  time?: string;
}
export type RoleData = {
  name: string;
  role: string;
  token: string;
};

export interface BookingDataProps {
  id: string;
  booking_code: string;
  bookingId :string;
  patient_id: string;
  schedule_id: number;
  booking_date: string;
  state: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  Patient: PatientDataProps;
  Schedule: ScheduleData;
}