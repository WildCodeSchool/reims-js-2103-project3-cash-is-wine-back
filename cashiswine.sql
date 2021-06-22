drop database if exists cashiswine;
create database cashiswine;

use cashiswine;

create table `reference`(
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
  `price` varchar(10) NOT NULL,  
  PRIMARY KEY (`id`)
);

create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95)
);

create table bottle (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_id` int,
  `reference_id` int,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bottle_user`
    FOREIGN KEY (`user_id`)
    REFERENCES user(`id`),
  CONSTRAINT `fk_bottle_reference`
    FOREIGN KEY (`reference_id`)
    REFERENCES reference(`id`)
);
