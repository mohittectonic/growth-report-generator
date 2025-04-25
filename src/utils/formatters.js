// Format numbers to K, M notation
export const formatNumber = (num) => {
  if (num === undefined || num === null) return "N/A";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toFixed(0);
};

// Get color based on value trend
export const getChangeColor = (value, colors) => {
  if (!value && value !== 0) return colors.neutral;
  if (value > 0) return colors.positive;
  if (value < 0) return colors.negative;
  return colors.neutral;
};

// Format percentage with + prefix for positive values
export const formatPercentage = (value) => {
  // Handle undefined, null, or NaN values
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }

  return `${value > 0 ? "+" : ""}${Number(value).toFixed(2)}%`;
};
