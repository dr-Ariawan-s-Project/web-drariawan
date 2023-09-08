import React from 'react';

export interface ButtonProps {
  id: string;
  type: 'blue' | 'red';
  active?: boolean;
  label?: string;
  onClick?: () => void;
}

export interface InputProps {
  id: string;
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: () => void;
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
  onSave?: (blob: Blob) => void;
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
