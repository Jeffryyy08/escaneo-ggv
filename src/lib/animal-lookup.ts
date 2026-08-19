import type { Prisma } from '@prisma/client'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isUuid(value: string): boolean {
  return UUID_REGEX.test(value)
}

export function animalLookupWhere(identifier: string): Prisma.AnimalWhereInput {
  if (isUuid(identifier)) {
    return { OR: [{ id: identifier }, { qr_code: identifier }] }
  }

  return { qr_code: identifier }
}
