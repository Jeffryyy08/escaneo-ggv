import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import EditAnimalForm from './EditAnimalForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditAnimalPage({ params }: Props) {
  const { id } = await params
  const animal = await prisma.animal.findUnique({ where: { id } })

  if (!animal) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/animals/${id}`} className="flex items-center gap-2 text-[#1B4332] font-bold hover:text-[#2D6A4F] transition-colors">
            <ArrowLeft size={20} />
            Volver a Ficha
          </Link>
          <span className="text-sm font-medium text-[#2D6A4F]/60">Editando Animal</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <EditAnimalForm animal={animal} />
      </main>
    </div>
  )
}
