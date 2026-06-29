
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({
  data = [],
  column = [],
}) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white shadow-sm">

      <table className="min-w-full border-collapse">

        {/* Table Header */}

        <thead className="sticky top-0 bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>

              <th className="border px-4 py-3 text-left font-semibold whitespace-nowrap">
                Sr. No.
              </th>

              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}

        <tbody>

          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={column.length + 1}
                className="py-8 text-center text-gray-500"
              >
                No Data Available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="
                  even:bg-gray-50
                  hover:bg-blue-50
                  transition-colors
                "
              >
                <td className="border px-4 py-3 whitespace-nowrap">
                  {index + 1}
                </td>

                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border px-4 py-3 whitespace-nowrap"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default DisplayTable;