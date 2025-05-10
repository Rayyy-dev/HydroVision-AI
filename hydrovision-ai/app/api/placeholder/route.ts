import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = searchParams.get('width') || '600'
  const height = searchParams.get('height') || '300'
  const text = searchParams.get('text') || 'Placeholder Image'
  const textEncoded = text.replace(/[&<>'"]/g, (char) => {
    switch (char) {
      case '&': return '&amp;'
      case '<': return '&lt;'
      case '>': return '&gt;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return char
    }
  })

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
    <rect width="100%" height="100%" fill="#f5f5f5" />
    <text x="50%" y="50%" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#555555">
      ${textEncoded}
    </text>
  </svg>`

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
} 