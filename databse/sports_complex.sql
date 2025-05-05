-- Create the database
CREATE DATABASE IF NOT EXISTS `sports_complex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sports_complex`;

-- Facilities Table
CREATE TABLE `facilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` enum('Aquatic','Court','Outdoor','Indoor','Track','Gym','Other') NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT 1,
  `hourly_rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  `features` json DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT 0.0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bookings Table
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facility_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 1 COMMENT 'in hours',
  `total_amount` decimal(10,2) NOT NULL,
  `special_requests` text DEFAULT NULL,
  `status` enum('pending','confirmed','completed','cancelled','rejected') NOT NULL DEFAULT 'pending',
  `payment_status` enum('unpaid','paid','refunded','failed') NOT NULL DEFAULT 'unpaid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `facility_id` (`facility_id`),
  KEY `booking_date` (`booking_date`),
  KEY `email` (`email`),
  KEY `status` (`status`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact Messages Table
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied','spam') NOT NULL DEFAULT 'unread',
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Users Table (for future authentication)
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('user','staff','admin') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Facility Images Table (for multiple images per facility)
CREATE TABLE `facility_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facility_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `facility_images_ibfk_1` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reviews Table
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facility_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `rating` tinyint(1) NOT NULL,
  `comment` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample facilities
INSERT INTO `facilities` (`name`, `type`, `description`, `image_url`, `capacity`, `hourly_rate`, `features`, `rating`) VALUES
('Olympic Swimming Pool', 'Aquatic', '50m Olympic standard pool with diving boards and temperature control system', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6', 50, 35.00, '[\"Locker rooms\", \"Lifeguards\", \"Equipment rental\"]', 4.8),
('Indoor Basketball Court', 'Court', 'Professional-grade hardwood court with adjustable hoops for all skill levels', 'https://images.unsplash.com/photo-1546519638-68e109498ffc', 30, 25.00, '[\"Scoreboards\", \"Seating\", \"Lighting system\"]', 4.6),
('Soccer Field', 'Outdoor', 'Full-size FIFA regulation field with artificial turf and floodlights', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', 100, 50.00, '[\"Changing rooms\", \"Floodlights\", \"Bleachers\"]', 4.9),
('Running Track', 'Track', '400m synthetic track with 8 lanes and proper field event areas', 'https://images.unsplash.com/photo-1517649763962-0c623066013b', 80, 20.00, '[\"Lanes\", \"Timing system\", \"Grandstand\"]', 4.7),
('Tennis Courts', 'Court', '4 professional hard courts with lighting for evening play', 'https://images.unsplash.com/photo-1544298621-a29bf0721f55', 16, 30.00, '[\"Lighting\", \"Netting\", \"Seating\"]', 4.5),
('Gymnasium', 'Gym', 'Fully equipped gym with cardio and weight training equipment', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f', 40, 15.00, '[\"Cardio\", \"Weights\", \"Trainers\"]', 4.4);

-- Insert sample facility images
INSERT INTO `facility_images` (`facility_id`, `image_url`, `is_primary`) VALUES
(1, 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6', 1),
(1, 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159', 0),
(2, 'https://images.unsplash.com/photo-1546519638-68e109498ffc', 1),
(3, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', 1),
(4, 'https://images.unsplash.com/photo-1517649763962-0c623066013b', 1),
(5, 'https://images.unsplash.com/photo-1544298621-a29bf0721f55', 1),
(6, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f', 1);

-- Insert sample bookings
INSERT INTO `bookings` (`facility_id`, `name`, `email`, `phone`, `booking_date`, `start_time`, `end_time`, `duration`, `total_amount`, `status`, `payment_status`) VALUES
(1, 'John Doe', 'john@example.com', '+1234567890', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '09:00:00', '10:00:00', 1, 35.00, 'confirmed', 'paid'),
(2, 'Jane Smith', 'jane@example.com', '+1987654321', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '14:00:00', '16:00:00', 2, 50.00, 'confirmed', 'paid'),
(3, 'Mike Johnson', 'mike@example.com', '+1122334455', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '10:00:00', '12:00:00', 2, 100.00, 'pending', 'unpaid');

-- Insert sample contact messages
INSERT INTO `contact_messages` (`name`, `email`, `phone`, `subject`, `message`, `status`) VALUES
('Sarah Williams', 'sarah@example.com', '+1555666777', 'Membership Inquiry', 'I would like to know about your membership plans and discounts for students.', 'read'),
('David Brown', 'david@example.com', '+1444333222', 'Group Booking', 'We want to book the soccer field for a company tournament next month.', 'unread');

-- Insert sample admin user
INSERT INTO `users` (`name`, `email`, `password`, `phone`, `role`) VALUES
('Admin User', 'admin@sportzone.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1112223333', 'admin');

-- Create database user with privileges (adjust password as needed)
CREATE USER 'sports_complex_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON sports_complex.* TO 'sports_complex_user'@'localhost';
FLUSH PRIVILEGES;