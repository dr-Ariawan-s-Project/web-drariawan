import { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import faker from '@faker-js/faker'

import { usePatient } from '../../store/apiPatient';
import { PatientState } from '../../utils/api';

const TableRow: React.FC<{ data: PatientState['data'][0]; index: number }> = ({
  data,
  index,
}) => (
  <tr className="border-b text-left">
    <td className="p-2">{index + 1}</td>
    <td className="p-2">{data.name}</td>
    <td className="p-2">{data.email}</td>
    <td className="p-2">{data.phone}</td>
    <td className="p-2">{data.partner_id}</td>
    <td className="p-2">{data.partner?.id}</td>
    <td className="p-2">
      <div className="flex items-center justify-center gap-x-2">
        <TrashIcon className="cursor-pointer" width={20} height={20} />
        <PencilIcon className="cursor-pointer" width={20} height={20} />
      </div>
    </td>
  </tr>
);

const ListPasien = () => {
  const [page, setPage] = useState<number>(0);
  const { data: patients, getPatient } = usePatient();

  useEffect(() => {
    getPatient();
  }, [getPatient]);
  const data: any = React.useMemo(() => {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
      const tanggalPraktik = faker.date.weekday();
      fakeData.push({
        col1: faker.person.firstName(),
        col4: faker.person.firstName(),
        col5: tanggalPraktik,
      });
    }
    return fakeData;
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mt-2 md:mt-20 lg:mt-20">
        <div className="overflow-x-auto">
          <table className="shadow-lg min-w-full">
            <thead className="font-semibold bg-health-blue-reguler text-white h-14">
              <tr>
                <th className="border-b p-2 text-center">No</th>
                <th className="border-b p-2 text-center">Nama</th>
                <th className="border-b p-2 text-center">Email</th>
                <th className="border-b p-2 text-center">Phone</th>
                <th className="border-b p-2 text-center">Partner ID</th>
                <th className="border-b p-2 text-center">Partner's ID</th>
                <th className="border-b p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((rowData, index) => (
                <TableRow key={index} data={rowData} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex md:flex-row justify-center items-center mt-10 gap-5">
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPage(parseInt(e.target.value))
          }
        />
        <button
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListPasien;
