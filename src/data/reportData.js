// Mock data for the growth report

export const executiveSummaryData = [
  { metric: "Revenue", value: "₹7,013,538", wow: 0.24, mom: -1.1 },
  { metric: "Revenue per Session", value: "₹21.67", wow: +3.49, mom: -6.58 },
  { metric: "Average Order Value", value: "₹1,512.19", wow: -0.95, mom: 1.31 },
  { metric: "Basket Size", value: "1.46", wow: 1.2, mom: 6.13 },
  { metric: "Conversion Rate %", value: "1.43%", wow: 4.49, mom: -7.79 },
  { metric: "Total Sessions", value: "323,610", wow: -3.15, mom: 5.86 },
  { metric: "Total Customers", value: "4,374", wow: 1.2, mom: -1.0 },
];

export const conversionFunnelData = [
  { stage: "Total Sessions", value: 100, wow: 0.0, mom: 0.0 },
  { stage: "Sessions → Product Views", value: 82.29, wow: 0.48, mom: 0.41 },
  { stage: "Product Views → Add to Carts", value: 9.04, wow: 0.35, mom: 14.24 },
  {
    stage: "Add to Carts → Checkout Initiated",
    value: 47.81,
    wow: 2.44,
    mom: -14.3,
  },
  {
    stage: "Checkout Initiated → Completed Purchase",
    value: 40.29,
    wow: 1.16,
    mom: -6.2,
  },
];

export const utmSourceData = [
  {
    source: "facebook",
    sessions: 149238,
    share: 46.12,
    conversion: 1.52,
    revenue: 2967610,
    rps: 19.89,
    rpsWow: 4.86,
    rpsMom: -2.71,
  },
  {
    source: "google",
    sessions: 86779,
    share: 26.82,
    conversion: 0.62,
    revenue: 898046,
    rps: 10.35,
    rpsWow: 3.97,
    rpsMom: 22.55,
  },
  {
    source: "direct",
    sessions: 70681,
    share: 21.84,
    conversion: 2.23,
    revenue: 2787315,
    rps: 39.44,
    rpsWow: 1.76,
    rpsMom: -7.71,
  },
  {
    source: "facebook_todbees",
    sessions: 12661,
    share: 3.91,
    conversion: 1.51,
    revenue: 246602,
    rps: 19.48,
    rpsWow: -6.63,
    rpsMom: -44.48,
  },
  {
    source: "instagram",
    sessions: 4106,
    share: 1.27,
    conversion: 2.44,
    revenue: 180286,
    rps: 43.91,
    rpsWow: -6.32,
    rpsMom: 4.1,
  },
];

export const categoryData = [
  {
    category: "Sets",
    revenue: 3213599,
    share: 45.84,
    wow: 7.44,
    mom: -15.17,
  },
  {
    category: "Casual Dresses",
    revenue: 1096350,
    share: 15.64,
    wow: -2.24,
    mom: 25.25,
  },
  {
    category: "2 pc. Sets",
    revenue: 918669,
    share: 13.1,
    wow: -11.77,
    mom: 29.13,
  },
  {
    category: "Party Dresses",
    revenue: 731387,
    share: 10.43,
    wow: -7.45,
    mom: -11.57,
  },
  {
    category: "3 pc. Sets",
    revenue: 203836,
    share: 2.91,
    wow: 12.59,
    mom: 57.4,
  },
  {
    category: "Others",
    revenue: 846404,
    share: 12.07,
    wow: -5.85,
    mom: 28.49,
  },
];

export const deviceData = [
  {
    device: "android",
    sessions: 220539,
    share: 68.15,
    conversion: 1.16,
    revenue: 3641494,
    rps: 16.51,
    rpsWow: 2.11,
    rpsMom: -11.82,
  },
  {
    device: "ios",
    sessions: 97277,
    share: 30.06,
    conversion: 2.17,
    revenue: 3379646,
    rps: 34.74,
    rpsWow: 5.24,
    rpsMom: 4.44,
  },
  {
    device: "desktop",
    sessions: 5794,
    share: 1.79,
    conversion: 0.63,
    revenue: 66408,
    rps: 11.46,
    rpsWow: 15.89,
    rpsMom: -24.65,
  },
];

export const platformData = [
  {
    platform: "Website",
    sessions: 293307,
    share: 90.64,
    conversion: 1.22,
    revenue: 5032555,
    rps: 17.16,
    rpsWow: 3.88,
    rpsMom: -6.39,
  },
  {
    platform: "App",
    sessions: 30303,
    share: 9.36,
    conversion: 3.65,
    revenue: 2054993,
    rps: 67.81,
    rpsWow: 3.45,
    rpsMom: -4.04,
  },
];
