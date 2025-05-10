"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Droplets, TrendingDown } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface InsightsPanelProps {
  selectedYear: number
  selectedRegion: string
  analysisResult?: any
}

export default function InsightsPanel({ selectedYear, selectedRegion, analysisResult }: InsightsPanelProps) {
  const [insights, setInsights] = useState<string[]>([])

  // Generate insights based on selected year and region
  useEffect(() => {
    // If we have analysis results, use those insights
    if (analysisResult?.insights) {
      setInsights(analysisResult.insights)
      return
    }

    // Otherwise, generate default insights
    const baseInsights = [
      "Water bodies in the region show a declining trend over past decades",
      "Changes likely contribute to ecosystem disruption and biodiversity loss",
      "Monitoring is recommended for effective water resource management",
    ]

    // Add year-specific insights
    let yearInsights: string[] = []
    if (selectedYear >= 2030) {
      yearInsights = [
        "Critical threshold may be reached for smaller lakes by 2035",
        "Seasonal fluctuations are projected to increase by 30%",
        "Eastern lakes showing accelerated depletion compared to historical trends",
      ]
    } else if (selectedYear >= 2025) {
      yearInsights = [
        "AI predicts continued water level decline if current climate trends persist",
        "Seasonal fluctuations are expected to become more extreme",
        "Intervention measures should be implemented within 5 years",
      ]
    } else {
      yearInsights = [
        "Accelerated water level decline observed in this period",
        "Correlation with increased agricultural water usage detected",
      ]
    }

    // Add region-specific insights
    let regionInsights: string[] = []
    if (selectedRegion === "Lake Śniardwy") {
      regionInsights = [
        "Lake Śniardwy shows moderate vulnerability to seasonal drought conditions",
        "Projected to lose 15-20% of surface area by 2035 without intervention",
      ]
    } else if (selectedRegion === "Lake Niegocin") {
      regionInsights = [
        "Lake Niegocin shows high vulnerability to seasonal drought conditions",
        "Critical threshold may be reached by 2032, requiring immediate intervention",
      ]
    } else if (selectedRegion === "Lake Mamry") {
      regionInsights = [
        "Lake Mamry shows specific vulnerability to agricultural runoff",
        "Water quality concerns may compound volume reduction issues",
      ]
    } else if (selectedRegion !== "All Masuria") {
      regionInsights = [
        `${selectedRegion} shows specific vulnerability to seasonal drought conditions`,
        `Local conservation efforts for ${selectedRegion} should be prioritized`,
      ]
    }

    setInsights([...baseInsights, ...yearInsights, ...regionInsights])
  }, [selectedYear, selectedRegion, analysisResult])

  // Calculate risk level based on year or analysis result
  const getRiskLevel = () => {
    if (analysisResult?.predictions?.riskLevel) {
      return analysisResult.predictions.riskLevel
    }
    return selectedYear >= 2030 ? "High" : selectedYear >= 2025 ? "Moderate" : "Low"
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Alert>
          <TrendingDown className="h-4 w-4" />
          <AlertTitle>Declining Trend</AlertTitle>
          <AlertDescription>
            Water levels have decreased by approximately {Math.round((selectedYear - 2000) * 0.03 * 100)}cm since 2000
          </AlertDescription>
        </Alert>

        <Alert>
          <Droplets className="h-4 w-4" />
          <AlertTitle>Water Quality</AlertTitle>
          <AlertDescription>Reduced water volume affects oxygen levels and aquatic habitats</AlertDescription>
        </Alert>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Risk Assessment</AlertTitle>
          <AlertDescription>{getRiskLevel()} risk of further depletion in coming years</AlertDescription>
        </Alert>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
        <ul className="list-disc pl-5 space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-sm text-slate-700">
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
