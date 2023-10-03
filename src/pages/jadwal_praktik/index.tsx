import React, { useState, useRef } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useTable } from 'react-table';
import { useFormik } from 'formik';
import { UserPlusIcon } from '@heroicons/react/24/solid';

import CircleButton from '../../components/CircleButton';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

import { datas } from '../../datas/circle_button/circle_button.json';

import { createUserSchema } from '../../utils/yup/createUser';
import { useSwalCreate } from '../../utils/swal/useSwalData';

interface DoctorData {
  No: number;
  Dokter: string;
  Email: string;
  Spesialis: string;
  'No Handphone': string;
  'Hari Praktik': string;
  'Jam Praktik': string;
}

const JadwalPraktik = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userLabels = datas?.find((item) => item.type === 'user')?.title || [];
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
  const data: any = React.useMemo(() => {
    const dummyData: DoctorData[] = [
      {
        No: 1,
        Dokter: 'Dokter A',
        Email: 'dokterA@example.com',
        Spesialis: 'Obgyn',
        'No Handphone': '081200000000',
        'Hari Praktik': 'Senin-Jumat',
        'Jam Praktik': '08:00 - 09:00',
      },
      {
        No: 2,
        Dokter: 'Dokter B',
        Email: 'dokterB@example.com',
        Spesialis: 'Obgyn',
        'No Handphone': '081200000001',
        'Hari Praktik': 'Senin-Jumat',
        'Jam Praktik': '08:00 - 09:00',
      },
    ];
    return dummyData;
  }, []);

  const columns: any = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'No',
      },
      {
        Header: 'Dokter',
        accessor: 'Dokter',
      },
      {
        Header: 'Email',
        accessor: 'Email',
      },
      {
        Header: 'Spesialis',
        accessor: 'Spesialis',
      },
      {
        Header: 'No Handphone',
        accessor: 'No Handphone',
      },
      {
        Header: 'Hari Praktik',
        accessor: 'Hari Praktik',
      },
      {
        Header: 'Jam Praktik',
        accessor: 'Jam Praktik',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: () => (
          <div className="flex items-center justify-center gap-x-2 my-4">
            <TrashIcon className="cursor-pointer" width={20} height={20} />
            <PencilIcon className="cursor-pointer" width={20} height={20} />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<DoctorData>({
      columns,
      data,
    });

  return (
    <section>
      <div className="relative overflow-x-auto mt-20">
        <table
          {...getTableProps()}
          className="shadow-lg w-full  min-w-full sm:min-w-max"
        >
          <thead className="font-semibold bg-health-blue-reguler text-white h-14">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border-b p-2 text-center"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b text-left">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-2"
                      style={{ minWidth: '100px' }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="fixed right-5 bottom-5">
        <CircleButton
          id="add-user"
          label={userLabels}
          onClick={() => setIsOpen(true)}
        />
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
              Choose Role:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="">Choose Role</option>
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

export default JadwalPraktik;
