const ListResponden = () => {
  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow text-start">
      <div className="relative bg-white shadow-lg rounded-2xl px-10 py-4">
        <h1 className="py-10 font-lato-bold">List Responden</h1>
        <div className="relative overflow-x-auto overflow-y-scroll pr-10 ">
          <table className="w-full table-auto text-sm ">
            <thead className="border-b font-medium border-neutral-300">
              <tr>
                <th className="px-5">No</th>
                <th>Name</th>
                <th>Email</th>
                <th className="px-5">Date Record</th>
                <th className="px-5">Detail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td>John Doe</td>
                <td>johndoe@example.com</td>
                <td>2023-10-23</td>
                <td className="text-center">
                  <a href="#">View</a>
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center  ml-4"
                  >
                    Approved
                  </button>
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-center">2</td>
                <td>Jane Smith</td>
                <td>janesmith@example.com</td>
                <td>2023-10-24</td>
                <td className="text-center">
                  <a href="#">View</a>
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center  ml-4"
                  >
                    Approved
                  </button>
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-center">3</td>
                <td>Another Name</td>
                <td>another@example.com</td>
                <td>2023-10-25</td>
                <td className="text-center">
                  <a href="#">View</a>
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center ml-4"
                  >
                    Approved
                  </button>
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-center">3</td>
                <td>Another Name</td>
                <td>another@example.com</td>
                <td>2023-10-25</td>
                <td className="text-center">
                  <a href="#">View</a>
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center ml-4"
                  >
                    Approved
                  </button>
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-center">3</td>
                <td>Another Name</td>
                <td>another@example.com</td>
                <td>2023-10-25</td>
                <td className="text-center">
                  <a href="#">View</a>
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center ml-4"
                  >
                    Approved
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListResponden;
