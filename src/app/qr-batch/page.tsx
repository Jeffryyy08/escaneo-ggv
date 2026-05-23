'use client'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Download, Printer, QrCode, Hash, HashIcon, Layers } from 'lucide-react'
import Link from 'next/link'

export default function QRBatchPage() {
  const [prefix, setPrefix] = useState('GGV-CAB')
  const [startNum, setStartNum] = useState(1)
  const [quantity, setQuantity] = useState(10)
  const [qrCodes, setQrCodes] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQRs = () => {
    setIsGenerating(true)
    // Pequeño delay para mostrar feedback visual
    setTimeout(() => {
      const codes = Array.from({ length: quantity }, (_, i) => {
        const num = String(startNum + i).padStart(3, '0')
        return `${prefix}-${num}`
      })
      setQrCodes(codes)
      setIsGenerating(false)
    }, 300)
  }

  const downloadAll = () => {
    qrCodes.forEach((code, index) => {
      setTimeout(() => {
        const svg = document.getElementById(`qr-batch-${index}`) as SVGSVGElement | null
        if (!svg) {
          console.error(`No se encontró el QR ${index}`)
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
          downloadLink.download = `${code}.png`
          downloadLink.href = pngFile
          downloadLink.click()
        }
        img.onerror = () => console.error(`Error al generar QR ${code}`)
        img.src = 'image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
      }, index * 150)
    })
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      
      {/* Navbar consistente */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-[#1B4332] rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1B4332]">
              GGV <span className="text-[#BC6C25] font-normal">QR Batch</span>
            </span>
          </Link>
          <Link 
            href="/animals/new" 
            className="text-sm font-medium text-[#2D6A4F] hover:text-[#1B4332] transition-colors"
          >
            ← Volver a Registrar
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B4332] mb-2">
            Generar QRs en Lote
          </h1>
          <p className="text-[#2D6A4F]/70 text-lg">
            Crea múltiples códigos QR para aretes de forma rápida y consistente
          </p>
        </div>

        {/* Panel de Configuración */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#1B4332]/10 p-6 md:p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#BC6C25] border border-[#1B4332]/10">
              <Layers size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#1B4332]">Configuración del Lote</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Prefijo */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                <Hash size={14} className="text-[#2D6A4F]" />
                Prefijo
              </label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                placeholder="GGV-CAB"
                className="w-full px-4 py-3 border border-[#1B4332]/20 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-[#FEFAE0] text-[#1B4332] placeholder:text-[#2D6A4F]/40 font-mono font-bold uppercase"
              />
              <p className="text-xs text-[#2D6A4F]/50">Ej: GGV-CAB, GGV-CER, GGV-TER</p>
            </div>

            {/* Número Inicial */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                <HashIcon size={14} className="text-[#2D6A4F]" />
                Número Inicial
              </label>
              <input
                type="number"
                value={startNum}
                onChange={(e) => setStartNum(parseInt(e.target.value) || 1)}
                min="1"
                max="999"
                className="w-full px-4 py-3 border border-[#1B4332]/20 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-[#FEFAE0] text-[#1B4332] font-mono font-bold"
              />
              <p className="text-xs text-[#2D6A4F]/50">Desde 1 hasta 999</p>
            </div>

            {/* Cantidad */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                <Layers size={14} className="text-[#2D6A4F]" />
                Cantidad
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 100))}
                min="1"
                max="100"
                className="w-full px-4 py-3 border border-[#1B4332]/20 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-[#FEFAE0] text-[#1B4332] font-mono font-bold"
              />
              <p className="text-xs text-[#2D6A4F]/50">Máximo 100 por lote</p>
            </div>
          </div>

          {/* Preview del formato */}
          <div className="bg-[#FEFAE0] rounded-xl p-4 mb-6 border border-[#1B4332]/10">
            <p className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wide mb-2">Vista Previa</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(quantity, 5) }, (_, i) => {
                const num = String(startNum + i).padStart(3, '0')
                return (
                  <span key={i} className="px-3 py-1 bg-white rounded-lg border border-[#1B4332]/20 text-xs font-mono font-bold text-[#1B4332]">
                    {prefix}-{num}
                  </span>
                )
              })}
              {quantity > 5 && (
                <span className="px-3 py-1 text-xs text-[#2D6A4F]/50">+{quantity - 5} más...</span>
              )}
            </div>
          </div>

          {/* Botón Generar */}
          <button
            onClick={generateQRs}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white rounded-xl font-bold text-lg hover:from-[#2D6A4F] hover:to-[#1B4332] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <QrCode size={20} />
            {isGenerating ? 'Generando...' : `Generar ${quantity} Códigos QR`}
          </button>
        </div>

        {/* Resultados */}
        {qrCodes.length > 0 && (
          <div className="space-y-6">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1B4332]">QRs Generados</h2>
                <p className="text-[#2D6A4F]/60 text-sm">{qrCodes.length} códigos listos para descargar</p>
              </div>
              <button
                onClick={downloadAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#BC6C25] text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-md"
              >
                <Download size={18} />
                Descargar Todos ({qrCodes.length})
              </button>
            </div>

            {/* Grid de QRs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {qrCodes.map((code, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm hover:shadow-lg hover:border-[#1B4332]/30 transition-all p-4 flex flex-col items-center"
                >
                  {/* QR Code */}
                  <div className="bg-[#FEFAE0] p-3 rounded-xl mb-3 border border-[#1B4332]/10 group-hover:scale-105 transition-transform">
                    <QRCode
                      id={`qr-batch-${index}`}
                      value={code}
                      size={120}
                      level="H"
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    />
                  </div>
                  
                  {/* Código de texto */}
                  <p className="font-mono font-bold text-xs text-[#1B4332] text-center truncate w-full mb-2">
                    {code}
                  </p>
                  
                  {/* Botón individual de descarga */}
                  <button
                    onClick={() => {
                      const svg = document.getElementById(`qr-batch-${index}`) as unknown as SVGSVGElement
                      if (svg) {
                        const svgData = new XMLSerializer().serializeToString(svg)
                        const canvas = document.createElement('canvas')
                        const ctx = canvas.getContext('2d')
                        const img = new Image()
                        img.onload = () => {
                          canvas.width = img.width
                          canvas.height = img.height
                          ctx?.drawImage(img, 0, 0)
                          const pngFile = canvas.toDataURL('image/png')
                          const link = document.createElement('a')
                          link.download = `${code}.png`
                          link.href = pngFile
                          link.click()
                        }
                        img.src = 'image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
                      }
                    }}
                    className="w-full py-2 bg-[#FEFAE0] text-[#1B4332] text-xs font-bold rounded-lg hover:bg-[#1B4332] hover:text-white transition-all flex items-center justify-center gap-1"
                  >
                    <Download size={12} />
                    PNG
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {qrCodes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#1B4332]/10">
            <div className="w-16 h-16 bg-[#FEFAE0] rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={32} className="text-[#2D6A4F]" />
            </div>
            <p className="text-[#2D6A4F]/60 font-medium">
              Configura los parámetros y genera tus códigos QR
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-[#2D6A4F]/50 text-sm border-t border-[#1B4332]/10">
        <p>Proyecto para Expotecnia © {new Date().getFullYear()} - GGV Escaneo Inteligente</p>
      </footer>
    </div>
  )
}