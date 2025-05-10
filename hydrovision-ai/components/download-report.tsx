"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadReport() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)

      // Create a simple text blob for demonstration
      // In a real app, this would be a PDF or other document format
      const reportContent = `
        HydroSight: AI-Powered Water Level Analysis Report
        ===============================================
        
        EXECUTIVE SUMMARY
        
        This report provides an analysis of water level changes in the Masuria region
        based on satellite imagery and AI-powered predictions. The data shows a
        consistent decline in water levels across the region's major lakes over the
        past two decades, with projections indicating continued depletion through 2035.
        
        KEY FINDINGS
        
        1. Water bodies in the region show a declining trend of approximately 2-3cm per year
        2. Changes likely contribute to ecosystem disruption and biodiversity loss
        3. Eastern lakes showing faster depletion than western water bodies
        4. Seasonal fluctuations are becoming more extreme
        5. Critical threshold may be reached for smaller lakes by 2032-2035
        
        RECOMMENDATIONS
        
        1. Implement comprehensive water resource management strategies
        2. Increase monitoring frequency in high-risk areas
        3. Develop conservation plans for most affected water bodies
        4. Engage local communities in water preservation efforts
        5. Establish water usage regulations for agricultural activities
        
        This report was generated on ${new Date().toLocaleDateString()} using HydroSight
        AI-powered hydrological change detection technology.
      `

      const blob = new Blob([reportContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = "HydroSight_Analysis_Report.txt"
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 2000)
  }

  return (
    <Button onClick={handleDownload} disabled={isGenerating} size="lg" className="bg-blue-600 hover:bg-blue-700">
      {isGenerating ? (
        <>
          <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
          Generating Report...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </>
      )}
    </Button>
  )
}
