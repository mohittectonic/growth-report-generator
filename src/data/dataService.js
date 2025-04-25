import { parseCSV, formatters } from "../utils/csvParser";

// Paths to CSV files
const CSV_PATHS = {
  executiveSummary: "/data/executive_summary.csv",
  conversionFunnel: "/data/conversion_funnel.csv",
  utmSource: "/data/utm_source.csv",
  productCategory: "/data/product_category.csv",
  osFunnel: "/data/os_funnel.csv",
  eventSource: "/data/event_source.csv",
};

/**
 * Data service class for loading and formatting CSV data
 */
class DataService {
  constructor() {
    this.cache = {};
  }

  /**
   * Load data from a CSV file
   * @param {string} key - Key from CSV_PATHS
   * @param {function} formatter - Optional formatter function
   * @returns {Promise<Array>}
   */
  async loadData(key, formatter = null) {
    // Return cached data if available
    if (this.cache[key]) {
      return this.cache[key];
    }

    // Load and parse the CSV file
    const path = CSV_PATHS[key];
    if (!path) {
      console.error(`No CSV path defined for key: ${key}`);
      return [];
    }

    const data = await parseCSV(path);

    // Format data if a formatter was provided
    const formattedData = formatter ? formatter(data) : data;

    // Cache the formatted data
    this.cache[key] = formattedData;

    return formattedData;
  }

  // Executive Summary Data
  async getExecutiveSummaryData() {
    return this.loadData("executiveSummary", formatters.formatExecutiveSummary);
  }

  // Conversion Funnel Data
  async getConversionFunnelData() {
    return this.loadData("conversionFunnel", formatters.formatConversionFunnel);
  }

  // UTM Source Data for Channel Analysis
  async getUtmSourceData() {
    return this.loadData("utmSource", formatters.formatChannelData);
  }

  // Product Category Data
  async getCategoryData() {
    return this.loadData("productCategory", formatters.formatCategoryData);
  }

  // Device Data from OS Funnel
  async getDeviceData() {
    return this.loadData("osFunnel", formatters.formatDeviceData);
  }

  // Platform Data from Event Source
  async getPlatformData() {
    return this.loadData("eventSource", formatters.formatPlatformData);
  }

  // Clear cache
  clearCache() {
    this.cache = {};
  }
}

// Assign instance to a variable before exporting
const dataServiceInstance = new DataService();
export default dataServiceInstance;
