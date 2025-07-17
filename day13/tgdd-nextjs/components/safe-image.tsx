"use client"

import Image from "next/image"
import { useState } from "react"

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  width?: number
  height?: number
}

export default function SafeImage({ src, alt, fill, className, sizes, width, height }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("/placeholder.svg?height=200&width=200")
    }
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    unoptimized: src.includes("imgur.com") || src.includes("escuelajs.co"),
  }

  if (fill) {
    return <Image {...imageProps} fill sizes={sizes} />
  }

  return <Image {...imageProps} width={width || 200} height={height || 200} />
}
