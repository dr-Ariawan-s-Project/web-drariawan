import { create } from 'zustand';
import { LoginPayload } from '../apis/auth/api';

interface AuthState {
  token: string;
  name: string;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  token: '',
  name: '',
  addAuth: (data) => set(() => ({ token: data.token, name: data.name })),
  resetAuth: () => set(() => ({ token: '', name: '' })),
}));

export default useAuthStore;
