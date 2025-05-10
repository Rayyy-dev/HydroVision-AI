"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HydroVisionLogo from "@/components/hydrovision-logo"

interface AboutProjectProps {
  onClose: () => void
}

export default function AboutProject({ onClose }: AboutProjectProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onClose} className="mb-4 flex items-center text-blue-600">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="shadow-md">
        <CardHeader className="text-center border-b pb-6">
          <div className="flex justify-center mb-4">
            <HydroVisionLogo className="h-16 w-16 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">About HydroVision AI</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Project Overview</h3>
              <p className="text-slate-600">
                HydroVision AI is an advanced analytical platform that combines satellite imagery, historical data, and machine learning to predict hydrological changes in the Masuria Lake District. The project aims to provide actionable insights for conservation efforts, resource management, and climate adaptation planning.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Masuria Lakes Coverage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Lake Mamry</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>Area: 104 km²</li>
                    <li>Max Depth: 43.8m</li>
                    <li>Shoreline: 178 km</li>
                    <li>Vulnerability: High</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Lake Śniardwy</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>Area: 113.8 km²</li>
                    <li>Max Depth: 23.4m</li>
                    <li>Shoreline: 152 km</li>
                    <li>Vulnerability: Medium</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Lake Niegocin</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>Area: 26.04 km²</li>
                    <li>Max Depth: 39.7m</li>
                    <li>Shoreline: 35 km</li>
                    <li>Vulnerability: High</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Project Phases</h3>
              <ol className="list-decimal pl-5 space-y-2 text-slate-600">
                <li>
                  <span className="font-medium">Data collection:</span> Obtain satellite imagery from sources like
                  Sentinel-2, Landsat via Google Earth Engine or NASA Earthdata, and gather historical hydrological and
                  meteorological data.
                </li>
                <li>
                  <span className="font-medium">Data processing and analysis:</span> Preprocessing satellite images
                  (noise removal, segmentation), detecting water surface changes using Python (NumPy, OpenCV,
                  scikit-learn).
                </li>
                <li>
                  <span className="font-medium">AI implementation:</span> Training machine learning models (e.g., CNNs
                  for classification of hydrological changes), forecasting future water level fluctuations.
                </li>
                <li>
                  <span className="font-medium">Findings and reporting:</span> Evaluating the environmental impact of
                  hydrological changes on local ecosystems, visualizing results, and preparing comprehensive reports
                  with conclusions and recommendations.
                </li>
              </ol>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Report Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-slate-200 rounded-md p-3">
                  <h4 className="font-medium text-slate-800">Comprehensive Analysis</h4>
                  <p className="text-sm text-slate-600 mt-1">Detailed assessment of current conditions and future projections covering hydrological changes, environmental impacts, and conservation needs.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <h4 className="font-medium text-slate-800">Environmental Impact</h4>
                  <p className="text-sm text-slate-600 mt-1">Focused analysis of ecological consequences of water level changes on surrounding habitats, water quality, and biodiversity.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <h4 className="font-medium text-slate-800">Conservation Strategy</h4>
                  <p className="text-sm text-slate-600 mt-1">Strategic interventions needed to preserve water resources with targeted recommendations for areas requiring immediate action.</p>
                </div>
                <div className="border border-slate-200 rounded-md p-3">
                  <h4 className="font-medium text-slate-800">Tourism Impact</h4>
                  <p className="text-sm text-slate-600 mt-1">Evaluation of how projected changes will affect recreational usage and tourism-based economies in the region.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Technology</h3>
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Data Sources</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                      <li>Sentinel-2 satellite imagery</li>
                      <li>Landsat 8 thermal and infrared</li>
                      <li>Historical water level records</li>
                      <li>Climate projection models</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">AI Processing</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                      <li>Machine learning models</li>
                      <li>Image segmentation</li>
                      <li>Time series analysis</li>
                      <li>Predictive modeling</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Visualization</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                      <li>Interactive maps</li>
                      <li>Time-series charts</li>
                      <li>Comparison tools</li>
                      <li>Report generation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
