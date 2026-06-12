-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2026 a las 00:00:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ggv_expotecnia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animals`
--

CREATE TABLE `animals` (
  `id` varchar(191) NOT NULL,
  `qr_code` varchar(255) NOT NULL,
  `species` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birth_date` datetime(3) DEFAULT NULL,
  `parent_father` varchar(255) DEFAULT NULL,
  `parent_mother` varchar(255) DEFAULT NULL,
  `medications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`medications`)),
  `pregnancies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`pregnancies`)),
  `lactation_periods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`lactation_periods`)),
  `offspring` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`offspring`)),
  `weight_records` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`weight_records`)),
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `animals`
--

INSERT INTO `animals` (`id`, `qr_code`, `species`, `name`, `birth_date`, `parent_father`, `parent_mother`, `medications`, `pregnancies`, `lactation_periods`, `offspring`, `weight_records`, `created_at`, `updated_at`) VALUES
('02c3866c-502f-47c5-8a70-c1e92267efc3', 'GGV-CAB-001', 'cabra', 'Cabrinha', '2026-04-03 00:00:00.000', NULL, NULL, '[]', '[]', '[]', '[]', '[{\"date\":\"2026-04-03\",\"notes\":\"4KG\"}]', '2026-05-23 23:40:51.055', '2026-05-23 23:40:51.055'),
('65b3b4d8-90f8-4d7d-91c4-15614a14429e', 'GGV-CER-001', 'cerdo', 'Peppita', '2026-04-29 00:00:00.000', NULL, NULL, '[]', '[]', '[]', '[]', '[]', '2026-05-28 11:50:58.877', '2026-05-28 11:50:58.877');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `animals_qr_code_key` (`qr_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
