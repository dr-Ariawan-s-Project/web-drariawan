import Swal from 'sweetalert2';
import { login, logout } from '../response';

export const useSwalLogin = (type: 'success' | 'failed', data?: string) => {
  type === 'success'
    ? Swal.fire({
        title: login.success.title,
        text: `${login.success.text}, ${data}!`,
        icon: 'success',
        confirmButtonColor: login.success.confirmButtonColor,
        confirmButtonText: login.success.confirmButtonText,
      })
    : Swal.fire({
        title: login.failed.title,
        text: `${login.failed.text}, ${data}!`,
        icon: 'error',
        confirmButtonColor: login.failed.confirmButtonColor,
        confirmButtonText: login.failed.confirmButtonText,
      });
};

export const useSwalLogout = () => {
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
      });
    }
  });
};
