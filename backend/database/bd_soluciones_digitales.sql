-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.31 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bd_soluciones_digitales
DROP DATABASE IF EXISTS `bd_soluciones_digitales`;
CREATE DATABASE IF NOT EXISTS `bd_soluciones_digitales` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_soluciones_digitales`;

-- Volcando estructura para tabla bd_soluciones_digitales.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(8) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_sexo_id` int NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_hora_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_hora_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_clientes_dni` (`dni`),
  KEY `fk_clientes_tipo_sexo_id_sexo_tipos_id` (`tipo_sexo_id`),
  KEY `key_clientes_dni` (`dni`) USING BTREE,
  CONSTRAINT `fk_clientes_tipo_sexo_id_sexo_tipos_id` FOREIGN KEY (`tipo_sexo_id`) REFERENCES `sexo_tipos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla bd_soluciones_digitales.clientes: ~9 rows (aproximadamente)
DELETE FROM `clientes`;
INSERT INTO `clientes` (`id`, `dni`, `nombre`, `apellido`, `tipo_sexo_id`, `telefono`, `fecha_hora_creacion`, `fecha_hora_modificacion`) VALUES
	(1, '21456844', 'Guillermo', 'Gomez', 1, '1163254896', '2023-07-14 18:21:04', NULL),
	(2, '94496652', 'Veronica', 'Carpio', 2, '1138193480', '2023-07-13 16:03:42', NULL),
	(3, '11223322', 'Juan', 'Perez', 1, '1136852465', '2023-07-14 14:03:23', '2023-07-14 16:48:06'),
	(4, '46214523', 'Victoria', 'Paz', 2, '1165384976', '2023-07-14 14:03:31', '2023-07-14 16:48:32'),
	(5, '45714235', 'Martin', 'Fernandez', 1, '1197854663', '2023-07-14 14:07:01', '2023-07-14 16:49:09'),
	(6, '39875456', 'Nick', 'Valente', 3, '1136987144', '2023-07-14 14:12:00', '2023-07-14 16:49:32'),
	(7, '47564852', 'Mónica', 'Mendez', 2, '1165478512', '2023-07-14 14:14:15', '2023-07-14 16:53:04'),
	(8, '23658951', 'Pablo', 'Gonzalez', 1, '1162335442', '2023-07-14 14:21:45', '2023-07-14 16:53:27'),
	(9, '35458965', 'Mariana', 'Toledo', 2, '1162489653', '2023-07-14 16:45:59', '2023-07-14 16:53:56');

-- Volcando estructura para tabla bd_soluciones_digitales.sexo_tipos
CREATE TABLE IF NOT EXISTS `sexo_tipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_hora_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla de los distintos tipos de sexos';

-- Volcando datos para la tabla bd_soluciones_digitales.sexo_tipos: ~3 rows (aproximadamente)
DELETE FROM `sexo_tipos`;
INSERT INTO `sexo_tipos` (`id`, `nombre`, `fecha_hora_creacion`) VALUES
	(1, 'Masculino', '2023-07-13 11:53:16'),
	(2, 'Femenino', '2023-07-13 11:53:29'),
	(3, 'Prefiero no decirlo', '2023-07-13 11:53:44');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
