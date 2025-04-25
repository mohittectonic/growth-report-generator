// Format numbers to K, M notation
export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toFixed(0);
};

// Get color based on value trend
export const getChangeColor = (value, colors) => {
  if (value > 0) return colors.positive;
  if (value < 0) return colors.negative;
  return colors.neutral;
};

// Format percentage with + prefix for positive values
export const formatPercentage = (value) => {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
};
