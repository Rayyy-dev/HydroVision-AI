"use client"

import {
  Bar,
  BarChart,
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface SeasonalAnalysisProps {
  selectedRegion: string
}

export default function SeasonalAnalysis({ selectedRegion }: SeasonalAnalysisProps) {
  // Generate seasonal data for the selected region
  const generateSeasonalData = (region: string) => {
    // Base seasonal pattern
    const basePattern = [
      { month: "Jan", level: -0.05 },
      { month: "Feb", level: -0.02 },
      { month: "Mar", level: 0.03 },
      { month: "Apr", level: 0.08 },
      { month: "May", level: 0.05 },
      { month: "Jun", level: 0.0 },
      { month: "Jul", level: -0.08 },
      { month: "Aug", level: -0.15 },
      { month: "Sep", level: -0.12 },
      { month: "Oct", level: -0.07 },
      { month: "Nov", level: -0.04 },
      { month: "Dec", level: -0.06 },
    ]

    // Adjust based on region
    if (region === "Lake Śniardwy") {
      return basePattern.map((item) => ({
        ...item,
        level: item.level * 0.9, // Less seasonal variation
        historical: item.level * 0.6, // Historical data had less variation
      }))
    } else if (region === "Lake Mamry") {
      return basePattern.map((item) => ({
        ...item,
        level: item.level * 1.1, // More seasonal variation
        historical: item.level * 0.7, // Historical data had less variation
      }))
    } else if (region === "Lake Niegocin") {
      return basePattern.map((item) => ({
        ...item,
        level: item.level * 1.2, // Even more seasonal variation
        historical: item.level * 0.8, // Historical data had less variation
      }))
    } else {
      // Default for "All Masuria" or other regions
      return basePattern.map((item) => ({
        ...item,
        historical: item.level * 0.65, // Historical data had less variation
      }))
    }
  }

  const data = generateSeasonalData(selectedRegion)

  return (
    <div className="h-[250px] w-full">
      <ChartContainer
        title="Seasonal Water Level Fluctuations"
        description={`Monthly water level changes in ${selectedRegion} (current vs historical)`}
        className="h-full w-full"
      >
        <Chart className="h-full w-full overflow-hidden">
          <BarChart data={data} margin={{ top: 15, right: 25, bottom: 30, left: 25 }} scale="auto">
            <XAxis dataKey="month" dy={8} fontSize={11} />
            <YAxis tickFormatter={(value) => `${value}m`} domain={[-0.2, 0.1]} tickCount={5} dx={-5} fontSize={11} />
            <Bar dataKey="level" name="Current Pattern" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="historical" name="Historical Pattern" fill="#93c5fd" radius={[2, 2, 0, 0]} />
            <ChartTooltip>
              <ChartTooltipContent
                className="bg-white p-2 border border-neutral-200 border-gray-200 shadow-md rounded-md dark:border-neutral-800"
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="text-sm">
                        <p className="font-medium">{payload[0].payload.month}</p>
                        <p className="text-blue-600">{`Current: ${payload[0].value.toFixed(2)}m`}</p>
                        <p className="text-blue-400">{`Historical: ${payload[1].value.toFixed(2)}m`}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {payload[0].value > 0 ? "Water gain" : "Water loss"}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </ChartTooltip>
          </BarChart>
        </Chart>
      </ChartContainer>
    </div>
  )
}
