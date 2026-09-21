-- Youth Evolution Foundation Database Schema
CREATE DATABASE IF NOT EXISTS `yef_database`;
USE `yef_database`;

-- 1. Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `certificate_program` VARCHAR(200) NOT NULL,
  `certificate_id` VARCHAR(100) NOT NULL UNIQUE,
  `issue_date` DATE NOT NULL,
  `status` ENUM('Verified', 'Pending', 'Revoked') DEFAULT 'Verified',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Certificates
INSERT INTO `certificates` (`full_name`, `email`, `certificate_program`, `certificate_id`, `issue_date`, `status`)
VALUES 
  ('Numair Iqbal', 'numair@example.com', 'Web Development Internship 2026', 'YEF-WD-2026-001', '2026-09-15', 'Verified'),
  ('Ayesha Khan', 'ayesha@example.com', 'Community Leadership Program', 'YEF-CLP-2026-042', '2026-08-30', 'Verified'),
  ('Hamza Ali', 'hamza@example.com', 'Youth Mentorship Fellowship', 'YEF-YMF-2026-108', '2026-09-01', 'Pending')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

-- 2. Contacts Table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50),
  `message` TEXT,
  `status` ENUM('New', 'Read', 'Resolved') DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Contacts
INSERT IGNORE INTO `contacts` (`id`, `name`, `email`, `phone`, `message`, `status`)
VALUES 
  (1, 'Ali Raza', 'ali@example.com', '03001234567', 'Interested in your community leadership programs.', 'New'),
  (2, 'Sara Khan', 'sara@example.com', '03007654321', 'Need more info about volunteer events in Karachi.', 'Read');

-- 3. Volunteers Table
CREATE TABLE IF NOT EXISTS `volunteers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50),
  `interest` VARCHAR(100),
  `message` TEXT,
  `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Volunteers
INSERT IGNORE INTO `volunteers` (`id`, `name`, `email`, `phone`, `interest`, `message`, `status`)
VALUES 
  (1, 'Bilal Ahmed', 'bilal@example.com', '03331122334', 'Teaching', 'Want to help teach underprivileged kids.', 'Pending'),
  (2, 'Zainab Tariq', 'zainab@example.com', '03219988776', 'Event Management', 'Available on weekends for community drives.', 'Approved');

-- 4. Donations Table
CREATE TABLE IF NOT EXISTS `donations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `donor_name` VARCHAR(150) NOT NULL,
  `donor_email` VARCHAR(150) NOT NULL,
  `donor_phone` VARCHAR(50),
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `transaction_ref` VARCHAR(100),
  `status` ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

