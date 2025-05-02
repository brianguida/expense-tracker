"use client";
//dynamically render a table based on expense data passed into it
//imports
import React from "react";
import { api } from "~/trpc/react"; // Import tRPC API client

const Table = () => {
    //fetch expense data with tRPC
    const { data: expenseData, isLoading, error } = api.expense.getAll.useQuery();

    //handle loading
    if(isLoading) return <div>Loading data...</div>;
    if(error) return <div>Error fetching data: {error.message}</div>;

    //define table columns
    const columns = [
        { Header: "Title", accessor: "title" },
        { Header: "Amount", accessor: "amount" },
        { Header: "Date", accessor: "date" },
        { Header: "Category", accessor: "category" },
        { Header: "Payment Method", accessor: "paymentMethod" },
    ];

    return (
        <table className="m-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {column.Header} {/* Render the column header */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenseData?.map((row) => (
                <tr key={row.id}>
                    {columns.map((column, colIndex) => {
                        const cellValue = row[column.accessor as keyof typeof row];
                        return (
                            <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                {cellValue instanceof Date
                                    ? cellValue.toLocaleDateString() // Format Date objects
                                    : cellValue}
                            </td>
                        );
                    })}
                </tr>
            ))}
          </tbody>
        </table>
      );
    };
export default Table;