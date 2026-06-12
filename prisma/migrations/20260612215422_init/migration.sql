-- CreateTable
CREATE TABLE "animals" (
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

-- CreateIndex
CREATE UNIQUE INDEX "animals_qr_code_key" ON "animals"("qr_code");
