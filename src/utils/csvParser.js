import Papa from "papaparse";

/**
 * Parses a CSV file and returns the data
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<Array>} - Array of objects representing CSV rows
 */
export const parseCSV = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    const results = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true, // Convert numeric strings to numbers
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(), // Clean up header names
    });

    console.log(`Parsed data from ${filePath}:`, results.data); // Debugging log

    return results.data;
  } catch (error) {
    console.error(`Error parsing CSV file ${filePath}:`, error);
    return [];
  }
};

/**
 * Formats CSV data for specific chart types
 */
export const formatters = {
  // Format data for pie charts
  formatForPieChart: (data, nameKey, valueKey) => {
    return data.map((item) => ({
      name: item[nameKey] || "Unknown",
      value: parseFloat(item[valueKey] || 0),
    }));
  },

  // Format data for executive summary
  formatExecutiveSummary: (data) => {
    return data.map((item) => ({
      metric: item["Metric"] || "Unknown",
      value: formatValue(item["Current Week"] || 0),
      wow: item["WoW Change (%)"] || 0,
      mom: item["MoM Change (%)"] || 0,
    }));
  },

  // Format data for channel/source analysis
  formatChannelData: (data) => {
    return data.map((item) => ({
      source: item["UTM Source"] || "Unknown",
      sessions: item["Sessions"] || 0,
      share: item["% of Total"] || 0,
      conversion: item["Conversion Rate"] || 0,
      revenue: item["Revenue"] || 0,
      rps: item["Revenue per Session"] || 0,
      rpsWow: item["RPS WoW Change (%)"] || 0,
      rpsMom: item["RPS MoM Change (%)"] || 0,
    }));
  },

  // Format data for product categories
  formatCategoryData: (data) => {
    return data.map((item) => ({
      category: item["Category"] || "Unknown",
      revenue: item["Revenue"] || 0,
      share: item["% of Total"] || 0,
      wow: item["Revenue WoW Change (%)"] || 0,
      mom: item["Revenue MoM Change (%)"] || 0,
    }));
  },

  // Format data for device platform
  formatDeviceData: (data) => {
    return data.map((item) => ({
      device: item["OS"] || "Unknown",
      sessions: item["Sessions"] || 0,
      share: item["% of Total"] || 0,
      conversion: item["Conversion Rate"] || 0,
      revenue: item["Revenue"] || 0,
      rps: item["Revenue per Session"] || 0,
      rpsWow: item["RPS WoW Change (%)"] || 0,
      rpsMom: item["RPS MoM Change (%)"] || 0,
    }));
  },

  // Format data for platform (event source)
  formatPlatformData: (data) => {
    return data.map((item) => ({
      platform: item["Event Source"] || "Unknown",
      sessions: item["Sessions"] || 0,
      share: item["% of Total"] || 0,
      conversion: item["Conversion Rate"] || 0,
      revenue: item["Revenue"] || 0,
      rps: item["Revenue per Session"] || 0,
      rpsWow: item["RPS WoW Change (%)"] || 0,
      rpsMom: item["RPS MoM Change (%)"] || 0,
    }));
  },

  // Format data for conversion funnel
  formatConversionFunnel: (data) => {
    return data.map((item) => ({
      stage: item["Metrics"] || "Unknown",
      value: item["Drop off Rate (%)"] || 0,
      wow: item["WoW Change (%)"] || 0,
      mom: item["MoM Change (%)"] || 0,
    }));
  },
};

// Helper function to format values with currency symbol or percentage based on content
function formatValue(value) {
  if (typeof value === "number") {
    // Check if it's a percentage
    if (value <= 100 && value.toString().includes(".")) {
      return `${value}%`;
    }
    // Format as currency if it's a large number
    else if (value > 100) {
      return `₹${value.toLocaleString()}`;
    }
    // Otherwise, just return the number
    return value.toString();
  }
  return value;
}
