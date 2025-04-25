import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ===== REUSABLE COMPONENTS =====

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

// Data Table Component
const DataTable = ({ columns, data, getRowStyle }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-3 py-2 whitespace-nowrap text-sm"
                  style={getRowStyle ? getRowStyle(row, column.key) : {}}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Insights Box Component
const InsightsBox = ({ title, insights, columns = 1 }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    <div
      className={`grid grid-cols-1 ${
        columns > 1 ? `md:grid-cols-${columns}` : ""
      } gap-4`}
    >
      {Array.isArray(insights[0]) ? (
        insights.map((insightGroup, groupIndex) => (
          <div key={groupIndex}>
            <ul className="space-y-2">
              {insightGroup.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className={`${
                      insight.positive ? "text-green-500" : "text-red-500"
                    } mr-2`}
                  >
                    {insight.positive ? "▲" : "▼"}
                  </span>
                  <span>{insight.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <span
                className={`${
                  insight.positive ? "text-green-500" : "text-red-500"
                } mr-2`}
              >
                {insight.positive ? "▲" : "▼"}
              </span>
              <span>{insight.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

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

// Chart Components
const PieChartComponent = ({
  data,
  dataKey,
  nameKey,
  colors,
  formatNumber,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, "Share"]} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const BarChartComponent = ({
  data,
  dataKey,
  xAxisKey,
  yAxisKey,
  barColor,
  customTooltip,
  layoutVertical = false,
  formatNumber,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      layout={layoutVertical ? "vertical" : "horizontal"}
      margin={{
        top: 5,
        right: 30,
        left: layoutVertical ? 150 : 20,
        bottom: layoutVertical ? 5 : 50,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {layoutVertical ? (
        <>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey={xAxisKey} type="category" width={150} />
        </>
      ) : (
        <>
          <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" height={80} />
          <YAxis
            tickFormatter={
              formatNumber ? (value) => formatNumber(value) : undefined
            }
          />
        </>
      )}
      <Tooltip formatter={customTooltip} />
      <Bar
        dataKey={yAxisKey}
        fill={barColor}
        radius={layoutVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

const ComparisonBarChart = ({ data, xAxisKey, colors, bars }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      {bars.map((bar, index) => (
        <YAxis
          key={index}
          yAxisId={bar.id}
          orientation={bar.orientation}
          stroke={colors[index]}
        />
      ))}
      <Tooltip />
      <Legend />
      {bars.map((bar, index) => (
        <Bar
          key={index}
          yAxisId={bar.id}
          dataKey={bar.dataKey}
          name={bar.name}
          fill={colors[index]}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

const VaareeGrowthReport = () => {
  // Color palette
  const colors = {
    primary: "#4f46e5",
    secondary: "#10b981",
    negative: "#ef4444",
    positive: "#22c55e",
    neutral: "#6b7280",
    chartColors: [
      "#4f46e5",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
    ],
  };

  // ===== DATA SECTION =====
  const executiveSummaryData = [
    { metric: "Revenue", value: "₹7,013,538", wow: 0.24, mom: -1.1 },
    { metric: "Revenue per Session", value: "₹21.67", wow: 3.49, mom: -6.58 },
    {
      metric: "Average Order Value",
      value: "₹1,512.19",
      wow: -0.95,
      mom: 1.31,
    },
    { metric: "Basket Size", value: "1.46", wow: 1.2, mom: 6.13 },
    { metric: "Conversion Rate %", value: "1.43%", wow: 4.49, mom: -7.79 },
    { metric: "Total Sessions", value: "323,610", wow: -3.15, mom: 5.86 },
    { metric: "Total Customers", value: "4,374", wow: 1.2, mom: -1.0 },
  ];

  const conversionFunnelData = [
    { stage: "Total Sessions", value: 100, wow: 0.0, mom: 0.0 },
    { stage: "Sessions → Product Views", value: 82.29, wow: 0.48, mom: 0.41 },
    {
      stage: "Product Views → Add to Carts",
      value: 9.04,
      wow: 0.35,
      mom: 14.24,
    },
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

  const utmSourceData = [
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

  const categoryData = [
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

  const deviceData = [
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

  const platformData = [
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

  // ===== HELPER FUNCTIONS =====
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const getChangeColor = (value) => {
    if (value > 0) return colors.positive;
    if (value < 0) return colors.negative;
    return colors.neutral;
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  // Column definitions
  const executiveSummaryColumns = [
    {
      key: "metric",
      header: "Metric",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.metric}</span>
      ),
    },
    {
      key: "value",
      header: "Current Value",
      render: (row) => (
        <span className="font-bold text-gray-900">{row.value}</span>
      ),
    },
    {
      key: "wow",
      header: "WoW Change",
      render: (row) => (
        <span style={{ color: getChangeColor(row.wow) }}>
          {formatPercentage(row.wow)}
        </span>
      ),
    },
    {
      key: "mom",
      header: "MoM Change",
      render: (row) => (
        <span style={{ color: getChangeColor(row.mom) }}>
          {formatPercentage(row.mom)}
        </span>
      ),
    },
  ];

  const channelColumns = [
    {
      key: "source",
      header: "Source",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.source}</span>
      ),
    },
    {
      key: "conversion",
      header: "Conv. Rate",
      render: (row) => <span>{row.conversion.toFixed(2)}%</span>,
    },
    {
      key: "rps",
      header: "Rev/Session",
      render: (row) => <span>₹{row.rps.toFixed(2)}</span>,
    },
    {
      key: "rpsWow",
      header: "WoW Δ",
      render: (row) => (
        <span style={{ color: getChangeColor(row.rpsWow) }}>
          {formatPercentage(row.rpsWow)}
        </span>
      ),
    },
    {
      key: "rpsMom",
      header: "MoM Δ",
      render: (row) => (
        <span style={{ color: getChangeColor(row.rpsMom) }}>
          {formatPercentage(row.rpsMom)}
        </span>
      ),
    },
  ];

  const categoryColumns = [
    {
      key: "category",
      header: "Category",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.category}</span>
      ),
    },
    {
      key: "share",
      header: "Share",
      render: (row) => <span>{row.share.toFixed(2)}%</span>,
    },
    {
      key: "wow",
      header: "WoW Δ",
      render: (row) => (
        <span style={{ color: getChangeColor(row.wow) }}>
          {formatPercentage(row.wow)}
        </span>
      ),
    },
    {
      key: "mom",
      header: "MoM Δ",
      render: (row) => (
        <span style={{ color: getChangeColor(row.mom) }}>
          {formatPercentage(row.mom)}
        </span>
      ),
    },
  ];

  // Insights data
  const executiveInsights = [
    [
      {
        positive: true,
        text: (
          <span>
            Conversion rate increased by <b>4.49%</b> WoW despite a <b>3.15%</b>{" "}
            decrease in sessions, suggesting improved targeting quality.
          </span>
        ),
      },
      {
        positive: true,
        text: (
          <span>
            Revenue per Session improved by <b>3.49%</b> WoW, compensating for
            lower traffic volume.
          </span>
        ),
      },
    ],
    [
      {
        positive: false,
        text: (
          <span>
            Monthly comparison shows concerning trends in revenue (<b>-1.10%</b>
            ), RPS (<b>-6.58%</b>), and conversion rate (<b>-7.79%</b>).
          </span>
        ),
      },
      {
        positive: true,
        text: (
          <span>
            Basket size continues to grow both weekly (<b>+1.20%</b>) and
            monthly (<b>+6.13%</b>), suggesting effective cross-selling.
          </span>
        ),
      },
    ],
  ];

  const funnelInsights = [
    {
      positive: true,
      text: (
        <span>
          Checkout completion rate improved weekly (<b>+1.16%</b>), suggesting
          UI/UX improvements are effective.
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          Add to Cart to Checkout transition improved by <b>2.44%</b> WoW, but
          shows significant decline MoM (<b>-14.30%</b>).
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          Product Views to Add to Cart shows strong monthly improvement (
          <b>+14.24%</b>), indicating effective product presentation.
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          Month-over-month decline in checkout completion (<b>-6.20%</b>)
          requires investigation into potential payment issues.
        </span>
      ),
    },
  ];

  const channelInsights = [
    {
      positive: true,
      text: (
        <span>
          <b>Facebook</b> shows solid growth in RPS (<b>+4.86%</b> WoW) despite
          slight month-over-month decline, and contributes <b>46.12%</b> of
          total traffic.
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          <b>Google</b> traffic has the lowest conversion rate (<b>0.62%</b>)
          but shows promising RPS growth both weekly (<b>+3.97%</b>) and monthly
          (<b>+22.55%</b>).
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          <b>Facebook_todbees</b> is underperforming with significant RPS
          decline both weekly (<b>-6.63%</b>) and monthly (<b>-44.48%</b>).
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          <b>Instagram</b> has high conversion (<b>2.44%</b>) and RPS (
          <b>₹43.91</b>) despite recent weekly decline, suggesting high-quality
          traffic.
        </span>
      ),
    },
  ];

  const categoryInsights = [
    {
      positive: true,
      text: (
        <span>
          <b>Sets</b> remains the dominant category (<b>45.84%</b> of revenue)
          with strong weekly growth (<b>+7.44%</b>) despite monthly decline (
          <b>-15.17%</b>).
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          <b>3 pc. Sets</b> shows strongest growth both weekly (<b>+12.59%</b>)
          and monthly (<b>+57.40%</b>), suggesting increased customer preference
          for value-oriented offerings.
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          <b>2 pc. Sets</b> has significant weekly decline (<b>-11.77%</b>)
          despite strong monthly growth (<b>+29.13%</b>), requiring
          investigation into recent changes.
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          <b>Party Dresses</b> shows concerning decline both weekly (
          <b>-7.45%</b>) and monthly (<b>-11.57%</b>), suggesting potential
          issues with this category.
        </span>
      ),
    },
  ];

  const deviceInsights = [
    {
      positive: true,
      text: (
        <span>
          <b>App</b> significantly outperforms website with{" "}
          <b>3x higher conversion rate</b> (<b>3.65%</b> vs <b>1.22%</b>) and{" "}
          <b>4x higher RPS</b> (<b>₹67.81</b> vs <b>₹17.16</b>).
        </span>
      ),
    },
    {
      positive: true,
      text: (
        <span>
          <b>iOS</b> users (<b>30.06%</b> of traffic) show nearly{" "}
          <b>2x higher conversion</b> than Android users and stronger RPS growth
          both weekly (<b>+5.24%</b>) and monthly (<b>+4.44%</b>).
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          <b>Android</b> continues to dominate traffic (<b>68.15%</b>) but shows
          concerning monthly RPS decline (<b>-11.82%</b>).
        </span>
      ),
    },
    {
      positive: false,
      text: (
        <span>
          Despite accounting for only <b>9.36%</b> of sessions, the app
          generates <b>29.78%</b> of total revenue, highlighting major platform
          performance gap.
        </span>
      ),
    },
  ];

  const recommendations = [
    {
      id: 1,
      text: (
        <span>
          <b>App promotion:</b> Given the app's superior performance metrics,
          invest in driving more traffic to the app through app-install
          campaigns and in-website promotions.
        </span>
      ),
    },
    {
      id: 2,
      text: (
        <span>
          <b>Checkout optimization:</b> Investigate and address the significant
          month-over-month decline in checkout completion rate to reverse the
          negative trend.
        </span>
      ),
    },
    {
      id: 3,
      text: (
        <span>
          <b>Google traffic strategy:</b> Capitalize on the strong MoM growth in
          Google traffic by increasing investment in better-performing
          campaigns.
        </span>
      ),
    },
    {
      id: 4,
      text: (
        <span>
          <b>3 pc. Sets expansion:</b> Expand the 3 pc. Sets category with
          additional styles given its strong growth both weekly and monthly.
        </span>
      ),
    },
    {
      id: 5,
      text: (
        <span>
          <b>Party Dresses review:</b> Evaluate pricing, styling, and promotion
          strategy for Party Dresses to address concerning weekly and monthly
          declines.
        </span>
      ),
    },
  ];

  // Main render
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vaaree Weekly Growth Report
          </h1>
          <p className="text-gray-500">
            Weekly report for Apr 18 - Apr 24, 2025 | Presented by Tectonic
          </p>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <img src="/logo.png" alt="Vaaree Logo" className="h-8" />
        </div>
      </div>

      {/* 1. EXECUTIVE SUMMARY */}
      <ReportSection number="1" title="Executive Summary">
        <DataTable
          columns={executiveSummaryColumns}
          data={executiveSummaryData}
        />
        <div className="mt-4">
          <InsightsBox
            title="Key Insights"
            insights={executiveInsights}
            columns={2}
          />
        </div>
      </ReportSection>

      {/* 2. CONVERSION FUNNEL */}
      <ReportSection number="2" title="Conversion Funnel Analysis">
        <TwoColumnLayout
          leftTitle="Funnel Performance"
          leftContent={
            <BarChartComponent
              data={conversionFunnelData}
              xAxisKey="stage"
              yAxisKey="value"
              barColor={colors.primary}
              customTooltip={(value) => [
                `${value.toFixed(2)}%`,
                "Drop-off Rate",
              ]}
              layoutVertical={true}
              formatNumber={formatNumber}
            />
          }
          rightTitle="Key Funnel Insights"
          rightContent={
            <ul className="space-y-2">
              {funnelInsights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className={`${
                      insight.positive ? "text-green-500" : "text-red-500"
                    } mr-2`}
                  >
                    {insight.positive ? "▲" : "▼"}
                  </span>
                  <span>{insight.text}</span>
                </li>
              ))}
            </ul>
          }
        />
      </ReportSection>

      {/* 3. TRAFFIC & CHANNEL ANALYSIS */}
      <ReportSection number="3" title="Traffic & Channel Analysis">
        <TwoColumnLayout
          leftTitle="Traffic Source Distribution"
          leftContent={
            <PieChartComponent
              data={utmSourceData}
              dataKey="share"
              nameKey="source"
              colors={colors.chartColors}
              formatNumber={formatNumber}
            />
          }
          rightTitle="Channel Performance"
          rightContent={
            <div className="overflow-x-auto">
              <DataTable columns={channelColumns} data={utmSourceData} />
            </div>
          }
        />
        <div className="mt-4">
          <InsightsBox title="Channel Insights" insights={channelInsights} />
        </div>
      </ReportSection>

      {/* 4. PRODUCT CATEGORY PERFORMANCE */}
      <ReportSection number="4" title="Product Category Performance">
        <TwoColumnLayout
          leftTitle="Revenue by Category"
          leftContent={
            <BarChartComponent
              data={categoryData}
              xAxisKey="category"
              yAxisKey="revenue"
              barColor={colors.primary}
              customTooltip={(value) => [`₹${formatNumber(value)}`, "Revenue"]}
              formatNumber={formatNumber}
            />
          }
          rightTitle="Category Growth Trends"
          rightContent={
            <DataTable columns={categoryColumns} data={categoryData} />
          }
        />
        <div className="mt-4">
          <InsightsBox title="Category Insights" insights={categoryInsights} />
        </div>
      </ReportSection>

      {/* 5. DEVICE & PLATFORM INSIGHTS */}
      <ReportSection number="5" title="Device & Platform Insights">
        <TwoColumnLayout
          leftTitle="Device Distribution"
          leftContent={
            <PieChartComponent
              data={deviceData}
              dataKey="share"
              nameKey="device"
              colors={colors.chartColors}
              formatNumber={formatNumber}
            />
          }
          rightTitle="Platform Comparison"
          rightContent={
            <ComparisonBarChart
              data={platformData}
              xAxisKey="platform"
              colors={[colors.primary, colors.secondary]}
              bars={[
                {
                  id: "left",
                  orientation: "left",
                  dataKey: "conversion",
                  name: "Conversion Rate (%)",
                },
                {
                  id: "right",
                  orientation: "right",
                  dataKey: "rps",
                  name: "Revenue per Session (₹)",
                },
              ]}
            />
          }
        />
        <div className="mt-4">
          <InsightsBox
            title="Device & Platform Insights"
            insights={deviceInsights}
          />
        </div>
      </ReportSection>

      {/* 6. RECOMMENDATIONS */}
      <ReportSection number="6" title="Recommendations">
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="space-y-3">
            {recommendations.map((rec) => (
              <li key={rec.id} className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center flex-shrink-0 mr-2">
                  {rec.id}
                </span>
                <span>{rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </ReportSection>

      {/* FOOTER */}
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        <p>Generated on April 25, 2025 • Data refreshed weekly on Mondays</p>
      </div>
    </div>
  );
};

export default VaareeGrowthReport;
