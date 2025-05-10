"use client"

import { useRef, useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"

// Mock water body data for different years
const waterBodiesData = {
  2020: [
    { id: 1, name: "Lake Śniardwy", lat: 53.7414, lng: 21.7481, size: 0.9 },
    { id: 2, name: "Lake Mamry", lat: 54.1311, lng: 21.7328, size: 0.85 },
    { id: 3, name: "Lake Niegocin", lat: 53.9833, lng: 21.7333, size: 0.8 },
    { id: 4, name: "Lake Roś", lat: 53.6667, lng: 21.9167, size: 0.75 },
    { id: 5, name: "Lake Tałty", lat: 53.8, lng: 21.55, size: 0.8 },
  ],
  2025: [
    { id: 1, name: "Lake Śniardwy", lat: 53.7414, lng: 21.7481, size: 0.8 },
    { id: 2, name: "Lake Mamry", lat: 54.1311, lng: 21.7328, size: 0.75 },
    { id: 3, name: "Lake Niegocin", lat: 53.9833, lng: 21.7333, size: 0.7 },
    { id: 4, name: "Lake Roś", lat: 53.6667, lng: 21.9167, size: 0.65 },
    { id: 5, name: "Lake Tałty", lat: 53.8, lng: 21.55, size: 0.7 },
  ],
  2030: [
    { id: 1, name: "Lake Śniardwy", lat: 53.7414, lng: 21.7481, size: 0.7 },
    { id: 2, name: "Lake Mamry", lat: 54.1311, lng: 21.7328, size: 0.7 },
    { id: 3, name: "Lake Niegocin", lat: 53.9833, lng: 21.7333, size: 0.65 },
    { id: 4, name: "Lake Roś", lat: 53.6667, lng: 21.9167, size: 0.6 },
    { id: 5, name: "Lake Tałty", lat: 53.8, lng: 21.55, size: 0.65 },
  ],
  2035: [
    { id: 1, name: "Lake Śniardwy", lat: 53.7414, lng: 21.7481, size: 0.6 },
    { id: 2, name: "Lake Mamry", lat: 54.1311, lng: 21.7328, size: 0.6 },
    { id: 3, name: "Lake Niegocin", lat: 53.9833, lng: 21.7333, size: 0.55 },
    { id: 4, name: "Lake Roś", lat: 53.6667, lng: 21.9167, size: 0.5 },
    { id: 5, name: "Lake Tałty", lat: 53.8, lng: 21.55, size: 0.55 },
  ],
}

interface MapViewProps {
  selectedYear: number
  onRegionSelect: (region: string) => void
}

export default function MapView({ selectedYear, onRegionSelect }: MapViewProps) {
  const mapRef = useRef(null)
  const [zoom, setZoom] = useState(9)
  const [previousYear, setPreviousYear] = useState(selectedYear)
  const [transitionActive, setTransitionActive] = useState(false)

  // Get the closest year data we have
  const getYearData = (year: number) => {
    const years = Object.keys(waterBodiesData).map(Number)
    const closestYear = years.reduce((prev, curr) => {
      return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    })
    return waterBodiesData[closestYear as keyof typeof waterBodiesData]
  }

  // Handle year changes with transition effect
  useEffect(() => {
    if (selectedYear !== previousYear) {
      setTransitionActive(true);
      const timer = setTimeout(() => {
        setPreviousYear(selectedYear);
        setTransitionActive(false);
      }, 500); // Match this to the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [selectedYear, previousYear]);

  const waterBodies = getYearData(selectedYear)

  // Helper function to determine which satellite image to show
  const getSatelliteImage = (year: number) => {
    if (year >= 2030) {
      return '/images/masuria-2035.png';
    }
    return '/images/masuria-2025.jpg.png';
  };

  const handleMarkerClick = (name: string) => {
    onRegionSelect(name)
  }

  // Calculate positions based on a simple projection
  // This is a very simplified approach - in a real app, you'd use proper map projections
  const calculatePosition = (lat: number, lng: number, zoom: number) => {
    // Center of our "map"
    const centerLat = 53.87
    const centerLng = 21.75

    // Simple scaling factor based on zoom
    const scale = zoom * 50

    // Calculate position relative to center
    const x = (lng - centerLng) * scale + 50 // 50% is center of container
    const y = (centerLat - lat) * scale + 50 // 50% is center of container

    return { x: `${x}%`, y: `${y}%` }
  }

  return (
    <>
      {/* Simplified map representation */}
      <div
        ref={mapRef}
        className="w-full h-full relative rounded-lg overflow-hidden"
      >
        {/* Current satellite image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${getSatelliteImage(selectedYear)}')`,
            opacity: transitionActive ? 0 : 1,
          }}
        />
        
        {/* Previous satellite image (for transition) */}
        {transitionActive && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${getSatelliteImage(previousYear)}')`,
            }}
          />
        )}
        
        {/* Map title and year indicator */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 p-2 rounded-md shadow-sm z-10">
          <div className="text-sm font-medium">Masuria Region</div>
          <div className="text-xs text-blue-600">Year: {selectedYear}</div>
          {transitionActive && <div className="text-xs text-green-600">Processing satellite data...</div>}
        </div>

        {/* Satellite data summary */}
        <div className="absolute top-2 left-16 bg-white bg-opacity-90 p-2 rounded-md shadow-sm z-10">
          <div className="text-xs font-medium mb-1">Satellite Data</div>
          <div className="space-y-1">
            <div className="flex items-center text-xs">
              <span className="text-gray-600">Resolution:</span>
              <span className="ml-1 text-gray-800">15m</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-gray-600">Coverage:</span>
              <span className="ml-1 text-gray-800">97%</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-gray-600">Satellite:</span>
              <span className="ml-1 text-gray-800">Sentinel-2</span>
            </div>
          </div>
        </div>

        {/* Water bodies */}
        {waterBodies.map((lake) => {
          const position = calculatePosition(lake.lat, lake.lng, zoom)
          return (
            <div
              key={lake.id}
              className="absolute bg-blue-400 bg-opacity-70 rounded-full cursor-pointer hover:bg-blue-500 transition-all"
              style={{
                width: `${lake.size * 40}px`,
                height: `${lake.size * 40}px`,
                border: "2px solid rgba(255, 255, 0.7)",
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
              }}
              title={lake.name}
              onClick={() => handleMarkerClick(lake.name)}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold opacity-0 hover:opacity-100 transition-opacity">
                {lake.name}
              </div>
            </div>
          )
        })}

        {/* Custom zoom controls */}
        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          <button
            className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
            onClick={() => setZoom(Math.min(zoom + 1, 20))}
          >
            <Plus size={16} />
          </button>
          <button
            className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
            onClick={() => setZoom(Math.max(zoom - 1, 1))}
          >
            <Minus size={16} />
          </button>
        </div>

        {/* Map legend */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-md shadow-sm">
          <div className="text-xs font-medium mb-1">Satellite Imagery</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-xs">Vegetation</span>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Water</span>
            <div className="w-3 h-3 rounded-full bg-amber-200"></div>
            <span className="text-xs">Land</span>
          </div>
        </div>
      </div>
    </>
  )
}
