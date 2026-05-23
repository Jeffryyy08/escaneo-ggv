'use client'
import { useEffect, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useRouter } from 'next/navigation'
import { AlertCircle, Camera, X } from 'lucide-react'

export default function QRScanner() {
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null)
  const [detectedCode, setDetectedCode] = useState<string | null>(null) // Para mostrar feedback visual
  const router = useRouter()

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      stream.getTracks().forEach(track => track.stop())
      return true
    } catch (err: any) {
      setError('No se pudo acceder a la cámara. Verifica los permisos.')
      return false
    }
  }

  const startScanning = async () => {
    setError(null)
    setDetectedCode(null)
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) return

    setIsScanning(true)

    // Pequeña pausa para renderizar
    setTimeout(async () => {
      try {
        const qr = new Html5Qrcode('reader')
        setHtml5QrCode(qr)

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false // Intentar voltear si es necesario
        }

        await qr.start(
          { facingMode: 'environment' },
          config,
          (decodedText: string, decodedResult: any) => {
            console.log("✅ QR Detectado:", decodedText)
            setDetectedCode(decodedText)
            
            // ¡IMPORTANTE! Pausar para evitar lecturas múltiples
            qr.pause()
            
            // Pequeño delay para asegurar que la UI se actualice antes de irse
            setTimeout(() => {
              stopScanning(qr)
              router.push(`/animals/${encodeURIComponent(decodedText)}`)
            }, 500)
          },
          (errorMessage) => {
            // parse error, ignore
          }
        )
      } catch (err: any) {
        console.error("Error iniciando QR:", err)
        setError("Error al iniciar la cámara.")
        setIsScanning(false)
      }
    }, 500)
  }

  const stopScanning = (qrInstance?: Html5Qrcode) => {
    const target = qrInstance || html5QrCode
    if (target) {
      try {
        target.stop()
        target.clear()
      } catch (err) {}
    }
    setIsScanning(false)
    setHtml5QrCode(null)
  }

  useEffect(() => {
    return () => {
      if (html5QrCode) {
        try {
          html5QrCode.stop()
          html5QrCode.clear()
        } catch (err) {}
      }
    }
  }, [html5QrCode])

  return (
    <div className="w-full max-w-md mx-auto">
      {!isScanning ? (
        <button
          onClick={startScanning}
          className="w-full flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all border-2 border-blue-500 active:scale-95"
        >
          <div className="bg-white/20 p-4 rounded-full">
            <Camera size={40} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">Iniciar Escáner</span>
          <span className="text-blue-100 text-sm">Toca para escanear el arete</span>
        </button>
      ) : (
        <div className="relative">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg relative border-4 border-blue-500">
            <div id="reader" className="w-full"></div>
            
            {detectedCode && (
              <div className="absolute top-0 left-0 right-0 bg-green-500 text-white p-2 text-center font-bold animate-pulse">
                ✅ Código Leído: {detectedCode}
              </div>
            )}

            <button 
              onClick={() => stopScanning()}
              className="absolute top-4 right-4 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 shadow-lg z-50"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-blue-600 font-semibold animate-pulse">📷 Escaneando...</p>
            <p className="text-sm text-gray-500 mt-1">Mantén el QR dentro del recuadro</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 mt-4 text-red-700 bg-red-50 p-4 rounded-lg border border-red-200">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}