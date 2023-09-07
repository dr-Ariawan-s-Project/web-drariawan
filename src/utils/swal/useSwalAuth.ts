import Swal from "sweetalert2";

export const useSwalAuth = (type: 'login' | 'logout', data?: string ) => {
    type === 'login' ?
    Swal.fire({
        title: 'Berhasil Login',
        text: `Selamat datang, ${data}!`,
        icon: 'success',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
      }) : 
      Swal.fire({
        title: 'Logout',
        text: 'Apakah kamu ingin logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        confirmButtonColor: '#004A7C',
        cancelButtonText: 'Batal',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Sukses Logout',
            icon: 'success',
            confirmButtonColor: '#004A7C',
          })
        }
      })
}