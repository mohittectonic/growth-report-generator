import React from "react";

const ReportHeader = ({ title, subtitle, handleDownloadPdf }) => {
  return (
    <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        <div className="bg-white p-2 rounded-lg">
          <img src="/logo.png" alt="Vaaree Logo" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
