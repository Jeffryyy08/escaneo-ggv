-- CreateTable
CREATE TABLE `animals` (
    `id` VARCHAR(191) NOT NULL,
    `qr_code` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `birth_date` DATE NULL,
    `parent_father` VARCHAR(191) NULL,
    `parent_mother` VARCHAR(191) NULL,
    `medications` JSON NOT NULL,
    `pregnancies` JSON NOT NULL,
    `lactation_periods` JSON NOT NULL,
    `offspring` JSON NOT NULL,
    `weight_records` JSON NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `animals_qr_code_key`(`qr_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
