import React from "react";

// Executive Summary Insights
export const executiveInsights = [
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
          Basket size continues to grow both weekly (<b>+1.20%</b>) and monthly
          (<b>+6.13%</b>), suggesting effective cross-selling.
        </span>
      ),
    },
  ],
];

// Conversion Funnel Insights
export const funnelInsights = [
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
        Month-over-month decline in checkout completion (<b>6.20%</b>) requires
        investigation into potential payment issues.
      </span>
    ),
  },
];

// Channel Insights
export const channelInsights = [
  {
    positive: true,
    text: (
      <span>
        <b>Facebook</b> shows solid growth in RPS (<b>-4.86%</b> WoW) despite
        slight month-over-month decline, and contributes <b>46.12%</b> of total
        traffic.
      </span>
    ),
  },
  {
    positive: true,
    text: (
      <span>
        <b>Google</b> traffic has the lowest conversion rate (<b>0.62%</b>) but
        shows promising RPS growth both weekly (<b>+3.97%</b>) and monthly (
        <b>+22.55%</b>).
      </span>
    ),
  },
  {
    positive: false,
    text: (
      <span>
        <b>Facebook_todbees</b> is underperforming with significant RPS decline
        both weekly (<b>-6.63%</b>) and monthly (<b>-44.48%</b>).
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

// Category Insights
export const categoryInsights = [
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
        despite strong monthly growth (<b>+29.13%</b>), requiring investigation
        into recent changes.
      </span>
    ),
  },
  {
    positive: false,
    text: (
      <span>
        <b>Party Dresses</b> shows concerning decline both weekly (<b>-7.45%</b>
        ) and monthly (<b>-11.57%</b>), suggesting potential issues with this
        category.
      </span>
    ),
  },
];

// Device Insights
export const deviceInsights = [
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
        Despite accounting for only <b>9.36%</b> of sessions, the app generates{" "}
        <b>29.78%</b> of total revenue, highlighting major platform performance
        gap.
      </span>
    ),
  },
];

// Recommendations
export const recommendations = [
  {
    id: 1,
    text: (
      <span>
        <b>App promotion:</b> Given the app's superior performance metrics,
        invest in driving more traffic to the app through app-install campaigns
        and in-website promotions.
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
        Google traffic by increasing investment in better-performing campaigns.
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
