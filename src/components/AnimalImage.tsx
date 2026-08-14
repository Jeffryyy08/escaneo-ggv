'use client'  // ✅ Esto lo convierte en Client Component

import { useState } from 'react'

interface Props {
  src: string
  alt: string
  species: string
  className?: string
}

const getDefaultImageBySpecies = (species: string): string => {
  const images: Record<string, string> = {
    cabra: '/animals/default-cabra.jpg',
    cerdo: '/animals/default-cerdo.webp',
    ternero: '/animals/default-ternero.jpg',
    oveja: '/animals/default-oveja.webp',
    otro: '/animals/default-otro.png'
  }
  return images[species] || '/animals/default-otro.png'
}

export default function AnimalImage({ src, alt, species, className = '' }: Props) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={() => {
        setImgSrc(getDefaultImageBySpecies(species))
      }}
    />
  )
}