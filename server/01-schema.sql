-- MySQL schema converted from Beauty Calendar SQLite database (including WAL state).
CREATE DATABASE IF NOT EXISTS `beauty_calendar` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `beauty_calendar`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` TEXT NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` TEXT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `service` TEXT NOT NULL,
  `stylist` VARCHAR(255) NOT NULL,
  `date` VARCHAR(255) NOT NULL,
  `time` VARCHAR(255) NOT NULL,
  CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_stylist_date_time` (`stylist`, `date`, `time`)
) ENGINE=InnoDB;
