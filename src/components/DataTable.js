import React from "react";

// Data Table Component
const DataTable = ({ columns, data, getRowStyle }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-3 py-2 whitespace-nowrap text-sm"
                  style={getRowStyle ? getRowStyle(row, column.key) : {}}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
