-- ============================================================
-- SQL para PostgreSQL (Neon.tech) - Tabla animals
-- ============================================================

-- Crear tabla (si no existe)
CREATE TABLE IF NOT EXISTS "animals" (
    "id" TEXT NOT NULL,
    "qr_code" VARCHAR(255) NOT NULL,
    "species" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255),
    "birth_date" TIMESTAMP(3),
    "parent_father" VARCHAR(255),
    "parent_mother" VARCHAR(255),
    "medications" JSONB NOT NULL DEFAULT '[]',
    "pregnancies" JSONB NOT NULL DEFAULT '[]',
    "lactation_periods" JSONB NOT NULL DEFAULT '[]',
    "offspring" JSONB NOT NULL DEFAULT '[]',
    "weight_records" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- Índice único para qr_code
CREATE UNIQUE INDEX IF NOT EXISTS "animals_qr_code_key" ON "animals"("qr_code");

-- ============================================================
-- Insertar datos existentes desde MySQL
-- ============================================================

INSERT INTO "animals" ("id", "qr_code", "species", "name", "birth_date", "parent_father", "parent_mother", "medications", "pregnancies", "lactation_periods", "offspring", "weight_records", "created_at", "updated_at") VALUES
('02c3866c-502f-47c5-8a70-c1e92267efc3', 'GGV-CAB-001', 'cabra', 'Cabrinha', '2026-04-03 00:00:00.000', NULL, NULL, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[{"date":"2026-04-03","notes":"4KG"}]'::jsonb, '2026-05-23 23:40:51.055', '2026-05-23 23:40:51.055'),
('65b3b4d8-90f8-4d7d-91c4-15614a14429e', 'GGV-CER-001', 'cerdo', 'Peppita', '2026-04-29 00:00:00.000', NULL, NULL, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2026-05-28 11:50:58.877', '2026-05-28 11:50:58.877');
