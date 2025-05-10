"use client"

import { useState } from "react"
import { Download, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportGeneratorProps {
  selectedRegion: string
  selectedYear: number
  analysisResult: any
}

export default function ReportGenerator({ selectedRegion, selectedYear, analysisResult }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportType, setReportType] = useState("comprehensive")
  const [predictionScenario, setPredictionScenario] = useState("moderate")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)

      // Create a simple text blob for demonstration
      // In a real app, this would be a PDF or other document format
      const reportContent = generateReportContent()

      const blob = new Blob([reportContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `HydroVision_AI_${selectedRegion.replace(/\s+/g, "_")}_${selectedYear}_Report.txt`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 2000)
  }

  const generateReportContent = () => {
    const date = new Date().toLocaleDateString()

    // Adjust predictions based on selected scenario
    const scenarioData = {
      conservative: {
        waterLevelChange: -0.03,
        surfaceAreaReduction: "10-15%",
        timeToThreshold: "2040-2045",
        confidenceScore: 92,
      },
      moderate: {
        waterLevelChange: -0.05,
        surfaceAreaReduction: "15-20%",
        timeToThreshold: "2035-2040",
        confidenceScore: 87,
      },
      aggressive: {
        waterLevelChange: -0.08,
        surfaceAreaReduction: "20-30%",
        timeToThreshold: "2030-2035",
        confidenceScore: 82,
      },
    }

    const scenarioInfo = scenarioData[predictionScenario as keyof typeof scenarioData]

    let content = `
HydroVision AI: Hydrological Change Analysis Report
===============================================

REPORT DETAILS
Date: ${date}
Region: ${selectedRegion}
Year Analyzed: ${selectedYear}
Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}
Prediction Scenario: ${predictionScenario.charAt(0).toUpperCase() + predictionScenario.slice(1)}
${additionalNotes ? `Additional Notes: ${additionalNotes}` : ""}

EXECUTIVE SUMMARY

This report provides an analysis of water level changes in the ${selectedRegion} 
based on satellite imagery and AI-powered predictions. The data shows a
consistent decline in water levels across the region's major lakes over the
past two decades, with projections indicating continued depletion through 2035.

AI PREDICTION SCENARIO: ${predictionScenario.toUpperCase()}

Annual water level change: ${scenarioInfo.waterLevelChange}m per year
Water surface area reduction by 2035: ${scenarioInfo.surfaceAreaReduction}
Time to critical threshold: ${scenarioInfo.timeToThreshold}
AI model confidence score: ${scenarioInfo.confidenceScore}%
`

    if (analysisResult) {
      content += `
CUSTOM AI ANALYSIS RESULTS

Predicted annual change: ${analysisResult.predictions?.waterLevelChange.toFixed(2)}m
Confidence score: ${(analysisResult.predictions?.confidenceScore * 100).toFixed(1)}%
Risk level: ${analysisResult.predictions?.riskLevel}

KEY INSIGHTS
${analysisResult.insights ? analysisResult.insights.map((insight: string) => `- ${insight}`).join("\n") : ""}
`
    }

    content += `
KEY FINDINGS

1. Water bodies in the region show a declining trend of approximately ${Math.abs(scenarioInfo.waterLevelChange) * 100}cm per year
2. Changes likely contribute to ecosystem disruption and biodiversity loss
3. Eastern lakes showing faster depletion than western water bodies
4. Seasonal fluctuations are becoming more extreme
5. Critical threshold may be reached for smaller lakes by ${scenarioInfo.timeToThreshold}

SATELLITE IMAGERY ANALYSIS

The comparison between current (2025) and predicted (2035) satellite imagery reveals:
- Water surface area reduction of approximately ${scenarioInfo.surfaceAreaReduction}
- Shoreline retreat most significant on eastern boundaries
- Increased vegetation in previously submerged areas
- Formation of isolated water bodies as main lake recedes

RECOMMENDATIONS

1. Implement comprehensive water resource management strategies
2. Increase monitoring frequency in high-risk areas
3. Develop conservation plans for most affected water bodies
4. Engage local communities in water preservation efforts
5. Establish water usage regulations for agricultural activities

This report was generated by HydroVision AI
Interdisciplinary Project: Hydrological Change Analysis Using Satellite Data and AI
`

    return content
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="report-type">Report Type</Label>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger id="report-type">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
            <SelectItem value="summary">Executive Summary</SelectItem>
            <SelectItem value="technical">Technical Details</SelectItem>
            <SelectItem value="environmental">Environmental Impact</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prediction-scenario">AI Prediction Scenario</Label>
        <Select value={predictionScenario} onValueChange={setPredictionScenario}>
          <SelectTrigger id="prediction-scenario">
            <SelectValue placeholder="Select prediction scenario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservative (Low Impact)</SelectItem>
            <SelectItem value="moderate">Moderate (Medium Impact)</SelectItem>
            <SelectItem value="aggressive">Aggressive (High Impact)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          {predictionScenario === "conservative" &&
            "Assumes minimal climate change impact and effective conservation measures"}
          {predictionScenario === "moderate" && "Based on current trends continuing with some mitigation efforts"}
          {predictionScenario === "aggressive" &&
            "Assumes accelerated climate change impact with limited conservation efforts"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
        <Textarea
          id="additional-notes"
          placeholder="Add any specific areas of interest or concerns..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="resize-none h-20"
        />
      </div>

      {!analysisResult && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md border border-neutral-200 border-amber-200 dark:border-neutral-800">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            For more detailed analysis in your report, run the "Analyze Current Trends" function first.
          </p>
        </div>
      )}

      <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full bg-blue-600 hover:bg-blue-700">
        {isGenerating ? (
          <>
            <FileText className="mr-2 h-4 w-4 animate-pulse" />
            Generating Report...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </>
        )}
      </Button>
    </div>
  )
}
