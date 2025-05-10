"use client"

import { useState } from "react"
import { Download, FileText, AlertTriangle, BarChart3, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, Chart, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis } from "@/components/chart"

interface ReportGeneratorProps {
  selectedRegion: string
  selectedYear: number
  analysisResult: any | null
}

export default function ReportGenerator({ selectedRegion, selectedYear, analysisResult }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportType, setReportType] = useState("comprehensive")
  const [predictionScenario, setPredictionScenario] = useState("moderate")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [selectedLake, setSelectedLake] = useState(selectedRegion === "All Masuria" ? "Lake Mamry" : selectedRegion)
  const [analysisTab, setAnalysisTab] = useState("waterLevels")

  // Create a container ref for the chart rendering
  const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null);

  // Lake details
  const lakeData = {
    "Lake Mamry": {
      area: "104 km²",
      depth: "43.8m",
      shoreline: "178 km",
      image: "/images/mamry-2025.png",
      futurePrediction: "/images/mamry-2035.png",
      waterLevelData: [
        { year: 2020, level: 116.2 },
        { year: 2021, level: 116.0 },
        { year: 2022, level: 115.8 },
        { year: 2023, level: 115.5 },
        { year: 2024, level: 115.2 },
        { year: 2025, level: 115.0 },
        { year: 2026, level: 114.7, projected: true },
        { year: 2027, level: 114.5, projected: true },
        { year: 2028, level: 114.2, projected: true },
        { year: 2029, level: 113.9, projected: true },
        { year: 2030, level: 113.6, projected: true },
        { year: 2031, level: 113.3, projected: true },
        { year: 2032, level: 112.9, projected: true },
        { year: 2033, level: 112.5, projected: true },
        { year: 2034, level: 112.0, projected: true },
        { year: 2035, level: 111.5, projected: true },
      ],
      surfaceAreaData: [
        { year: 2020, area: 104.0 },
        { year: 2025, area: 99.3 },
        { year: 2030, area: 93.6, projected: true },
        { year: 2035, area: 86.1, projected: true },
      ],
      threats: ["Agricultural runoff", "Tourism pressure", "Climate change impacts"],
      vulnerabilityScore: 7.2,
      insights: [
        "Shows specific vulnerability to agricultural runoff",
        "Water quality concerns may compound volume reduction issues",
        "Critical areas around northwestern shoreline"
      ]
    },
    "Lake Śniardwy": {
      area: "113.8 km²",
      depth: "23.4m",
      shoreline: "152 km",
      image: "/images/sniardwy-2025.png",
      futurePrediction: "/images/sniardwy-2035.png",
      waterLevelData: [
        { year: 2020, level: 116.8 },
        { year: 2021, level: 116.5 },
        { year: 2022, level: 116.3 },
        { year: 2023, level: 116.0 },
        { year: 2024, level: 115.8 },
        { year: 2025, level: 115.5 },
        { year: 2026, level: 115.2, projected: true },
        { year: 2027, level: 114.9, projected: true },
        { year: 2028, level: 114.6, projected: true },
        { year: 2029, level: 114.3, projected: true },
        { year: 2030, level: 114.0, projected: true },
        { year: 2031, level: 113.6, projected: true },
        { year: 2032, level: 113.2, projected: true },
        { year: 2033, level: 112.8, projected: true },
        { year: 2034, level: 112.3, projected: true },
        { year: 2035, level: 111.8, projected: true },
      ],
      surfaceAreaData: [
        { year: 2020, area: 113.8 },
        { year: 2025, area: 108.1 },
        { year: 2030, area: 101.5, projected: true },
        { year: 2035, area: 93.2, projected: true },
      ],
      threats: ["Shoreline erosion", "Seasonal drought", "Water level fluctuation"],
      vulnerabilityScore: 6.8,
      insights: [
        "Moderate vulnerability to seasonal drought conditions",
        "Projected to lose 15-20% of surface area by 2035 without intervention",
        "Southern bays most susceptible to drying"
      ]
    },
    "Lake Niegocin": {
      area: "26.04 km²",
      depth: "39.7m",
      shoreline: "35 km",
      image: "/images/niegocin-2025.png",
      futurePrediction: "/images/niegocin-2035.png",
      waterLevelData: [
        { year: 2020, level: 117.3 },
        { year: 2021, level: 117.0 },
        { year: 2022, level: 116.8 },
        { year: 2023, level: 116.5 },
        { year: 2024, level: 116.1 },
        { year: 2025, level: 115.8 },
        { year: 2026, level: 115.3, projected: true },
        { year: 2027, level: 114.8, projected: true },
        { year: 2028, level: 114.2, projected: true },
        { year: 2029, level: 113.6, projected: true },
        { year: 2030, level: 112.9, projected: true },
        { year: 2031, level: 112.2, projected: true },
        { year: 2032, level: 111.4, projected: true },
        { year: 2033, level: 110.5, projected: true },
        { year: 2034, level: 109.4, projected: true },
        { year: 2035, level: 108.2, projected: true },
      ],
      surfaceAreaData: [
        { year: 2020, area: 26.04 },
        { year: 2025, area: 24.12 },
        { year: 2030, area: 21.3, projected: true },
        { year: 2035, area: 18.1, projected: true },
      ],
      threats: ["Urban development", "Recreational usage", "Pollution"],
      vulnerabilityScore: 8.3,
      insights: [
        "High vulnerability to seasonal drought conditions",
        "Critical threshold may be reached by 2032, requiring immediate intervention",
        "Eastern shoreline showing most significant change"
      ]
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      generateLakeAnalysisReport();
    }, 1500)
  }

  const getCurrentLakeData = () => {
    const lake = selectedLake as keyof typeof lakeData;
    return lakeData[lake] || lakeData["Lake Mamry"];
  };

  const generateLakeAnalysisReport = async () => {
    try {
      // Only run on client side
      if (typeof window === 'undefined') return;

      // Dynamically import jsPDF and html2canvas
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      
      // Create new document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get data for the report
      const date = new Date().toLocaleDateString();
      const currentLakeData = getCurrentLakeData();
      
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
      };
      
      const scenarioInfo = scenarioData[predictionScenario as keyof typeof scenarioData];
      
      // Set up document styles
      doc.setFillColor(33, 63, 154);
      doc.rect(0, 0, 210, 25, 'F');
      
      // Add title
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.text("HydroVision AI: Lake Analysis Report", 105, 15, { align: 'center' });
      
      // Add lake name subtitle
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text(`${selectedLake} Analysis`, 105, 35, { align: 'center' });
      
      // Report metadata
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${date}`, 20, 45);
      doc.text(`Analysis scenario: ${predictionScenario.charAt(0).toUpperCase() + predictionScenario.slice(1)}`, 20, 50);
      doc.text(`Reference year: ${selectedYear}`, 20, 55);
      
      // Lake facts section
      doc.setFillColor(240, 240, 240);
      doc.rect(20, 65, 170, 30, 'F');
      
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Lake Facts", 25, 73);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Area: ${currentLakeData.area}`, 25, 80);
      doc.text(`Maximum depth: ${currentLakeData.depth}`, 70, 80);
      doc.text(`Shoreline length: ${currentLakeData.shoreline}`, 130, 80);
      doc.text(`Vulnerability score: ${currentLakeData.vulnerabilityScore}/10`, 25, 87);
      
      // Executive summary
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Executive Summary", 20, 105);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const summaryText = `This analysis report provides a detailed assessment of current conditions and future projections for ${selectedLake}. Based on satellite imagery analysis and AI-powered predictions using the ${predictionScenario} scenario model, we've identified significant hydrological changes expected to occur by 2035. These changes pose various challenges that require adaptive management strategies.`;
      
      const splitSummary = doc.splitTextToSize(summaryText, 170);
      doc.text(splitSummary, 20, 115);
      
      // Key findings
      const yPosFindings = 130 + splitSummary.length * 2;
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Key Findings", 20, yPosFindings);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`• Projected annual water level change: ${scenarioInfo.waterLevelChange}m per year`, 20, yPosFindings + 10);
      doc.text(`• Expected surface area reduction by 2035: ${scenarioInfo.surfaceAreaReduction}`, 20, yPosFindings + 16);
      doc.text(`• Critical threshold timeline: ${scenarioInfo.timeToThreshold}`, 20, yPosFindings + 22);
      doc.text(`• AI model confidence score: ${scenarioInfo.confidenceScore}%`, 20, yPosFindings + 28);
      
      // Primary threats
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Primary Threats", 20, yPosFindings + 40);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      currentLakeData.threats.forEach((threat, i) => {
        doc.text(`• ${threat}`, 20, yPosFindings + 50 + (i * 6));
      });
      
      // Add new page for charts and insights
      doc.addPage();
      
      // Title for data visualization section
      doc.setFontSize(16);
      doc.setTextColor(33, 63, 154);
      doc.text("Data Visualization & Trend Analysis", 105, 20, { align: 'center' });
      
      // Generate water level chart
      // Create water level line chart
      const drawWaterLevelChart = () => {
        const data = currentLakeData.waterLevelData;
        
        // Draw chart background
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(20, 30, 170, 70, 3, 3, 'F');
        
        // Draw chart title
        doc.setFontSize(12);
        doc.setTextColor(33, 63, 154);
        doc.text("Water Level Trends (meters)", 105, 40, { align: 'center' });
        
        // Draw axes
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.3);
        
        // X-axis
        doc.line(30, 90, 180, 90);
        
        // Y-axis
        doc.line(30, 90, 30, 50);
        
        // Calculate scaling factors
        const xScale = 150 / (data.length - 1);
        const yMin = Math.min(...data.map(d => d.level)) - 1;
        const yMax = Math.max(...data.map(d => d.level)) + 1;
        const yRange = yMax - yMin;
        const yScale = 40 / yRange;
        
        // Draw data points and lines
        doc.setDrawColor(33, 63, 154);
        doc.setLineWidth(0.5);
        
        // Current data line
        let prevX = null;
        let prevY = null;
        
        data.forEach((point, i) => {
          const x = 30 + (i * xScale);
          const y = 90 - ((point.level - yMin) * yScale);
          
          // Draw the point
          if (point.projected) {
            doc.setFillColor(255, 100, 100);
            doc.circle(x, y, 0.8, 'F');
          } else {
            doc.setFillColor(33, 63, 154);
            doc.circle(x, y, 0.8, 'F');
          }
          
          // Draw line connecting points
          if (prevX !== null && prevY !== null) {
            if (point.projected) {
              doc.setDrawColor(255, 100, 100);
              doc.setLineDashPattern([1, 1], 0);
            } else {
              doc.setDrawColor(33, 63, 154);
              doc.setLineDashPattern([], 0);
            }
            doc.line(prevX, prevY, x, y);
          }
          
          prevX = x;
          prevY = y;
        });
        
        // Reset dash pattern
        doc.setLineDashPattern([], 0);
        
        // Draw X-axis labels (years)
        doc.setFontSize(7);
        doc.setTextColor(50, 50, 50);
        
        [0, 3, 6, 9, 12, 15].forEach(i => {
          if (i < data.length) {
            const x = 30 + (i * xScale);
            doc.text(data[i].year.toString(), x, 95, { align: 'center' });
          }
        });
        
        // Draw Y-axis labels (water levels)
        const yLabels = 5;
        for (let i = 0; i <= yLabels; i++) {
          const value = yMin + (i * (yRange / yLabels));
          const y = 90 - (i * (40 / yLabels));
          doc.text(value.toFixed(1), 25, y, { align: 'right' });
        }
        
        // Add legend
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        
        // Current data legend
        doc.setFillColor(33, 63, 154);
        doc.rect(50, 100, 3, 3, 'F');
        doc.text("Historical Data", 55, 102);
        
        // Projected data legend
        doc.setFillColor(255, 100, 100);
        doc.rect(90, 100, 3, 3, 'F');
        doc.text("Projected Data", 95, 102);
      };
      
      // Generate surface area chart
      const drawSurfaceAreaChart = () => {
        const data = currentLakeData.surfaceAreaData;
        
        // Draw chart background
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(20, 110, 170, 70, 3, 3, 'F');
        
        // Draw chart title
        doc.setFontSize(12);
        doc.setTextColor(33, 63, 154);
        doc.text("Surface Area Changes (km²)", 105, 120, { align: 'center' });
        
        // Draw axes
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.3);
        
        // X-axis
        doc.line(40, 170, 170, 170);
        
        // Y-axis
        doc.line(40, 170, 40, 130);
        
        // Calculate min and max for Y axis
        const maxArea = Math.max(...data.map(d => d.area)) * 1.1;
        const minArea = Math.min(...data.map(d => d.area)) * 0.9;
        const areaRange = maxArea - minArea;
        
        // Draw bars
        const barWidth = 20;
        const totalBarWidth = barWidth * data.length;
        const availableWidth = 130; // total width minus margins
        const startX = 40 + (availableWidth - totalBarWidth) / 2;
        
        data.forEach((item, i) => {
          const x = startX + (i * barWidth);
          const height = ((item.area - minArea) / areaRange) * 40;
          const y = 170 - height;
          
          if (item.projected) {
            doc.setFillColor(255, 100, 100);
          } else {
            doc.setFillColor(33, 63, 154);
          }
          
          doc.rect(x, y, barWidth - 5, height, 'F');
          
          // Add year label
          doc.setFontSize(7);
          doc.setTextColor(50, 50, 50);
          doc.text(item.year.toString(), x + (barWidth - 5) / 2, 175, { align: 'center' });
          
          // Add value label
          doc.setFontSize(6);
          doc.setTextColor(0, 0, 0);
          doc.text(item.area.toFixed(1), x + (barWidth - 5) / 2, y - 2, { align: 'center' });
        });
        
        // Y-axis labels
        doc.setFontSize(7);
        doc.setTextColor(50, 50, 50);
        
        const yLabels = 4;
        for (let i = 0; i <= yLabels; i++) {
          const value = minArea + (i * (areaRange / yLabels));
          const y = 170 - (i * (40 / yLabels));
          doc.text(value.toFixed(1), 35, y, { align: 'right' });
        }
      };
      
      // Draw the charts
      drawWaterLevelChart();
      drawSurfaceAreaChart();
      
      // AI-Generated insights
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("AI-Generated Insights", 20, 190);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // Use insights from either analysis result or default lake data
      const insights = analysisResult?.insights || currentLakeData.insights;
      insights.forEach((insight: string, i: number) => {
        doc.text(`• ${insight}`, 20, 200 + (i * 6));
      });
      
      // Add new page for recommendations
      doc.addPage();
      
      // Recommendations
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Recommended Actions", 20, 30);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text("1. Implement comprehensive water resource management strategy", 20, 40);
      doc.text("2. Increase monitoring frequency in high-risk shoreline areas", 20, 46);
      doc.text("3. Develop conservation plans targeting the most affected zones", 20, 52);
      doc.text("4. Engage local communities in water preservation efforts", 20, 58);
      doc.text("5. Establish stronger water usage regulations for surrounding activities", 20, 64);
      
      // Add any additional notes if provided
      if (additionalNotes) {
        doc.setFontSize(14);
        doc.setTextColor(33, 63, 154);
        doc.text("Additional Notes", 20, 80);
        
        const notesText = doc.splitTextToSize(additionalNotes, 170);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(notesText, 20, 90);
      }
      
      // Footer
      doc.setFillColor(33, 63, 154);
      doc.rect(0, 277, 210, 20, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("HydroVision AI: Interdisciplinary Project for Hydrological Analysis Using Satellite Data and AI", 105, 285, { align: 'center' });
      doc.setFontSize(8);
      doc.text(`Report ID: HV-${Date.now().toString().substring(6)}`, 105, 290, { align: 'center' });
      
      // Save the PDF with proper filename
      doc.save(`${selectedLake.replace(/\s+/g, "_")}_Analysis_Report.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF report. Trying alternative format...");
      
      // Fallback to text version
      generateTextReport();
    }
  };

  const generateTextReport = () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedLake.replace(/\s+/g, "_")}_Analysis_Report.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    const date = new Date().toLocaleDateString();
    const currentLakeData = getCurrentLakeData();

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
    };

    const scenarioInfo = scenarioData[predictionScenario as keyof typeof scenarioData];

    let content = `
HYDROVISION AI: LAKE ANALYSIS REPORT
===============================================

LAKE: ${selectedLake}
Date: ${date}
Analysis Scenario: ${predictionScenario.charAt(0).toUpperCase() + predictionScenario.slice(1)}
Reference Year: ${selectedYear}

LAKE FACTS
-----------
Area: ${currentLakeData.area}
Maximum depth: ${currentLakeData.depth}  
Shoreline length: ${currentLakeData.shoreline}
Vulnerability score: ${currentLakeData.vulnerabilityScore}/10

EXECUTIVE SUMMARY
-----------------
This analysis report provides a detailed assessment of current conditions and future projections for ${selectedLake}. 
Based on satellite imagery analysis and AI-powered predictions using the ${predictionScenario} scenario model, 
we've identified significant hydrological changes expected to occur by 2035. These changes pose various challenges 
that require adaptive management strategies.

KEY FINDINGS
------------
• Projected annual water level change: ${scenarioInfo.waterLevelChange}m per year
• Expected surface area reduction by 2035: ${scenarioInfo.surfaceAreaReduction}
• Critical threshold timeline: ${scenarioInfo.timeToThreshold}
• AI model confidence score: ${scenarioInfo.confidenceScore}%

PRIMARY THREATS
--------------
${currentLakeData.threats.map(threat => `• ${threat}`).join('\n')}

AI-GENERATED INSIGHTS
--------------------
${analysisResult?.insights ? analysisResult.insights.map((insight: string) => `• ${insight}`).join('\n') : currentLakeData.insights.map(insight => `• ${insight}`).join('\n')}

RECOMMENDED ACTIONS
------------------
1. Implement comprehensive water resource management strategy
2. Increase monitoring frequency in high-risk shoreline areas
3. Develop conservation plans targeting the most affected zones
4. Engage local communities in water preservation efforts
5. Establish stronger water usage regulations for surrounding activities
`;

    if (additionalNotes) {
      content += `
ADDITIONAL NOTES
---------------
${additionalNotes}
`;
    }

    content += `
===============================================
HydroVision AI: Interdisciplinary Project for Hydrological Analysis Using Satellite Data and AI
Report ID: HV-${Date.now().toString().substring(6)}
`;

    return content;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lake-selection">Select Lake for Analysis</Label>
        <Select value={selectedLake} onValueChange={setSelectedLake}>
          <SelectTrigger id="lake-selection">
            <SelectValue placeholder="Select a lake" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lake Mamry">Lake Mamry</SelectItem>
            <SelectItem value="Lake Śniardwy">Lake Śniardwy</SelectItem>
            <SelectItem value="Lake Niegocin">Lake Niegocin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Analysis Parameters</Label>
        <Tabs value={analysisTab} onValueChange={setAnalysisTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="waterLevels">
              <Droplets className="h-4 w-4 mr-2" />
              Water Levels
            </TabsTrigger>
            <TabsTrigger value="scenarios">
              <BarChart3 className="h-4 w-4 mr-2" />
              Scenarios
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="waterLevels" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Focus</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                  <SelectItem value="environmental">Environmental Impact</SelectItem>
                  <SelectItem value="conservation">Conservation Strategy</SelectItem>
                  <SelectItem value="tourism">Tourism Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="scenarios" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="prediction-scenario">Climate Scenario</Label>
              <Select value={predictionScenario} onValueChange={setPredictionScenario}>
                <SelectTrigger id="prediction-scenario">
                  <SelectValue placeholder="Select climate scenario" />
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
                {predictionScenario === "moderate" && 
                  "Based on current trends continuing with some mitigation efforts"}
                {predictionScenario === "aggressive" &&
                  "Assumes accelerated climate change impact with limited conservation efforts"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes">Expert Comments (Optional)</Label>
        <Textarea
          id="additional-notes"
          placeholder="Add any specific observations, concerns, or recommendations..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="resize-none h-20"
        />
      </div>

      {!analysisResult && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md border border-neutral-200 border-amber-200 dark:border-neutral-800">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            For more detailed analysis in your report, run the "Analyze Current Trends" in the AI Predictions panel.
          </p>
        </div>
      )}

      {/* Preview area for charts */}
      <div className="mt-6 mb-4">
        <Label className="block mb-2">Data Preview</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-3 bg-white rounded-md border border-gray-200 h-64">
            <h4 className="text-sm font-medium mb-2 text-blue-800">Water Level Trends</h4>
            <div className="h-[200px]">
              <ChartContainer className="h-full">
                <LineChart className="h-full">
                  <Line 
                    data={getCurrentLakeData().waterLevelData.filter(d => !d.projected)}
                    xAccessor={(d) => d.year}
                    yAccessor={(d) => d.level}
                    stroke="#2060c0"
                    strokeWidth={2}
                  />
                  <Line 
                    data={getCurrentLakeData().waterLevelData.filter(d => d.projected)}
                    xAccessor={(d) => d.year}
                    yAccessor={(d) => d.level}
                    stroke="#ff4545"
                    strokeWidth={2}
                    strokeDasharray="4,4"
                  />
                  <XAxis />
                  <YAxis />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          <div className="p-3 bg-white rounded-md border border-gray-200 h-64">
            <h4 className="text-sm font-medium mb-2 text-blue-800">Surface Area Changes</h4>
            <div className="h-[200px]">
              <ChartContainer className="h-full">
                <BarChart className="h-full">
                  {getCurrentLakeData().surfaceAreaData.map((item, i) => (
                    <Bar 
                      key={i}
                      x={item.year.toString()}
                      y={item.area}
                      fill={item.projected ? "#ff4545" : "#2060c0"}
                    />
                  ))}
                  <XAxis />
                  <YAxis />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleGenerateReport} 
        disabled={isGenerating} 
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
      >
        {isGenerating ? (
          <>
            <FileText className="mr-2 h-4 w-4 animate-pulse" />
            Generating Lake Analysis...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Generate Lake Analysis Report
          </>
        )}
      </Button>
    </div>
  )
}
