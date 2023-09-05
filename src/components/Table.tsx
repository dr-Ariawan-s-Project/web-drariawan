import React from 'react';
import { faker } from '@faker-js/faker';
import { useTable } from 'react-table';

const Table = () => {
  const data: any = React.useMemo(() => {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
      fakeData.push({
        col1: faker.name.firstName(),
        col2: faker.name.jobTitle(),
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
      <thead className="font-semibold bg-gray-100 h-14">
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
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="p-2">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
