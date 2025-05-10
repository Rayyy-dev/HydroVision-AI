"use client"

import {
  Area,
  AreaChart,
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface PredictionChartProps {
  selectedRegion: string
  currentYear: number
}

export default function PredictionChart({ selectedRegion, currentYear }: PredictionChartProps) {
  // Generate prediction data from current year to 2035
  const generatePredictionData = (region: string, startYear: number) => {
    const data = []

    // Base decline rate and uncertainty factors
    let declineRate = 0.05
    let uncertaintyFactor = 0.02

    // Adjust based on region
    if (region === "Lake Śniardwy") {
      declineRate = 0.04
      uncertaintyFactor = 0.015
    } else if (region === "Lake Mamry") {
      declineRate = 0.045
      uncertaintyFactor = 0.018
    } else if (region === "Lake Niegocin") {
      declineRate = 0.06
      uncertaintyFactor = 0.025
    }

    // Start from current level (assuming -0.6m at 2025)
    const currentLevel = -0.6

    // Generate data for each year
    for (let year = startYear; year <= 2035; year++) {
      // Increase uncertainty over time
      const yearUncertainty = uncertaintyFactor * (1 + (year - startYear) * 0.1)

      // Calculate level and bounds
      const level = currentLevel - declineRate * (year - startYear)
      const upperBound = level + yearUncertainty * (year - startYear + 1)
      const lowerBound = level - yearUncertainty * (year - startYear + 1)

      data.push({
        year,
        level,
        upperBound,
        lowerBound,
      })

      // Add some randomness to the decline rate for more realistic predictions
      declineRate += (Math.random() - 0.5) * 0.01
    }

    return data
  }

  // Get region-specific data
  const data = generatePredictionData(selectedRegion, currentYear)

  return (
    <div className="h-[250px] w-full">
      <ChartContainer
        title="AI-Predicted Water Levels"
        description={`Predicted water levels in ${selectedRegion} (${currentYear}-2035)`}
        className="h-full w-full"
      >
        <Chart className="h-full w-full overflow-hidden">
          <AreaChart data={data} margin={{ top: 15, right: 25, bottom: 30, left: 25 }} scale="auto">
            <XAxis dataKey="year" dy={8} fontSize={11} />
            <YAxis tickFormatter={(value) => `${value}m`} domain={[-1.5, 0]} tickCount={5} dx={-5} fontSize={11} />
            <Area dataKey="upperBound" stroke="transparent" fill="#bfdbfe" fillOpacity={0.5} />
            <Area dataKey="lowerBound" stroke="transparent" fill="#bfdbfe" fillOpacity={0.5} />
            <Line
              dataKey="level"
              stroke="#1e40af"
              strokeWidth={1.5}
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
                        <p className="text-blue-600">{`Predicted: ${payload[0].payload.level.toFixed(1)}m`}</p>
                        <p className="text-blue-400">{`Range: ${payload[0].payload.upperBound.toFixed(1)}m to ${payload[0].payload.lowerBound.toFixed(1)}m`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </ChartTooltip>
          </AreaChart>
        </Chart>
      </ChartContainer>
    </div>
  )
}
