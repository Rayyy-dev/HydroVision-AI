import { Suspense } from "react"
import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"
import LoadingDashboard from "@/components/loading-dashboard"

export const metadata: Metadata = {
  title: "HydroVision AI - Hydrological Change Analysis",
  description: "Advanced hydrological monitoring and prediction platform for the Masuria region",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingDashboard />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}
