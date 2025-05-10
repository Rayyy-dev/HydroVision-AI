"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface ImageComparisonProps {
  selectedRegion: string
}

export default function ImageComparison({ selectedRegion }: ImageComparisonProps) {
  const [sliderValue, setSliderValue] = useState(50)
  const [comparisonMode, setComparisonMode] = useState<"slider" | "sideBySide">("slider")

  // Get region-specific images
  const getRegionImages = (region: string) => {
    // In a real app, these would be actual satellite images for different regions
    // For this prototype, we'll use placeholder images
    if (region === "Lake Śniardwy") {
      return {
        current: "/images/sniardwy-2025.png",
        future: "/images/sniardwy-2035.png",
      }
    } else if (region === "Lake Mamry") {
      return {
        current: "/images/mamry-2025.png",
        future: "/images/mamry-2035.png",
      }
    } else if (region === "Lake Niegocin") {
      return {
        current: "/images/niegocin-2025.png",
        future: "/images/niegocin-2035.png",
      }
    } else {
      return {
        current: "/images/masuria-2025.jpg.png",
        future: "/images/masuria-2035.png",
      }
    }
  }

  const images = getRegionImages(selectedRegion)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="slider" onValueChange={(value) => setComparisonMode(value as "slider" | "sideBySide")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="slider">Slider Comparison</TabsTrigger>
          <TabsTrigger value="sideBySide">Side by Side</TabsTrigger>
        </TabsList>

        <TabsContent value="slider" className="pt-4">
          <div className="relative w-full h-[300px] overflow-hidden border border-neutral-200 border-gray-200 rounded-md dark:border-neutral-800">
            <div className="absolute inset-0 bg-white">
              <img
                src={images.future || "/placeholder.svg"}
                alt={`${selectedRegion} 2035 prediction`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-white overflow-hidden" style={{ width: `${sliderValue}%` }}>
              <img
                src={images.current || "/placeholder.svg"}
                alt={`${selectedRegion} 2025 current`}
                className="w-full h-full object-cover"
                style={{ width: `${100 / (sliderValue / 100)}%` }}
              />
            </div>
            <div className="absolute inset-y-0 bg-white w-1 cursor-ew-resize" style={{ left: `${sliderValue}%` }} />

            <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 px-2 py-1 rounded text-xs">
              2025 (Current)
            </div>
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-75 px-2 py-1 rounded text-xs">
              2035 (Predicted)
            </div>
          </div>

          <div className="mt-4 px-4">
            <Slider
              value={[sliderValue]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => setSliderValue(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2025 Current</span>
              <span>2035 Predicted</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sideBySide" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-[300px] border border-neutral-200 border-gray-200 rounded-md overflow-hidden dark:border-neutral-800">
                <img
                  src={images.current || "/placeholder.svg"}
                  alt={`${selectedRegion} 2025 current`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium">2025 (Current)</p>
            </div>

            <div className="space-y-2">
              <div className="h-[300px] border border-neutral-200 border-gray-200 rounded-md overflow-hidden dark:border-neutral-800">
                <img
                  src={images.future || "/placeholder.svg"}
                  alt={`${selectedRegion} 2035 prediction`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium">2035 (Predicted)</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-3 rounded-md border border-neutral-200 border-blue-100 dark:border-neutral-800">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Key Changes Detected by AI</h4>
        <ul className="list-disc pl-5 text-xs text-blue-700 space-y-1">
          <li>Water surface area reduction of approximately 15-20%</li>
          <li>Shoreline retreat most significant on eastern boundaries</li>
          <li>Increased vegetation in previously submerged areas</li>
          <li>Formation of isolated water bodies as main lake recedes</li>
        </ul>
      </div>
    </div>
  )
}
