import Swal from "sweetalert2";

export const useSwalData = (type: 'success' | 'failed', data?: string ) => {
    type === 'success' ?
    Swal.fire({
        title: `Berhasil ${data}`,
        text: `Sukses ${data}`,
        icon: 'success',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
      }) : 
      Swal.fire({
        title: `Gagal ${data}`,
        text: `Ada kesalahan dalam ${data}`,
        icon: 'error',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
      }) 
}