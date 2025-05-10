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
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Interdisciplinary Project</h3>
              <p className="text-slate-600">
                HydroVision AI is an interdisciplinary project focused on hydrological change analysis using satellite
                data and AI. Our goal is to utilize satellite imagery and machine learning techniques to analyze
                hydrological changes in the Masuria region, identify patterns of water body changes, and assess their
                environmental impact.
              </p>
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
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Project Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>
                  <span className="font-medium">Team:</span> The project is carried out in groups of 4-6 members.
                </li>
                <li>
                  <span className="font-medium">Interdisciplinarity:</span> IT & environmental science.
                </li>
                <li>
                  <span className="font-medium">Project Management:</span> Apply project management methodologies (Scrum
                  or Kanban).
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Technology</h3>
              <p className="text-slate-600">HydroVision AI utilizes cutting-edge technologies including:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
                <li>Satellite imagery analysis (Sentinel-2, Landsat)</li>
                <li>Machine learning algorithms for pattern recognition and prediction</li>
                <li>Python libraries (NumPy, OpenCV, scikit-learn)</li>
                <li>Convolutional Neural Networks (CNNs) for classification</li>
                <li>Data visualization tools (Matplotlib, Seaborn)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Contact Information</h3>
              <p className="text-slate-600">For more information about the HydroVision AI project, please contact:</p>
              <div className="mt-2 text-slate-600">
                <p>Email: info@hydrovision-ai.org</p>
                <p>Phone: +48 22 123 4567</p>
                <p>Address: Environmental Research Center, Warsaw, Poland</p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
