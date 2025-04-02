import React, { useEffect, useState } from "react";
import { getChecks } from "../api";

const Checks = () => {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChecks = async () => {
      try {
        const data = await getChecks();
        setChecks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChecks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="relative overflow-x-auto max-w-7xl mx-auto p-8 w-full">
      <h1 className="font-bold text-4xl mb-6 text-gray-800">Checks</h1>
      <a
        href="/capture"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        New Check
      </a>
      <table className="w-full text-xl text-left text-gray-500 mt-6">
        <thead className="text-xl text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Company</th>
            <th scope="col" className="px-6 py-3">Check #</th>
            <th scope="col" className="px-6 py-3">Invoices</th>
            <th scope="col" className="px-6 py-3">Image</th>
          </tr>
        </thead>
        <tbody>
          {checks.map((check) => (
            <tr key={check.id} className="bg-white border-b border-gray-200">
              {/* <td className="px-6 py-4">{new Date(check.created_at).toLocaleDateString()}</td> */}
              <td className="px-6 py-4">
                {new Date(check.created_at).toLocaleString("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).replace(",", "")}
              </td>

              <td className="px-6 py-4">{check.company?.name || "N/A"}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{check.number}</td>
              <td className="px-6 py-4">{check.invoices.map(inv => inv.number).join(", ") || "N/A"}</td>
              <td className="px-6 py-4">
                {check.image_url ? (
                  <img
                    src={check.image_url}
                    alt="Check"
                    className="w-16 h-16 rounded-lg shadow"
                  />
                ) : (
                  <span className="text-gray-400 italic">No Image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checks;
