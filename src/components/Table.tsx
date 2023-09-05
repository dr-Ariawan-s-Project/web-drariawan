import React from 'react';
import { faker } from '@faker-js/faker';
import { useTable } from 'react-table';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const Table = () => {
  const data: any = React.useMemo(() => {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
      fakeData.push({
        col1: faker.person.firstName(),
        col2: faker.person.jobTitle(),
      });
    }
    return fakeData;
  }, []);

  const columns: any = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1',
      },
      {
        Header: 'Role',
        accessor: 'col2',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: () => (
          <div className="flex items-center justify-center gap-x-2">
            <TrashIcon className="cursor-pointer" width={20} height={20} />
            <PencilIcon className="cursor-pointer" width={20} height={20} />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="shadow-lg w-full">
      <thead className="font-semibold bg-health-blue-reguler text-white h-14">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="border-b p-2 text-center"
                style={{ width: column.width }}
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
                  style={{ width: cell.column.width }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
