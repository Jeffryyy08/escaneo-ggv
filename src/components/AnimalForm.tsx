'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveAnimal } from '@/app/actions'
import { Plus, Trash2, Save, X, Tag, Calendar, Baby } from 'lucide-react'
import type { Animal } from '@prisma/client'

interface Props {
  initialData?: Animal | null
  onCreated?: (animalData: { qr_code: string; name?: string | null }) => void
}

// 🔹 Componentes auxiliares (DEFINIDOS FUERA para evitar pérdida de foco)

function InputField({ label, required, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-[#1B4332]">
        {label}
        {required && <span className="text-[#BC6C25] ml-1">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full px-4 py-3 border border-[#1B4332]/20 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#1B4332] placeholder:text-[#2D6A4F]/40 font-medium"
      />
    </div>
  )
}

function SelectField({ label, options, required, ...props }: { label: string; options: string[]; required?: boolean } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-[#1B4332]">
        {label}
        {required && <span className="text-[#BC6C25] ml-1">*</span>}
      </label>
      <select
        {...props}
        required={required}
        className="w-full px-4 py-3 border border-[#1B4332]/20 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#1B4332] font-medium cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white">
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

function RecordSection({
  title,
  icon,
  field,
  placeholder2,
  form,
  addRow,
  updateRow,
  removeRow
}: {
  title: string
  icon: React.ReactNode
  field: keyof typeof form
  placeholder2: string
  form: any
  addRow: (f: any) => void
  updateRow: (f: any, i: number, k: string, v: string) => void
  removeRow: (f: any, i: number) => void
}) {
  return (
    <div className="bg-[#FEFAE0] rounded-2xl p-5 border border-[#1B4332]/10">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-[#1B4332] flex items-center gap-2">
          {icon}
          {title}
        </h4>
        <button
          type="button"
          onClick={() => addRow(field)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[#2D6A4F] bg-white hover:bg-[#2D6A4F] hover:text-white rounded-lg transition-all shadow-sm border border-[#1B4332]/10"
        >
          <Plus size={14} />
          Agregar
        </button>
      </div>

      {(form[field] as any[]).length === 0 ? (
        <p className="text-sm text-[#2D6A4F]/50 italic py-3 text-center">No hay registros aún</p>
      ) : (
        <div className="space-y-3">
          {(form[field] as any[]).map((item: any, i: number) => (
            <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-[#1B4332]/10 shadow-sm">
              <input
                type="date"
                value={item.date || ''}
                onChange={(e) => updateRow(field, i, 'date', e.target.value)}
                className="flex-1 px-3 py-2.5 border border-[#1B4332]/20 rounded-lg text-sm focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
              />
              <input
                placeholder={placeholder2}
                value={item.notes || ''}
                onChange={(e) => updateRow(field, i, 'notes', e.target.value)}
                className="flex-[2] px-3 py-2.5 border border-[#1B4332]/20 rounded-lg text-sm focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
              />
              <button
                type="button"
                onClick={() => removeRow(field, i)}
                className="p-2.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 🔹 Componente Principal
export default function AnimalForm({ initialData, onCreated }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    id: initialData?.id || '',
    qr_code: initialData?.qr_code || '',
    species: initialData?.species || 'cabra',
    name: initialData?.name || '',
    birth_date: initialData?.birth_date ? new Date(initialData.birth_date).toISOString().split('T')[0] : '',
    parent_father: initialData?.parent_father || '',
    parent_mother: initialData?.parent_mother || '',
    medications: initialData?.medications || [],
    pregnancies: initialData?.pregnancies || [],
    lactation_periods: initialData?.lactation_periods || [],
    offspring: initialData?.offspring || [],
    weight_records: initialData?.weight_records || []
  })

  const addRow = (field: keyof typeof form) => {
    setForm((p) => ({ ...p, [field]: [...(p[field] as any[]), { date: '', notes: '' }] }))
  }

  const updateRow = (field: keyof typeof form, i: number, k: string, v: string) => {
    const arr = [...(form[field] as any[])]
    arr[i] = { ...arr[i], [k]: v }
    setForm((p) => ({ ...p, [field]: arr }))
  }

  const removeRow = (field: keyof typeof form, i: number) => {
    setForm((p) => ({ ...p, [field]: (p[field] as any[]).filter((_: any, idx: number) => idx !== i) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.set('id', form.id)
    fd.set('qr_code', form.qr_code)
    fd.set('species', form.species)
    fd.set('name', form.name)
    fd.set('birth_date', form.birth_date || '')
    fd.set('parent_father', form.parent_father)
    fd.set('parent_mother', form.parent_mother)
    fd.set('medications', JSON.stringify(form.medications))
    fd.set('pregnancies', JSON.stringify(form.pregnancies))
    fd.set('lactation_periods', JSON.stringify(form.lactation_periods))
    fd.set('offspring', JSON.stringify(form.offspring))
    fd.set('weight_records', JSON.stringify(form.weight_records))

    const result = await saveAnimal(fd)

    if (onCreated && !form.id) {
      onCreated(result)
    } else {
      router.push('/animals')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-[#1B4332]/10 overflow-hidden">
      
      {/* Header del Formulario */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] p-6 md:p-8 text-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          {form.id ? '✏️ Editar Animal' : '🐾 Registrar Nuevo Animal'}
        </h2>
        <p className="text-white/80 text-sm md:text-base">
          {form.id ? 'Actualiza la información del animal' : 'Completa los datos para el sistema de trazabilidad'}
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Sección 1: Información Básica */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#1B4332] font-bold border border-[#1B4332]/10">
              <Tag size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#1B4332]">Información Básica</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Código QR del Arete"
              placeholder="Ej: GGV-CAB-001"
              value={form.qr_code}
              onChange={(e) => setForm({ ...form, qr_code: e.target.value })}
              required
              disabled={!!form.id} // No editar QR si ya existe
            />
            <SelectField
              label="Especie"
              options={['cabra', 'cerdo', 'ternero', 'oveja', 'otro']}
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
              required
            />
            <InputField
              label="Nombre o Identificación"
              placeholder="Ej: Margarita, #45"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <InputField
              label="Fecha de Nacimiento"
              type="date"
              value={form.birth_date}
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            />
            <InputField
              label="Padre"
              placeholder="QR o nombre"
              value={form.parent_father}
              onChange={(e) => setForm({ ...form, parent_father: e.target.value })}
            />
            <InputField
              label="Madre"
              placeholder="QR o nombre"
              value={form.parent_mother}
              onChange={(e) => setForm({ ...form, parent_mother: e.target.value })}
            />
          </div>
        </section>

        {/* Sección 2: Registros */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#FEFAE0] rounded-xl flex items-center justify-center text-[#BC6C25] font-bold border border-[#1B4332]/10">
              <Calendar size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#1B4332]">Registros Médicos y Productivos</h3>
          </div>
          
          <div className="space-y-5">
            <RecordSection
              title="Medicamentos Aplicados"
              icon={<span className="text-[#BC6C25]">💊</span>}
              field="medications"
              placeholder2="Medicamento, dosis, observaciones"
              form={form}
              addRow={addRow}
              updateRow={updateRow}
              removeRow={removeRow}
            />
            <RecordSection
              title="Fechas de Preñez"
              icon={<span className="text-[#2D6A4F]">🤰</span>}
              field="pregnancies"
              placeholder2="Método, observaciones"
              form={form}
              addRow={addRow}
              updateRow={updateRow}
              removeRow={removeRow}
            />
            <RecordSection
              title="Registro de Pesos"
              icon={<span className="text-[#1B4332]">⚖️</span>}
              field="weight_records"
              placeholder2="Peso en kg o libras"
              form={form}
              addRow={addRow}
              updateRow={updateRow}
              removeRow={removeRow}
            />
          </div>
        </section>

        {/* Botones de Acción */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-[#1B4332]/10">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-4 bg-white text-[#1B4332] border-2 border-[#1B4332]/20 rounded-xl font-bold hover:bg-[#FEFAE0] transition-all flex items-center justify-center gap-2"
          >
            <X size={20} />
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#2D6A4F] hover:to-[#1B4332] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Save size={20} />
            {form.id ? 'Actualizar Animal' : 'Registrar Animal'}
          </button>
        </div>

      </div>
    </form>
  )
}