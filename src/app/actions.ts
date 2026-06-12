'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveAnimal(formData: FormData) {
  const id = formData.get('id') as string | null
  const birthDateStr = formData.get('birth_date') as string
  
  const data = {
    qr_code: formData.get('qr_code') as string,
    species: formData.get('species') as string,
    name: (formData.get('name') as string) || null,
    birth_date: birthDateStr ? new Date(birthDateStr) : null,
    parent_father: (formData.get('parent_father') as string) || null,
    parent_mother: (formData.get('parent_mother') as string) || null,
    medications: JSON.parse(formData.get('medications') as string || '[]'),
    pregnancies: JSON.parse(formData.get('pregnancies') as string || '[]'),
    lactation_periods: JSON.parse(formData.get('lactation_periods') as string || '[]'),
    offspring: JSON.parse(formData.get('offspring') as string || '[]'),
    weight_records: JSON.parse(formData.get('weight_records') as string || '[]'),
  }

  let animal
  if (id) {
    animal = await prisma.animal.update({ where: { id }, data })
  } else {
    animal = await prisma.animal.create({ data })
  }

  revalidatePath('/animals')
  
  // Devolvemos el animal creado/actualizado
  return {
    qr_code: animal.qr_code,
    name: animal.name
  }
}

export async function deleteAnimal(formData: FormData) {
  const id = formData.get('id') as string
  await prisma.animal.delete({ where: { id } })
  revalidatePath('/animals')
}