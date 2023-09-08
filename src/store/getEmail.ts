import { EmailState } from '../utils/email';
import { create } from 'zustand';

export const useEmailStore = create<EmailState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));
