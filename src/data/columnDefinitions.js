import React from "react";
import { formatPercentage, getChangeColor } from "../utils/formatters";
import { colors } from "../utils/colors";

// Column definitions for Executive Summary
export const executiveSummaryColumns = [
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
      <span style={{ color: getChangeColor(row.wow, colors) }}>
        {formatPercentage(row.wow)}
      </span>
    ),
  },
  {
    key: "mom",
    header: "MoM Change",
    render: (row) => (
      <span style={{ color: getChangeColor(row.mom, colors) }}>
        {formatPercentage(row.mom)}
      </span>
    ),
  },
];

// Column definitions for Channel Analysis
export const channelColumns = [
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
      <span style={{ color: getChangeColor(row.rpsWow, colors) }}>
        {formatPercentage(row.rpsWow)}
      </span>
    ),
  },
  {
    key: "rpsMom",
    header: "MoM Δ",
    render: (row) => (
      <span style={{ color: getChangeColor(row.rpsMom, colors) }}>
        {formatPercentage(row.rpsMom)}
      </span>
    ),
  },
];

// Column definitions for Product Category
export const categoryColumns = [
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
      <span style={{ color: getChangeColor(row.wow, colors) }}>
        {formatPercentage(row.wow)}
      </span>
    ),
  },
  {
    key: "mom",
    header: "MoM Δ",
    render: (row) => (
      <span style={{ color: getChangeColor(row.mom, colors) }}>
        {formatPercentage(row.mom)}
      </span>
    ),
  },
];
