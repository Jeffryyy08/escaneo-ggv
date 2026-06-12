import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Pencil, Trash2, ArrowLeft, Calendar, Scale, Pill, Baby, Tag, MapPin } from 'lucide-react'
import { deleteAnimal } from '@/app/actions'
import DeleteButton from '@/components/DeleteButton'

export default async function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  const id = decodeURIComponent(rawId)
  
  const animal = await prisma.animal.findFirst({
    where: { OR: [{ id }, { qr_code: id }] }
  })

  // Estado: No Encontrado
  if (!animal) {
    return (
      <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-lg w-full border border-[#1B4332]/5">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-[#FEFAE0] rounded-full flex items-center justify-center border-4 border-white shadow-inner">
              <Baby size={48} className="text-[#BC6C25]" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1B4332] mb-2">Animal No Encontrado</h2>
          <p className="text-[#2D6A4F]/70 mb-6">
            El código <span className="font-mono font-bold text-[#1B4332]">{id}</span> no está registrado en el inventario.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/animals/new?qr=${encodeURIComponent(id)}`}
              className="w-full py-3.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Baby size={20} />
              Registrar Nuevo Animal
            </Link>
            <Link
              href="/"
              className="w-full py-3.5 bg-white text-[#1B4332] border-2 border-[#1B4332]/20 rounded-xl font-bold hover:bg-[#FEFAE0] transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Funciones auxiliares
  const formatDate = (date: any) => {
    if (!date) return 'No registrado'
    return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const medicationsCount = (animal.medications as any[])?.length || 0
  const pregnanciesCount = (animal.pregnancies as any[])?.length || 0
  const weightRecordsCount = (animal.weight_records as any[])?.length || 0

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/animals" className="flex items-center gap-2 text-[#1B4332] font-bold hover:text-[#2D6A4F] transition-colors">
            <ArrowLeft size={20} />
            Inventario
          </Link>
          <div className="flex gap-3">
            <Link
              href={`/animals/${animal.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-[#FEFAE0] text-[#1B4332] border border-[#1B4332]/20 rounded-lg font-bold hover:bg-[#2D6A4F] hover:text-white hover:border-transparent transition-all"
            >
              <Pencil size={16} />
              Editar
            </Link>
            <form action={deleteAnimal} className="inline">
              <input type="hidden" name="id" value={animal.id} />
              <DeleteButton />
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        
        {/* Tarjeta Principal: Perfil */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] p-8 text-white relative">
            {/* Patrón de fondo sutil (opcional) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
               <Baby size={150} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <Tag size={16} />
                  <span className="uppercase tracking-widest text-xs font-bold">{animal.species}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                  {animal.name || 'Sin Nombre'}
                </h1>
                <p className="bg-white/20 inline-block px-4 py-1.5 rounded-full font-mono text-sm font-medium backdrop-blur-md">
                  ID: {animal.qr_code}
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <p className="text-sm opacity-80">Registrado el</p>
                <p className="font-bold text-lg">{formatDate(animal.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Grid de Información Básica */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FEFAE0] p-5 rounded-2xl border border-[#1B4332]/5">
              <div className="flex items-center gap-3 mb-2 text-[#BC6C25]">
                <Calendar size={20} />
                <span className="text-xs font-bold uppercase">Nacimiento</span>
              </div>
              <p className="font-bold text-[#1B4332] text-lg">{formatDate(animal.birth_date)}</p>
            </div>
            
            <div className="bg-[#FEFAE0] p-5 rounded-2xl border border-[#1B4332]/5">
              <div className="flex items-center gap-3 mb-2 text-[#2D6A4F]">
                <Baby size={20} />
                <span className="text-xs font-bold uppercase">Padre</span>
              </div>
              <p className="font-bold text-[#1B4332] truncate">{animal.parent_father || 'Desconocido'}</p>
            </div>

            <div className="bg-[#FEFAE0] p-5 rounded-2xl border border-[#1B4332]/5">
              <div className="flex items-center gap-3 mb-2 text-[#2D6A4F]">
                <Baby size={20} />
                <span className="text-xs font-bold uppercase">Madre</span>
              </div>
              <p className="font-bold text-[#1B4332] truncate">{animal.parent_mother || 'Desconocida'}</p>
            </div>

            <div className="bg-[#FEFAE0] p-5 rounded-2xl border border-[#1B4332]/5">
              <div className="flex items-center gap-3 mb-2 text-[#1B4332]">
                <MapPin size={20} />
                <span className="text-xs font-bold uppercase">Ubicación</span>
              </div>
              <p className="font-bold text-[#1B4332]">Establo Principal</p> {/* Placeholder */}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Medicamentos */}
          <div className="bg-white p-6 rounded-2xl border border-[#1B4332]/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[#BC6C25] font-bold text-sm uppercase tracking-wide mb-1">Salud</p>
              <p className="text-3xl font-extrabold text-[#1B4332]">{medicationsCount}</p>
              <p className="text-xs text-[#2D6A4F]/60 mt-1">Aplicaciones</p>
            </div>
            <div className="w-14 h-14 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#BC6C25] group-hover:bg-[#BC6C25] group-hover:text-white transition-colors">
              <Pill size={28} />
            </div>
          </div>

          {/* Preñeces */}
          <div className="bg-white p-6 rounded-2xl border border-[#1B4332]/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[#2D6A4F] font-bold text-sm uppercase tracking-wide mb-1">Reproducción</p>
              <p className="text-3xl font-extrabold text-[#1B4332]">{pregnanciesCount}</p>
              <p className="text-xs text-[#2D6A4F]/60 mt-1">Registros</p>
            </div>
            <div className="w-14 h-14 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
              <Baby size={28} />
            </div>
          </div>

          {/* Pesos */}
          <div className="bg-white p-6 rounded-2xl border border-[#1B4332]/10 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[#1B4332] font-bold text-sm uppercase tracking-wide mb-1">Peso</p>
              <p className="text-3xl font-extrabold text-[#1B4332]">{weightRecordsCount}</p>
              <p className="text-xs text-[#2D6A4F]/60 mt-1">Mediciones</p>
            </div>
            <div className="w-14 h-14 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
              <Scale size={28} />
            </div>
          </div>
        </div>

        {/* Listas Detalladas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Historial Médico */}
          <section className="bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#1B4332] mb-4 flex items-center gap-2">
              <Pill size={20} className="text-[#BC6C25]" />
              Historial Médico
            </h3>
            {medicationsCount > 0 ? (
              <div className="space-y-3">
                {(animal.medications as any[]).map((med: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#FEFAE0] rounded-xl border border-[#1B4332]/5">
                    <span className="font-medium text-[#1B4332] text-sm">{med.notes || 'Sin descripción'}</span>
                    <span className="text-xs font-bold text-[#2D6A4F]/60 bg-white px-2 py-1 rounded">{formatDate(med.date)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#2D6A4F]/50 italic py-4 text-center">No hay medicamentos registrados.</p>
            )}
          </section>

          {/* Registro de Pesos */}
          <section className="bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#1B4332] mb-4 flex items-center gap-2">
              <Scale size={20} className="text-[#1B4332]" />
              Registro de Pesos
            </h3>
            {weightRecordsCount > 0 ? (
              <div className="space-y-3">
                {(animal.weight_records as any[]).map((weight: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#FEFAE0] rounded-xl border border-[#1B4332]/5">
                    <span className="font-medium text-[#1B4332] text-sm">{weight.notes || 'Peso registrado'}</span>
                    <span className="text-xs font-bold text-[#2D6A4F]/60 bg-white px-2 py-1 rounded">{formatDate(weight.date)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#2D6A4F]/50 italic py-4 text-center">No hay registros de peso.</p>
            )}
          </section>
        </div>

      </main>
    </div>
  )
}