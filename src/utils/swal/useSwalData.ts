import Swal from 'sweetalert2';
import { createData, updateData, deleteData } from '../response';

export const useSwalCreate = (type: string, message?: string | null) => {
  if (type === 'success') {
    Swal.fire({
      title: createData.success.title,
      text: createData.success.text,
      icon: createData.success.icon,
      confirmButtonColor: createData.success.confirmButtonColor,
      confirmButtonText: createData.success.confirmButtonText,
    });
  } else if (type === 'failed') {
    Swal.fire({
      title: createData.failed.title,
      text: createData.failed.text + `: ${message}`,
      icon: createData.failed.icon,
      confirmButtonColor: createData.failed.confirmButtonColor,
      confirmButtonText: createData.failed.confirmButtonText,
    });
  }
};

export const useSwalUpdate = (type: string, message?: string | null) => {
  if (type === 'success') {
    Swal.fire({
      title: updateData.success.title,
      text: updateData.success.text,
      icon: updateData.success.icon,
      confirmButtonColor: updateData.success.confirmButtonColor,
      confirmButtonText: updateData.success.confirmButtonText,
    });
  } else if (type === 'failed') {
    Swal.fire({
      title: updateData.failed.title,
      text: updateData.failed.text + `: ${message}`,
      icon: updateData.failed.icon,
      confirmButtonColor: updateData.failed.confirmButtonColor,
      confirmButtonText: updateData.failed.confirmButtonText,
    });
  }
};

export const useSwalDeleteData = (type: string, message?: string | null) => {
  if (type === 'success') {
    Swal.fire({
      title: deleteData.success.title,
      text: deleteData.success.text,
      icon: deleteData.success.icon,
      confirmButtonColor: deleteData.success.confirmButtonColor,
      confirmButtonText: deleteData.success.confirmButtonText,
    });
  } else if (type === 'failed') {
    Swal.fire({
      title: deleteData.failed.title,
      text: deleteData.failed.text + `: ${message}`,
      icon: deleteData.failed.icon,
      confirmButtonColor: deleteData.failed.confirmButtonColor,
      confirmButtonText: deleteData.failed.confirmButtonText,
    });
  }
};
