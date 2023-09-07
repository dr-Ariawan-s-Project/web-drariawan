import Swal from "sweetalert2";
import { login, logout } from "../response";

export const useSwalAuth = (type: 'login' | 'logout', data?: string ) => {
    type === 'login' ?
    Swal.fire({
        title: login.title,
        text: `${login.text}, ${data}!`,
        icon: 'success',
        confirmButtonColor: login.confirmButtonColor,
        confirmButtonText: login.confirmButtonText
      }) : 
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
          })
        }
      })
}

