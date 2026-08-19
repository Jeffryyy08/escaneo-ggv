'use client'

import { useRouter } from 'next/navigation'
import AnimalForm from '@/components/AnimalForm'
import type { Animal } from '@prisma/client'

interface Props {
  animal: Animal
}

export default function EditAnimalForm({ animal }: Props) {
  const router = useRouter()

  const handleUpdated = (data: { qr_code: string; name?: string | null }) => {
    router.push(`/animals/${animal.id}`)
    router.refresh()
  }

  // Convertir las fechas de string a Date si es necesario
  const initialData = {
    ...animal,
    birth_date: animal.birth_date ? new Date(animal.birth_date) : null,
    created_at: animal.created_at ? new Date(animal.created_at) : null,

  }

  return <AnimalForm initialData={initialData} onCreated={handleUpdated} />
}
