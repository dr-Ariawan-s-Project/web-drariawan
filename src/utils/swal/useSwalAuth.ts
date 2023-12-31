import { NavigateFunction } from 'react-router-dom';
import Swal from 'sweetalert2';

import { login, logout } from '../response';

export const useSwalAuth = (
  type: 'login' | 'logout',
  data?: string,
  navigate?: NavigateFunction
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (type === 'login') {
      Swal.fire({
        title: login.success.title,
        text: `${login.success.text}, ${data}!`,
        icon: 'success',
        confirmButtonColor: login.success.confirmButtonColor,
        confirmButtonText: login.success.confirmButtonText,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } else {
      Swal.fire({
        title: logout.title,
        text: logout.text,
        icon: logout.icon,
        showCancelButton: logout.showCancelButton,
        confirmButtonText: logout.confirmButtonText,
        confirmButtonColor: logout.confirmButtonColor,
        cancelButtonText: logout.cancelButtonText,
        reverseButtons: logout.reverseButtons,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: logout.isConfirmed.title,
            icon: 'success',
            confirmButtonColor: logout.isConfirmed.confirmButtonColor,
          }).then(() => {
            if (navigate) {
              navigate('/admin/login');
            }
            resolve(true);
          });
        } else {
          resolve(false);
        }
      });
    }
  });
};