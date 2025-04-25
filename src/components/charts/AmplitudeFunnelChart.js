import React from "react";
import { colors } from "../../utils/colors";

const getDropoffColor = (value) => {
  if (value < 0) return colors.positive;
  if (value > 0) return colors.negative;
  return colors.neutral;
};

// Calculate remaining % at each step from the original cohort
function getFunnelSteps(data) {
  if (!data || data.length === 0) return [];
  let steps = [];
  let remaining = 100;
  steps.push({ ...data[0], remaining });
  for (let i = 1; i < data.length; i++) {
    // Each value is the % of previous step, so multiply down the chain
    remaining = remaining * (data[i].value / 100);
    steps.push({ ...data[i], remaining });
  }
  return steps;
}

const AmplitudeFunnelChart = ({ data }) => {
  const steps = getFunnelSteps(data);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-between space-x-6">
        {steps.map((step, idx) => (
          <React.Fragment key={step.stage}>
            <div className="flex flex-col items-center min-w-[120px]">
              <div
                className="rounded-t-lg shadow-md flex items-end justify-center transition-all duration-300"
                style={{
                  background:
                    colors.chartColors[idx % colors.chartColors.length],
                  width: 80,
                  height: 2 * step.remaining + 40, // visually scale height
                  minHeight: 40,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                <span>{step.remaining.toFixed(2)}%</span>
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
                    color: getDropoffColor(
                      steps[idx + 1].remaining - step.remaining
                    ),
                  }}
                >
                  {Math.abs(
                    ((step.remaining - steps[idx + 1].remaining) /
                      step.remaining) *
                      100
                  ).toFixed(2)}
                  % drop
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
