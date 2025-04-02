import React from "react";

const SuccessPage = ({ checkData, onClose }) => {
  const check = checkData.check || {};

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-8">
      <div className="border rounded-lg p-6 shadow-lg w-full sm:w-80 md:w-96 text-center bg-white">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-700">
          {check.company?.name || "Unknown Company"}
          <br />
          Check {check.number || "N/A"} <br />
          Uploaded!
        </h2>

        <div className="text-6xl my-4">😊</div>

        <p className="text-gray-600 text-sm sm:text-base">
          <strong>Invoices</strong>
          <br />
          {check.invoices?.length > 0
            ? check.invoices.map((inv, index) => (
                <span key={inv.id}>
                  {inv.number}
                  {index !== check.invoices.length - 1 && ", "}
                </span>
              ))
            : "No Invoices"}
        </p>
      </div>

      <button
        onClick={onClose}
        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
      >
        Upload New Check
      </button>
    </div>
  );
};

export default SuccessPage;
