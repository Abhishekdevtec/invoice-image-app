import { useEffect, useState } from "react";
import { getInvoices } from "../api";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="relative overflow-x-auto max-w-7xl mx-auto p-8 w-full">
      <h1 className="font-bold text-4xl mb-6 text-gray-800">Invoices</h1>

      <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Invoice</th>
            <th scope="col" className="px-6 py-3">Company Name</th>
            <th scope="col" className="px-6 py-3">Check</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {invoice.number}
              </td>
              <td className="px-6 py-4">{invoice.company?.name || "No Company"}</td>
              <td className="px-6 py-4">
                {invoice.checks && invoice.checks.length > 0
                  ? invoice.checks[0].number
                  : "No Checks"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
