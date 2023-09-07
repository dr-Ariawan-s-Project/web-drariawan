import { LoginResponse, LogoutResponse, ActionResponse } from "./data"

export const login : LoginResponse = {
    title: "Berhasil Login",
    text: `Selamat datang`,
    icon: 'success',
    confirmButtonColor: '#004A7C',
    confirmButtonText: "OK"
}

export const logout: LogoutResponse = {
    title: 'Logout',
    text: 'Apakah kamu ingin logout?',
    showCancelButton: true,
    icon: 'warning',
    confirmButtonText: 'Logout',
    confirmButtonColor: '#004A7C',
    cancelButtonText: 'Batal',
    reverseButtons: true,
    isConfirmed: {
        title: 'Sukses Logout',
        confirmButtonColor: '#004A7C',
    }
}

export const createData: ActionResponse = {
    success: {
        title: "Berhasil Menambahkan Data",
        text: "Sukses",
        icon: 'success',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
    },
    failed: {
        title: "Gagal Menambahkan Data",
        text: "Gagal",
        icon: 'error',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK" 
    }
}

export const updateData: ActionResponse = {
    success: {
        title: "Berhasil Memperbarui Data",
        text: "Sukses",
        icon: 'success',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
    },
    failed: {
        title: "Gagal Memperbarui Data",
        text: "Gagal",
        icon: 'error',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK" 
    }
}

export const deleteData: ActionResponse = {
    success: {
        title: "Berhasil Menghapus Data",
        text: "Sukses",
        icon: 'success',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK"
    },
    failed: {
        title: "Gagal Menghapus Data",
        text: "Gagal",
        icon: 'error',
        confirmButtonColor: '#004A7C',
        confirmButtonText: "OK" 
    }
}