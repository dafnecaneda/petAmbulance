-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 12, 2022 at 05:07 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `authuser`
--

CREATE TABLE `authuser` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `userName` varchar(30) DEFAULT NULL,
  `userEmail` varchar(60) DEFAULT NULL,
  `userPass` varchar(256) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authuser`
--

INSERT INTO `authuser` (`id`, `name`, `lastName`, `userName`, `userEmail`, `userPass`, `birthday`, `image`) VALUES
(1, 'Marcelo', 'Bettini', 'MarceloBettini', 'profe@mail.mail', '827ccb0eea8a706c4c34a16891f84e7b', NULL, NULL),
(2, 'Dog', 'Lover', 'DogLover', 'ilovedogs@mail.mail', '827ccb0eea8a706c4c34a16891f84e7b', '2022-02-12', NULL),
(3, 'Cat', 'Lover', 'CatLover', 'ilovecats@mail.mail', '827ccb0eea8a706c4c34a16891f84e7b', '2022-02-12', NULL),
(5, 'Dafne', 'Caneda', 'dafnecaneda', 'dafnenicolecaneda@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '1996-04-14', 'ysg3smpyupu88paazodp');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `petName` varchar(30) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `breed` varchar(60) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` varchar(3) DEFAULT NULL,
  `observations` varchar(500) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `petName`, `type`, `breed`, `gender`, `age`, `observations`, `image`) VALUES
(1, 'Sierra', 'Dog', 'Mixed', 'female', '3', 'The patient ocationally presents head tremors, currently running Neurological exams', 'IMG_8282_c39p3n'),
(2, 'Teo', 'Cat', 'Mixed', 'male', '3', 'The patients presents chronicall asthma sympthopms, currently under medication', 'IMG_7144_hwx2pf'),
(3, 'Mollo', 'Dog', 'Mixed', 'male', '2', 'No observations.', 'IMG_4992_itqwph'),
(4, 'Rolo', 'Dog', 'Mixed', 'male', '2', 'No observations.', '66319336675__98B8C006-9957-45B2-83E4-5A31FDD30B59_gvhtkk');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `benefits` varchar(300) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `benefits`, `price`) VALUES
(1, 'Starter', 'This plan is our starter plan for pet parents, targeted to students and petowners of 1 small animal.', 'You wil be provided with 24 hs ambulance service, and 3 free online consultations to a Vet.', '$95.-'),
(2, 'Puppy', 'This plan is ideal for PetParents of puppies', 'You wil be provided with 24 hs ambulance service, specified nutrition and training plans for your Pup, unlimited Online Vet consultations.', '$130.-'),
(3, 'Senior', 'This plan is for PetParents and their Senior best friend. In this important part of their life we want to be there with you and offer the best care.', 'In this plan you will be provided with 24 hs ambulance service and nursery at home, Unlimited online and in person appointments and follow ups.', '$230.-'),
(4, 'Big Family', 'No Pet Family is too big for us, we will help you cover all your pets needs without breaking bank !', 'You wil be provided with 24 hs ambulance service and Unlimited Online Vet consultations, nutrition plans, discount on bags of food and cost free training classes so your Pets wont drive you mad!', '$260.-');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authuser`
--
ALTER TABLE `authuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authuser`
--
ALTER TABLE `authuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
