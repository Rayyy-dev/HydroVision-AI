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

  return (
    <div className="mt-6 px-2">
      <Slider defaultValue={[value]} min={min} max={max} step={1} onValueChange={handleChange} className="my-4" />
      <div className="flex justify-between text-xs text-slate-500">
        <div className="text-center">
          <div className="h-2 border-l border-slate-300 mx-auto mb-1"></div>
          <span>Current ({min})</span>
        </div>
        <div className="text-center">
          <div className="h-2 border-l border-slate-300 mx-auto mb-1"></div>
          <span>Future ({max})</span>
        </div>
      </div>
    </div>
  )
}
