import { create } from 'zustand';
import Cookies from 'js-cookie';

import { IUserPayload, IAdminPayload } from '../apis/auth/api';

interface AuthState {
  token: string;
  name: string;
  role: string;
  addAuth: (data: IUserPayload & IAdminPayload) => void;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  token: Cookies.get('token') ?? '',
  name: Cookies.get('userName') ?? '',
  role: Cookies.get('userRole') ?? '',
  addAuth: (data) =>
    set(() => {
      Cookies.set('token', data.token, { expires: 1 });
      Cookies.set('userName', data.name, { expires: 1 });
      Cookies.set('userRole', data.role, { expires: 1 });
      return { token: data.token, name: data.name };
    }),
  resetAuth: () =>
    set(() => {
      Cookies.remove('token');
      Cookies.remove('userName');
      Cookies.remove('userRole');
      return { token: '', name: '', role: '' };
    }),
}));

export default useAuthStore;
