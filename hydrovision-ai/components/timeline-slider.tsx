"use client"

import { Slider } from "@/components/ui/slider"

interface TimelineSliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export default function TimelineSlider({ min, max, value, onChange }: TimelineSliderProps) {
  const handleChange = (values: number[]) => {
    onChange(values[0])
  }

  // Generate year markers
  const yearMarkers = []
  const step = Math.ceil((max - min) / 5)
  for (let year = min; year <= max; year += step) {
    yearMarkers.push(year)
  }
  if (yearMarkers[yearMarkers.length - 1] !== max) {
    yearMarkers.push(max)
  }

  return (
    <div className="mt-6 px-2">
      <Slider defaultValue={[value]} min={min} max={max} step={1} onValueChange={handleChange} className="my-4" />
      <div className="flex justify-between text-xs text-slate-500">
        {yearMarkers.map((year) => (
          <div key={year} className="text-center">
            <div className="h-2 border-l border-slate-300 mx-auto mb-1"></div>
            {year}
          </div>
        ))}
      </div>
    </div>
  )
}
