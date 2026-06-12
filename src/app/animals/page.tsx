import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Pencil, Trash2, Plus, Search, AlertCircle } from 'lucide-react'
import { deleteAnimal } from '@/app/actions'
import Image from 'next/image'

export default async function AnimalsPage() {
  const animals = await prisma.animal.findMany({ orderBy: { created_at: 'desc' } })

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      {/* Navbar consistente con la Home */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full" />
            <span className="font-bold text-xl tracking-tight text-[#1B4332]">GGV <span className="text-[#BC6C25] font-normal">Inventario</span></span>
          </Link>
          <Link
            href="/animals/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            Nuevo Animal
          </Link>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1B4332]">Inventario de <span className="text-[#BC6C25] font-bold">Animales</span></h1>
            <p className="text-[#2D6A4F]/70 mt-1">Gestiona y monitorea el estado de tu ganado</p>
          </div>
        </div>

        {/* Estado Vacío */}
        {animals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm">
            <div className="w-16 h-16 bg-[#FEFAE0] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-[#BC6C25]" />
            </div>
            <h3 className="text-xl font-bold text-[#1B4332]">No hay animales registrados</h3>
            <p className="text-[#2D6A4F]/60 mt-2 mb-6 max-w-md mx-auto">
              Comienza registrando tu primer animal para ver su historial, peso y tratamientos aquí.
            </p>
            <Link
              href="/animals/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#BC6C25] text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-md"
            >
              <Plus size={18} />
              Registrar Primer Animal
            </Link>
          </div>
        ) : (
          /* Grid de Tarjetas */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map(a => (
              <div
                key={a.id}
                className="group bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm hover:shadow-lg hover:border-[#1B4332]/30 transition-all duration-300 p-6 relative overflow-hidden"
              >
                {/* Barra superior decorativa */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B4332] to-[#BC6C25] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FEFAE0] border border-[#1B4332]/10 flex items-center justify-center text-[#1B4332] font-bold text-xl">
                      {a.name ? a.name.charAt(0).toUpperCase() : '🐐'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1B4332]">{a.name || 'Sin nombre'}</h3>
                      <span className="inline-block px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold rounded-md uppercase tracking-wide">
                        {a.species}
                      </span>
                    </div>
                  </div>

                  {/* Acciones rápidas */}
                  <div className="flex gap-1">
                    <Link
                      href={`/animals/${a.id}`}
                      className="p-2 text-[#2D6A4F] hover:bg-[#FEFAE0] hover:text-[#1B4332] rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Pencil size={16} />
                    </Link>
                    <form action={deleteAnimal} className="inline">
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Información compacta */}
                <div className="space-y-3 text-sm text-[#2D6A4F]/70 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Código QR:</span>
                    <span className="font-mono bg-[#FEFAE0] px-2 py-0.5 rounded text-[#1B4332] font-semibold text-xs">
                      {a.qr_code}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Nacimiento:</span>
                    <span>{a.birth_date ? new Date(a.birth_date).toLocaleDateString('es-ES') : 'N/A'}</span>
                  </div>
                </div>

                {/* Botón principal de la tarjeta */}
                <Link
                  href={`/animals/${a.id}`}
                  className="w-full block text-center py-2.5 bg-[#FEFAE0] text-[#1B4332] font-bold rounded-xl hover:bg-[#1B4332] hover:text-white transition-all text-sm group-hover:shadow-md"
                >
                  Ver Ficha Técnica
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}