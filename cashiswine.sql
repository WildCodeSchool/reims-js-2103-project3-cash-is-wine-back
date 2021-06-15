create database if not exists cashiswine;

use cashiswine;

create table `wine_bottle`(
  `id` int NOT NULL AUTO_INCREMENT,
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
  `price` varchar(10) NOT NULL
  PRIMARY KEY (`id`)
);
