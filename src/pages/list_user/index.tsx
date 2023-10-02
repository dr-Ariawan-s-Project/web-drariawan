import { useState, useRef } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useSwalCreate } from '../../utils/swal/useSwalData';
import { createUserSchema } from '../../utils/yup/createUser';
import { datas } from '../../datas/circle_button/circle_button.json';

import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import CircleButton from '../../components/CircleButton';

const ListUser = () => {
  const [page, setPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userLabels = datas?.find((item) => item.type === 'user')?.title || [];
  const swalCreate = useSwalCreate();
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mt-2 md:mt-20 lg:mt-20">
        <Table />
      </div>
      <div className="flex  md:flex-row justify-center items-center mt-10 gap-5">
        <button
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <input
          className="w-full md:w-32 h-10 p-3 rounded-sm border border-health-blue-dark text-center"
          type="number"
          value={page}
          onChange={(e: any) => setPage(e.target.valueAsNumber)}
        />
        <button
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        <div className="fixed right-5 bottom-5">
          <CircleButton
            id="add-user"
            label={userLabels}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Modal id="add-new-user" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-max h-max px-10 flex flex-col items-center transition-opacity duration-300 ease-in-out transform">
          <Formik
            initialValues={{
              name: '',
              email: '',
              specialization: '',
              role: '',
            }}
            validationSchema={createUserSchema}
            onSubmit={(values: any) => {
              values['image'] = selectedImage;
              setIsOpen(false);
              swalCreate('success');
            }}
          >
            <Form className="w-96 py-32 flex flex-col gap-y-7">
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                      }
                    }}
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                      }
                    }}
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
              <Field
                as={Input}
                name="name"
                id="name"
                placeholder="Name"
                className="text-gray-700"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                as={Input}
                name="email"
                id="email"
                placeholder="Email"
                className="text-gray-700"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <Field
                as={Input}
                name="specialization"
                id="specialization"
                placeholder="Specialization"
                className="text-gray-700"
              />
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-500"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Choose Role:
              </label>
              <Field
                as="select"
                name="role"
                id="role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Choose Role</option>
                <option value="dokter">Dokter</option>
                <option value="perawat">Perawat</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500"
              />

              <button
                className="my-5 w-96 h-10 rounded-md font-semibold text-white flex justify-center items-center bg-health-blue-dark border-none focus:outline-none hover:bg-health-blue-reguler cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </Modal>
    </section>
  );
};

export default ListUser;
