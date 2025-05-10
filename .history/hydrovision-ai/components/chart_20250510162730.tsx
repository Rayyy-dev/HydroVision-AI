import type React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  Legend as RechartsLegend,
} from "recharts"
import { isValidElement } from "react"

interface ChartContainerProps {
  title: string
  description: string
  className?: string
  children: React.ReactNode
}

export function ChartContainer({ title, description, className, children }: ChartContainerProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      {children}
    </div>
  )
}

interface ChartProps {
  className?: string
  children: React.ReactNode
}

export function Chart({ className, children }: ChartProps) {
  // Ensure children is a valid React element for ResponsiveContainer
  if (!isValidElement(children)) {
    console.error("Chart requires a valid React element as its child")
    return null
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  )
}

export const LineChart = RechartsLineChart
export const Line = RechartsLine
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const ChartTooltip = RechartsTooltip
export const ChartTooltipContent = ({ content }: { content: React.ReactNode }) => {
  return content as React.ReactNode
}
export const AreaChart = RechartsAreaChart
export const Area = RechartsArea
export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const Legend = RechartsLegend
