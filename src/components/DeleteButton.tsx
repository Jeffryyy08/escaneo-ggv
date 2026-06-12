'use client'
import { Trash2 } from 'lucide-react'

export default function DeleteButton() {
  return (
    <button 
      type="submit"
      onClick={() => confirm('¿Estás seguro de eliminar este animal? Esta acción no se puede deshacer.')}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
    >
      <Trash2 size={18} />
      Eliminar
    </button>
  )
}