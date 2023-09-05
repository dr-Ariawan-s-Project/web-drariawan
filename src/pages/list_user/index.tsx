import { useState } from 'react';
import Table from '../../components/Table';

const ListUser = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="w-screen">
      <div className="ml-60 mr-5">
        <div className="flex justify-center gap-x-5 my-5">
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
            className="w-20 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none  rounded-md text-white font-semibold flex items-center justify-center"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        <Table />
      </div>
    </section>
  );
};

export default ListUser;
