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
      
      // Generate report focus specific content
      const reportFocusContent = {
        comprehensive: {
          title: "Comprehensive Lake Analysis",
          summary: `This comprehensive analysis provides a detailed assessment of current conditions and future projections for ${selectedLake}, covering hydrological changes, environmental impacts, and conservation needs. Based on satellite imagery analysis and AI-powered predictions using the ${predictionScenario} scenario model, we've identified significant changes expected by 2035.`,
          additionalInfo: [
            "Comprehensive water volume assessment shows critical patterns.",
            "Analysis includes both surface area and depth metrics.",
            "Evaluation of surrounding ecosystem impact included."
          ]
        },
        environmental: {
          title: "Environmental Impact Analysis",
          summary: `This environmental impact report for ${selectedLake} focuses on ecological consequences of water level changes. Using the ${predictionScenario} climate scenario model, we've identified how projected hydrological changes by 2035 will impact surrounding habitats, water quality, and biodiversity.`,
          additionalInfo: [
            "Shoreline habitat disruption predicted to affect local fauna.",
            "Water quality parameters projected to change as volume decreases.",
            "Biodiversity hotspots identified for priority conservation."
          ]
        },
        conservation: {
          title: "Conservation Strategy Analysis",
          summary: `This conservation-focused report for ${selectedLake} outlines strategic interventions needed to preserve water resources. Based on the ${predictionScenario} climate scenario model, we've developed targeted recommendations for areas requiring immediate action by 2035.`,
          additionalInfo: [
            "Priority zones identified for immediate conservation efforts.",
            "Cost-benefit analysis of different intervention strategies included.",
            "Timeline for implementation of conservation measures proposed."
          ]
        },
        tourism: {
          title: "Tourism Impact Analysis",
          summary: `This tourism impact report for ${selectedLake} evaluates how projected changes will affect recreational usage and tourism-based economies. Using the ${predictionScenario} climate scenario model, we've analyzed how water level and quality changes by 2035 will impact visitor experiences and local businesses.`,
          additionalInfo: [
            "Beach and shoreline recreational areas show significant vulnerability.",
            "Seasonal tourism patterns likely to shift with changing water conditions.",
            "Economic impact assessment for tourism-dependent communities included."
          ]
        }
      };
      
      const focusData = reportFocusContent[reportType as keyof typeof reportFocusContent];
      
      // Set up document styles
      doc.setFillColor(33, 63, 154);
      doc.rect(0, 0, 210, 25, 'F');
      
      // Add title
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.text("HydroVision AI: Lake Analysis Report", 105, 15, { align: 'center' });
      
      // Add lake name subtitle and report focus
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text(`${selectedLake} Analysis: ${focusData.title}`, 105, 35, { align: 'center' });
      
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
      const summaryText = focusData.summary;
      
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
      
      // Report focus-specific insights
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text(`${focusData.title} Insights`, 20, yPosFindings + 40);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      focusData.additionalInfo.forEach((info, i) => {
        doc.text(`• ${info}`, 20, yPosFindings + 50 + (i * 6));
      });
      
      // Primary threats
      const yPosThreats = yPosFindings + 70;
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("Primary Threats", 20, yPosThreats);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      currentLakeData.threats.forEach((threat, i) => {
        doc.text(`• ${threat}`, 20, yPosThreats + 10 + (i * 6));
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
      
      // Add Masuria Region Satellite Imagery section
      doc.addPage();
      
      // Title for satellite imagery section
      doc.setFontSize(16);
      doc.setTextColor(33, 63, 154);
      doc.text("Masuria Region Satellite Imagery", 105, 20, { align: 'center' });
      
      // Satellite imagery info
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text("Analysis based on satellite imagery from the following sources:", 20, 35);
      doc.text("• Sentinel-2 multispectral imaging (10m resolution)", 25, 45);
      doc.text("• Landsat 8 thermal and infrared bands (30m resolution)", 25, 51);
      doc.text("• MODIS daily water coverage data (250m resolution)", 25, 57);
      
      // Draw satellite coverage map
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(20, 65, 170, 80, 3, 3, 'F');
      
      // Draw simplified map of Masuria region
      // Lakes
      doc.setFillColor(200, 220, 240);
      
      // Lake Śniardwy (largest)
      doc.ellipse(105, 95, 30, 15, 'F');
      
      // Lake Mamry
      doc.ellipse(85, 80, 15, 10, 'F');
      
      // Lake Niegocin
      doc.ellipse(120, 105, 10, 8, 'F');
      
      // Other small lakes
      doc.ellipse(70, 90, 8, 6, 'F');
      doc.ellipse(130, 85, 6, 5, 'F');
      doc.ellipse(95, 110, 7, 5, 'F');
      
      // Land
      doc.setFillColor(230, 230, 210);
      
      // Add labels
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 150);
      doc.text("Lake Śniardwy", 105, 95, { align: 'center' });
      doc.text("Lake Mamry", 85, 80, { align: 'center' });
      doc.text("Lake Niegocin", 120, 105, { align: 'center' });
      
      // Add satellite coverage grid
      doc.setDrawColor(255, 0, 0);
      doc.setLineDashPattern([1, 1], 0);
      doc.setLineWidth(0.2);
      
      // Draw grid lines representing satellite path
      for (let i = 0; i <= 170; i += 20) {
        doc.line(20 + i, 65, 20 + i, 145);
      }
      
      for (let i = 0; i <= 80; i += 20) {
        doc.line(20, 65 + i, 190, 65 + i);
      }
      
      doc.setLineDashPattern([], 0);
      
      // Add legend
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(200, 220, 240);
      doc.rect(25, 150, 5, 5, 'F');
      doc.text("Lakes", 35, 154);
      
      doc.setFillColor(230, 230, 210);
      doc.rect(65, 150, 5, 5, 'F');
      doc.text("Land", 75, 154);
      
      doc.setDrawColor(255, 0, 0);
      doc.setLineDashPattern([1, 1], 0);
      doc.line(100, 152, 115, 152);
      doc.setLineDashPattern([], 0);
      doc.text("Satellite Coverage Grid", 140, 154);
      
      // Add satellite image processing notes
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text("Image processing: Enhanced vegetation index (EVI) and normalized difference water index (NDWI)", 105, 170, { align: 'center' });
      doc.text("AI analysis: Deep learning segmentation to detect water boundaries and changes over time", 105, 176, { align: 'center' });
      
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
      
      // Add new page for recommendations and about project
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
      
      // About Project section
      doc.setFontSize(14);
      doc.setTextColor(33, 63, 154);
      doc.text("About This Project", 20, 80);
      
      // Project description
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const projectText = "HydroVision AI is an advanced analytical platform that combines satellite imagery, historical data, and machine learning to predict hydrological changes in the Masuria Lake District. The project aims to provide actionable insights for conservation efforts, resource management, and climate adaptation planning.";
      const projectTextLines = doc.splitTextToSize(projectText, 170);
      doc.text(projectTextLines, 20, 90);
      
      // Project visuals - simple technology stack diagram
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(20, 110, 170, 60, 3, 3, 'F');
      
      // Draw simplified technology stack diagram
      // Data sources box
      doc.setFillColor(220, 230, 240);
      doc.roundedRect(30, 120, 40, 25, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text("Data Sources", 50, 127, { align: 'center' });
      doc.setFontSize(6);
      doc.text("• Satellite Imagery", 35, 134);
      doc.text("• Historical Water Levels", 35, 139);
      doc.text("• Climate Models", 35, 144);
      
      // Arrow
      doc.setDrawColor(100, 100, 100);
      doc.setLineWidth(0.5);
      doc.line(70, 133, 85, 133);
      doc.line(85, 133, 82, 131);
      doc.line(85, 133, 82, 135);
      
      // Processing box
      doc.setFillColor(220, 240, 230);
      doc.roundedRect(85, 120, 40, 25, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text("AI Processing", 105, 127, { align: 'center' });
      doc.setFontSize(6);
      doc.text("• Image Segmentation", 90, 134);
      doc.text("• Time Series Analysis", 90, 139);
      doc.text("• Predictive Modeling", 90, 144);
      
      // Arrow
      doc.setDrawColor(100, 100, 100);
      doc.line(125, 133, 140, 133);
      doc.line(140, 133, 137, 131);
      doc.line(140, 133, 137, 135);
      
      // Output box
      doc.setFillColor(240, 220, 220);
      doc.roundedRect(140, 120, 40, 25, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text("Analysis Output", 160, 127, { align: 'center' });
      doc.setFontSize(6);
      doc.text("• Water Level Trends", 145, 134);
      doc.text("• Surface Area Changes", 145, 139);
      doc.text("• Visualization & Reports", 145, 144);
      
      // Footer
      doc.setFillColor(33, 63, 154);
      doc.rect(0, 277, 210, 20, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("HydroVision AI: Advanced Hydrological Analysis Using Satellite Data and AI", 105, 285, { align: 'center' });
      doc.setFontSize(8);
      doc.text(`Report ID: HV-${Date.now().toString().substring(6)}`, 105, 290, { align: 'center' });
      
      // Save the PDF with proper filename
      doc.save(`${selectedLake.replace(/\s+/g, "_")}_${reportType}_Analysis_Report.pdf`);
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
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="lake-selection">Select Lake for Analysis</Label>
        <Select value={selectedLake} onValueChange={setSelectedLake}>
          <SelectTrigger id="lake-selection" className="h-8">
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
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="waterLevels" className="text-xs px-2">
              <Droplets className="h-3 w-3 mr-1" />
              Water Levels
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="text-xs px-2">
              <BarChart3 className="h-3 w-3 mr-1" />
              Scenarios
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="waterLevels" className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label htmlFor="report-type" className="text-xs">Report Focus</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type" className="h-8">
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
          
          <TabsContent value="scenarios" className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label htmlFor="prediction-scenario" className="text-xs">Climate Scenario</Label>
              <Select value={predictionScenario} onValueChange={setPredictionScenario}>
                <SelectTrigger id="prediction-scenario" className="h-8">
                  <SelectValue placeholder="Select climate scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative (Low Impact)</SelectItem>
                  <SelectItem value="moderate">Moderate (Medium Impact)</SelectItem>
                  <SelectItem value="aggressive">Aggressive (High Impact)</SelectItem>
                </SelectContent>
              </Select>
              
              <p className="text-[10px] text-gray-500 mt-1">
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

      {/* Preview area for charts */}
      <div className="mt-2">
        <Label className="block mb-1 text-xs">Data Preview</Label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="p-2 bg-white rounded-md border border-gray-200 h-36">
            <h4 className="text-xs font-medium mb-1 text-blue-800">Water Level Trends</h4>
            <div className="h-[110px]">
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
          <div className="p-2 bg-white rounded-md border border-gray-200 h-36">
            <h4 className="text-xs font-medium mb-1 text-blue-800">Surface Area Changes</h4>
            <div className="h-[110px]">
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

      {!analysisResult && (
        <div className="flex items-start gap-1 p-1.5 bg-amber-50 rounded-md border border-neutral-200 border-amber-200 dark:border-neutral-800">
          <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-amber-700">
            For more detailed analysis, run "Analyze Current Trends" in the AI Predictions panel.
          </p>
        </div>
      )}

      <Button 
        onClick={handleGenerateReport} 
        disabled={isGenerating} 
        className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
      >
        {isGenerating ? (
          <>
            <FileText className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
            Generating Lake Analysis...
          </>
        ) : (
          <>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Generate Lake Analysis Report
          </>
        )}
      </Button>
    </div>
  )
}
