import type { SVGProps } from "react"

export default function HydroSightLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 6.477 12s4.477 10 10z" />
      <path d="M6 12c0-3.314 2.686-6 6-6s6 2.686 6" />
      <path d="M6 16c0-1.657 2.686-3 6-3s6 1.343 6 3" />
      <path d="M6 20c0-1.105 2.686-2 6-2s6 .895 6 2" />
      <path d="M12 12v10" />
    </svg>
  )
}
