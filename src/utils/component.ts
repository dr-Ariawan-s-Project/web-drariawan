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
  id: number;
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
  partner_email: string;
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

export interface ScheduleData {
  schedule_id: number;
  user_id: number;
  health_care_address: string;
  day: string;
  time_start: string;
  time_end: string;
}

export interface UserData {
  id: number;
}
export interface RespondenDataProps {
  type: string;
  question: string;
  answer: string;
}
export interface DateInfoProps {
  date: string;
  time?: string;
}
