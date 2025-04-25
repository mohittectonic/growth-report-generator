import React from "react";

// Section Container Component
const ReportSection = ({ number, title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full inline-flex items-center justify-center mr-2">
        {number}
      </span>
      {title}
    </h2>
    {children}
  </div>
);

export default ReportSection;
