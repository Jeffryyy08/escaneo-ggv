'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AnimalForm from '@/components/AnimalForm'
import QRGenerator from '@/components/QRGenerator'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewAnimalPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qrFromUrl = searchParams.get('qr') || ''

  const [createdAnimal, setCreatedAnimal] = useState<{qr_code: string, name?: string | null} | null>(null)

  const handleAnimalCreated = (animalData: {qr_code: string, name?: string | null}) => {
    setCreatedAnimal(animalData)
  }

  const initialData = qrFromUrl ? {
    id: '',
    qr_code: qrFromUrl,
    species: 'cabra',
    name: '',
    birth_date: null,
    parent_father: null,
    parent_mother: null,
    medications: [],
    pregnancies: [],
    lactation_periods: [],
    offspring: [],
    weight_records: [],
    created_at: new Date()
  } as any : null

  // ✅ Vista de éxito después de registrar
  if (createdAnimal) {
    return (
      <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-[#1B4332]/10">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-[#2D6A4F]" />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-[#1B4332] mb-2">¡Registrado Exitosamente!</h2>
          <p className="text-[#2D6A4F]/70 mb-6">
            El animal <span className="font-bold text-[#1B4332]">{createdAnimal.name || createdAnimal.qr_code}</span> ya está en el sistema.
          </p>

          <div className="bg-[#FEFAE0] rounded-2xl p-6 mb-8 border border-[#1B4332]/10">
            <p className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wide mb-3">Código QR del Arete</p>
            <QRGenerator 
              value={createdAnimal.qr_code} 
              animalName={createdAnimal.name || undefined}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/animals/new"
              className="w-full py-3.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              + Registrar Otro Animal
            </Link>
            <Link
              href="/animals"
              className="w-full py-3.5 bg-white text-[#1B4332] border-2 border-[#1B4332]/20 rounded-xl font-bold hover:bg-[#FEFAE0] transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Ver Inventario
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ✅ Vista del formulario
  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/animals" className="flex items-center gap-2 text-[#1B4332] font-bold hover:text-[#2D6A4F] transition-colors">
            <ArrowLeft size={20} />
            Inventario
          </Link>
          <span className="text-sm font-medium text-[#2D6A4F]/60">Nuevo Registro</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <AnimalForm initialData={initialData} onCreated={handleAnimalCreated} />
      </main>
    </div>
  )
}