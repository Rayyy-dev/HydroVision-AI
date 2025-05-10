import type { SVGProps } from "react"

export default function HydroVisionLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M12 8v-2" />
      <path d="M12 18v-2" />
      <path d="M16 12h2" />
      <path d="M6 12h2" />
      <path d="M14.5 9.5l1.5-1.5" />
      <path d="M8 16l1.5-1.5" />
      <path d="M9.5 9.5L8 8" />
      <path d="M16 16l-1.5-1.5" />
    </svg>
  )
}
