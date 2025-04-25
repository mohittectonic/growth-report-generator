import React from "react";
import { colors } from "../../utils/colors";

const getDropoffColor = (value) => {
  if (value < 0) return colors.positive;
  if (value > 0) return colors.negative;
  return colors.neutral;
};

const AmplitudeFunnelChart = ({ data }) => {
  // Calculate drop-off between steps
  const steps = data.map((step, idx) => {
    const next = data[idx + 1];
    let dropoff = null;
    if (next) {
      dropoff = step.value - next.value;
    }
    return { ...step, dropoff };
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-between space-x-6">
        {steps.map((step, idx) => (
          <React.Fragment key={step.stage}>
            <div className="flex flex-col items-center min-w-[120px]">
              <div
                className="rounded-t-lg shadow-md flex items-end justify-center"
                style={{
                  background:
                    colors.chartColors[idx % colors.chartColors.length],
                  width: 80,
                  height: 80 + step.value * 1.2, // visually scale height
                  minHeight: 60,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                <span>{step.value.toFixed(2)}%</span>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700 text-center">
                {step.stage}
              </div>
            </div>
            {/* Arrow and drop-off annotation */}
            {idx < steps.length - 1 && (
              <div className="flex flex-col items-center">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                  <path
                    d="M0 12h32l-4-4m4 4l-4 4"
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <div
                  className="text-xs font-semibold mt-1"
                  style={{
                    color: getDropoffColor(steps[idx + 1].value - step.value),
                  }}
                >
                  {Math.abs(step.dropoff).toFixed(2)}% drop
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AmplitudeFunnelChart;
