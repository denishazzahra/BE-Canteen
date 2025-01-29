-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2025 at 08:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canteen`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `fullName`, `username`, `password`, `email`) VALUES
('WivSEeJNGXyoATdK', '3e06b1a9851ad2819691c8de2e5e85de', 'cd7c9ca3eedd94b58946a0b37c4ee4ae', '$2b$05$omsjshrlCzWZTAqRvQp60e3IqEdkCZJmgVzQbrl0/U/fPWAYVlDAu', '8b1b5faa30e5641364cd6c041285b60f63d92209a39651c0ac82ca22dc960c13');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(5, 'Cemilan'),
(6, 'Makanan Berat'),
(7, 'Minuman'),
(8, 'Lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `desc`, `price`, `pic`, `categoryId`) VALUES
(12, 'Tissue', '12 sheets 2 ply', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737125726/menu/menu_12.jpg', 8),
(13, 'Ayam Geprek', 'dengan nasi', 13000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126057/menu/menu_13.jpg', 6),
(14, 'Lalapan', 'sayuran dan sambal', 13000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126259/menu/menu_14.jpg', 6),
(15, 'Mie Gelas', '1 porsi', 3000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126366/menu/menu_15.jpg', 6),
(16, 'Indomie', '1 porsi', 8000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126450/menu/menu_16.jpg', 6),
(17, 'Pentol Kuah', '1 porsi isi 8', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126558/menu/menu_17.jpg', 5),
(18, 'Tempe Goreng', '1 buah', 1000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126840/menu/menu_18.jpg', 5),
(19, 'Tahu Bakso', '1 buah', 1000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126901/menu/menu_19.jpg', 5),
(20, 'Pisang Coklat', '1 buah', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737126973/menu/menu_20.jpg', 5),
(21, 'Tictic', 'Kemasan 18g', 3000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737131901/menu/menu_21.jpg', 5),
(22, 'Brownies', '1 potong', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737127245/menu/menu_22.jpg', 5),
(23, 'Manisan', '1 porsi', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737127299/menu/menu_23.jpg', 5),
(24, 'Pentol Goreng', '1 tusuk', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737131973/menu/menu_24.jpg', 5),
(25, 'Potato Chips', 'Kemasan 22g', 3000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1737132072/menu/menu_25.png', 5),
(34, 'Chitato', 'Kemasan 15g', 3000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738164657/menu/menu_34.jpg', 5),
(35, 'Wafello', 'Kemasan 37g', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738164903/menu/menu_35.jpg', 5),
(36, 'Kuaci Rebo', 'Kemasan renceng 13g', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165031/menu/menu_36.jpg', 5),
(37, 'Nabati', 'Kemasan 50g', 2000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165078/menu/menu_37.jpg', 5),
(38, 'Sabena', 'Kemasan 50g', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165264/menu/menu_38.jpg', 5),
(39, 'Pangsit Goreng', 'Isi 50g', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165380/menu/menu_39.jpg', 5),
(40, 'Soda', '1 gelas', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165736/menu/menu_40.jpg', 7),
(41, 'Es Teh Kecil', '1 gelas kecil', 3000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165809/menu/menu_41.jpg', 7),
(42, 'Es Teh Besar', '1 gelas besar', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738165833/menu/menu_42.jpg', 7),
(43, 'Air Mineral', 'Botol 600ml', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738166373/menu/menu_43.jpg', 7),
(44, 'Teh Pucuk', 'Botol 500ml', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738166500/menu/menu_44.jpg', 7),
(45, 'Yogurt Cimory', 'Botol 240ml', 8000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738166586/menu/menu_45.jpg', 7),
(46, 'Pop Ice', 'Kemasan gelas plastik', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738167079/menu/menu_46.jpg', 7),
(47, 'Zee', 'Susu segelas', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738168509/menu/menu_47.jpg', 7),
(48, 'Kopi Good Day', 'Tersedia berbagai rasa', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738168568/menu/menu_48.jpg', 7),
(50, 'Milo', '1 gelas', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738168762/menu/menu_50.jpg', 7),
(51, 'Chocolatos', 'Tersedia berbagai rasa', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738168776/menu/menu_51.jpg', 7),
(52, 'Teh Tarik', '1 gelas', 7000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738168971/menu/menu_52.jpg', 7),
(53, 'Energen', 'Tersedia berbagai rasa', 5000, 'https://res.cloudinary.com/dqckxopmv/image/upload/v1738169010/menu/menu_53.jpg', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
