import { create } from 'zustand';
import Cookies from 'js-cookie';

import { IUserPayload } from '../apis/auth/api';

interface AuthState {
  token: string;
  name: string;
  role: string;
  addAuth: (data: IUserPayload) => void;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  token: '',
  name: '',
  role: '',
  addAuth: (data) =>
    set(() => {
      Cookies.set('token', data.token, { expires: 1 });
      return { token: data.token, name: data.name };
    }),
  resetAuth: () => set(() => ({ token: '', name: '' })),
}));

export default useAuthStore;
