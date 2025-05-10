"use client"

import { useState } from "react"
import MapView from "@/components/map-view"
import TimelineSlider from "@/components/timeline-slider"
import WaterLevelChart from "@/components/water-level-chart"
import PredictionChart from "@/components/prediction-chart"
import InsightsPanel from "@/components/insights-panel"
import Header from "@/components/header"
import AboutProject from "@/components/about-project"
import SeasonalAnalysis from "@/components/seasonal-analysis"
import ImageComparison from "@/components/image-comparison"
import ReportGenerator from "@/components/report-generator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, BarChart3 } from "lucide-react"

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedRegion, setSelectedRegion] = useState("All Masuria")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAbout, setShowAbout] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region)
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    try {
      // Call our mock API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: selectedYear,
          region: selectedRegion,
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setAnalysisResult(result)

      // Show a success message
      alert("AI Analysis Complete: The has analyzed the current data and updated insights.")
    } catch (error) {
      console.error("Analysis error:", error)
      // Fallback to simulated results if API fails
      setAnalysisResult({
        predictions: {
          waterLevelChange: -0.07,
          confidenceScore: 0.89,
          riskLevel: selectedYear > 2030 ? "High" : "Moderate",
        },
        insights: [
          "Water bodies continue to show a declining trend",
          `${selectedRegion} shows specific vulnerability to seasonal drought conditions`,
          "Seasonal fluctuations are expected to become more extreme",
        ],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onAboutClick={() => setShowAbout(!showAbout)} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container mx-auto px-4 py-6 flex-grow">
        {showAbout ? (
          <AboutProject onClose={() => setShowAbout(false)} />
        ) : activeTab === "dashboard" ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Masuria Region Satellite Imagery</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600">Year: {selectedYear}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] relative">
                      <MapView selectedYear={selectedYear} onRegionSelect={handleRegionSelect} />
                    </div>
                    <TimelineSlider min={2020} max={2035} value={selectedYear} onChange={handleYearChange} />
                  </CardContent>
                </Card>

                <Card className="mt-6 shadow-md">
                  <CardHeader>
                    <CardTitle>Insights & Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InsightsPanel
                      selectedYear={selectedYear}
                      selectedRegion={selectedRegion}
                      analysisResult={analysisResult}
                    />
                  </CardContent>
                </Card>

                <Card className="mt-6 shadow-md">
                  <CardHeader>
                    <CardTitle>Satellite Image Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageComparison selectedRegion={selectedRegion} />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Water Level Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="historical">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="historical">Historical</TabsTrigger>
                        <TabsTrigger value="predictions">Predictions</TabsTrigger>
                        <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="historical" className="pt-4">
                        <WaterLevelChart selectedRegion={selectedRegion} />
                      </TabsContent>
                      <TabsContent value="predictions" className="pt-4">
                        <PredictionChart selectedRegion={selectedRegion} currentYear={2025} />
                      </TabsContent>
                      <TabsContent value="seasonal" className="pt-4">
                        <SeasonalAnalysis selectedRegion={selectedRegion} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>AI Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Based on historical data and environmental factors, our AI model predicts:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                        <li>Continued decline in water levels through 2035 if current trends persist</li>
                        <li>Seasonal fluctuations will become more extreme</li>
                        <li>Eastern lakes showing faster depletion than western water bodies</li>
                        <li>Increased risk of drought periods during summer months</li>
                        <li>Potential critical threshold reached by 2032 for smaller lakes</li>
                      </ul>

                      {analysisResult && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-neutral-200 border-blue-200 dark:border-neutral-800">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-blue-700">AI Analysis Results</h4>
                              <p className="text-xs text-blue-600 mt-1">
                                Predicted annual change: {analysisResult.predictions?.waterLevelChange.toFixed(2)}m
                              </p>
                              <p className="text-xs text-blue-600">
                                Confidence score: {(analysisResult.predictions?.confidenceScore * 100).toFixed(1)}%
                              </p>
                              <p className="text-xs text-blue-600">
                                Risk level: {analysisResult.predictions?.riskLevel}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                            Running AI Analysis...
                          </>
                        ) : (
                          <>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analyze Current Trends
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Generate Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReportGenerator
                      selectedRegion={selectedRegion}
                      selectedYear={selectedYear}
                      analysisResult={analysisResult}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
