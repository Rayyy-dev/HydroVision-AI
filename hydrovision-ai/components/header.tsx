"use client"

import { useState } from "react"
import { Info, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import HydroVisionLogo from "@/components/hydrovision-logo"

interface HeaderProps {
  onAboutClick: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Header({ onAboutClick, activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <HydroVisionLogo className="h-8 w-auto text-blue-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">HydroVision AI</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`text-slate-700 hover:text-blue-600 font-medium ${activeTab === "dashboard" ? "text-blue-600" : ""}`}
            >
              Dashboard
            </button>
            <Button variant="ghost" onClick={onAboutClick} className="flex items-center">
              <Info className="mr-1 h-4 w-4" />
              About Project
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("dashboard")
                    setMobileMenuOpen(false)
                  }}
                  className={`block text-slate-700 hover:text-blue-600 font-medium ${activeTab === "dashboard" ? "text-blue-600" : ""}`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onAboutClick()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center"
                >
                  <Info className="mr-1 h-4 w-4" />
                  About Project
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
