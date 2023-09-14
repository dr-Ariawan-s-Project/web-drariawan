import { useState, useRef } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';

import { useSwalCreate } from '../../utils/swal/useSwalData';
import { createUserSchema } from '../../utils/yup/createUser';

import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

const ListUser = () => {
  const [page, setPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      specialization: '',
      role: '',
    },
    validationSchema: createUserSchema,
    onSubmit: (values: any) => {
      values['image'] = selectedImage;
      setIsOpen(false);
      useSwalCreate('success');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <section className="w-screen">
      <div className="lg:ml-60 mr-5 mt-32 flex flex-col gap-y-5">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <button
            className="w-20 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <input
            className="w-20 h-10 p-3 rounded-md border border-health-blue-dark text-center"
            value={page}
            onChange={(e: any) => setPage(e.target.value)}
          />
          <button
            className="w-20 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
          <div className="absolute right-5">
            <button
              className="w-40 h-10 rounded-md font-semibold text-white flex justify-center items-center bg-health-blue-dark border-none focus:outline-none hover:bg-health-blue-reguler cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Add New User
            </button>
          </div>
        </div>
        <Table />
      </div>
      <Modal id="add-new-user" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-max h-max px-10 flex flex-col items-center transition-opacity duration-300 ease-in-out transform">
          <form
            className="w-96 py-32 flex flex-col gap-y-7"
            onSubmit={formik.handleSubmit}
          >
            {selectedImage ? (
              <label
                htmlFor="file-input"
                className="cursor-pointer text-blue-500"
              >
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  className="mx-auto rounded-full w-28 h-28"
                />
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </label>
            ) : (
              <label
                htmlFor="file-input"
                className="cursor-pointer text-blue-500"
              >
                <UserPlusIcon
                  className="mx-auto"
                  color="#004878"
                  width={100}
                  height={100}
                />
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </label>
            )}
            {selectedImage && (
              <button
                className="w-40 h-10 text-health-blue-dark flex justify-center items-center mx-auto focus:outline-none border-none"
                onClick={() => setSelectedImage(null)}
              >
                Remove Photo
              </button>
            )}
            <Input
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              name="name"
              placeholder="Name"
            />
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              name="email"
              placeholder="Email"
            />
            <Input
              value={formik.values.specialization}
              onChange={formik.handleChange}
              id="specialization"
              name="specialization"
              placeholder="Specialization"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pilih Role:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="">Pilih Role</option>
              <option value="dokter">Dokter</option>
              <option value="perawat">Perawat</option>
              <option value="admin">Admin</option>
            </select>
            <button
              className="my-5 w-96 h-10 rounded-md font-semibold text-white flex justify-center items-center bg-health-blue-dark border-none focus:outline-none hover:bg-health-blue-reguler cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default ListUser;
