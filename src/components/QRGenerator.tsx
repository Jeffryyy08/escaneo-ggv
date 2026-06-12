'use client'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Download, Printer } from 'lucide-react'

interface Props {
  value: string
  animalName?: string
}

export default function QRGenerator({ value, animalName }: Props) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadQR = async () => {
    setIsDownloading(true)
    try {
      const svg = document.getElementById(`qr-${value}`) as SVGSVGElement | null

      if (!svg) {
        alert('No se encontró el código QR')
        return
      }

      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `QR-${animalName || value}.png`
        downloadLink.href = pngFile
        downloadLink.click()
        setIsDownloading(false)
      }

      img.onerror = () => {
        alert('Error al generar la imagen')
        setIsDownloading(false)
      }

      // ✅ Mismo formato que qr-batch (sin 'data:' prefix para consistencia)
      img.src = 'image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    } catch (error) {
      console.error('Error al descargar QR:', error)
      alert('Error al descargar el código QR')
      setIsDownloading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow border-2 border-gray-200">
      {/* ✅ Configuración IDÉNTICA a qr-batch */}
      <div className="bg-white p-2 mb-2">
        <QRCode
          id={`qr-${value}`}
          value={value}
          size={150}        // ✅ Igual que qr-batch
          level="H"         // ✅ Igual que qr-batch
        />
      </div>
      
      <div className="text-center">
        <p className="font-bold text-gray-800 text-sm">{animalName || 'Sin nombre'}</p>
        <p className="text-xs text-gray-500 font-mono mt-1">{value}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={downloadQR}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download size={14} />
          {isDownloading ? '...' : 'PNG'}
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-600 text-white rounded text-xs font-semibold hover:bg-gray-700 transition-colors"
        >
          <Printer size={14} />
          Imprimir
        </button>
      </div>
    </div>
  )
}