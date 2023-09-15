import { useState } from 'react';
import Table from '../../components/Table';

const ListPasien = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mt-2 md:mt-2 lg:mt-20">
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
      </div>
    </section>
  );
};

export default ListPasien;
