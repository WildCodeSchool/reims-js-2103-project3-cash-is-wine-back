create database if not exists cashisvine;

use cashisvine;

create table `wine_bottle`(
  `id` int NOT NULL AUTO_INCREMENT,
  `estate` varchar(100) NOT NULL,
  `appellation` varchar(100) NOT NULL,
  `terroir` varchar(100) NULL,
  `label` varchar(10) NOT NULL,
  `color` varchar(100) NOT NULL,
  `variety` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `reward` text NULL,
  `precision` text NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`id`)
);
