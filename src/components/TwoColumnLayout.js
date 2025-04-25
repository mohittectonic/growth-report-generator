import React from "react";

// Two Column Chart Layout
const TwoColumnLayout = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{leftTitle}</h3>
      {leftContent}
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{rightTitle}</h3>
      {rightContent}
    </div>
  </div>
);

export default TwoColumnLayout;
