"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface WaterLevelChartProps {
  selectedRegion: string
}

export default function WaterLevelChart({ selectedRegion }: WaterLevelChartProps) {
  // Historical water level data (2000-2025)
  const historicalData = [
    { year: 2000, level: 0.0 },
    { year: 2005, level: -0.1 },
    { year: 2010, level: -0.2 },
    { year: 2015, level: -0.3 },
    { year: 2020, level: -0.5 },
    { year: 2025, level: -0.6 },
  ]

  // Region-specific data (simplified for prototype)
  const regionData = {
    "Lake Śniardwy": [
      { year: 2000, level: 0.0 },
      { year: 2005, level: -0.05 },
      { year: 2010, level: -0.15 },
      { year: 2015, level: -0.25 },
      { year: 2020, level: -0.4 },
      { year: 2025, level: -0.5 },
    ],
    "Lake Mamry": [
      { year: 2000, level: 0.0 },
      { year: 2005, level: -0.08 },
      { year: 2010, level: -0.18 },
      { year: 2015, level: -0.28 },
      { year: 2020, level: -0.45 },
      { year: 2025, level: -0.55 },
    ],
    "Lake Niegocin": [
      { year: 2000, level: 0.0 },
      { year: 2005, level: -0.12 },
      { year: 2010, level: -0.22 },
      { year: 2015, level: -0.35 },
      { year: 2020, level: -0.55 },
      { year: 2025, level: -0.65 },
    ],
  }

  // Use region-specific data if available, otherwise use general data
  const data =
    selectedRegion !== "All Masuria" && regionData[selectedRegion as keyof typeof regionData]
      ? regionData[selectedRegion as keyof typeof regionData]
      : historicalData

  return (
    <div className="h-[250px] w-full">
      <ChartContainer
        title="Historical Water Level Changes"
        description={`Water level changes in ${selectedRegion} (2000-2025)`}
        className="h-full w-full"
      >
        <Chart className="h-full w-full overflow-hidden">
          <LineChart data={data} margin={{ top: 15, right: 25, bottom: 30, left: 25 }} scale="auto">
            <XAxis dataKey="year" dy={8} fontSize={11} />
            <YAxis tickFormatter={(value) => `${value}m`} domain={[-0.7, 0.1]} tickCount={5} dx={-5} fontSize={11} />
            <Line
              dataKey="level"
              stroke="#1e40af"
              dot={{ fill: "#1e40af", r: 3 }}
              activeDot={{ r: 5, fill: "#3b82f6" }}
            />
            <ChartTooltip>
              <ChartTooltipContent
                className="bg-white p-2 border border-neutral-200 border-gray-200 shadow-md rounded-md dark:border-neutral-800"
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="text-sm">
                        <p className="font-medium">{payload[0].payload.year}</p>
                        <p className="text-blue-600">{`${payload[0].value}m`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </ChartTooltip>
          </LineChart>
        </Chart>
      </ChartContainer>
    </div>
  )
}
