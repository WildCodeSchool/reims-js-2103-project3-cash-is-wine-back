drop database if exists cashiswine;
create database cashiswine;

use cashiswine;

create table `reference`(
  `id` int NOT NULL AUTO_INCREMENT,
  `appellation` varchar(100) NOT NULL,
  `terroir` varchar(100),
  `label` varchar(10) NOT NULL,
  `color` varchar(100) NOT NULL,
  `variety` varchar(100),
  `type` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `reward` text,
  `precision` text,
  `year` int NOT NULL,
  `price` float NOT NULL,
  `picture` text,  
  PRIMARY KEY (`id`)
);

insert into reference (appellation, terroir, label, color, variety, type, category, reward, `precision`, year, price, picture)
  values 
    ('Alsace Grand Cru', '', 'AOC-AOP', 'Blanc', 'Gewurztraminer', 'Moelleux', 'Région 1', '', 'Alsace grand cru concerne uniquement 50 lieuts-dit répartis sur le Haut Rhin et Bas Rhin', 2000, '22', 'Alsace.png'),
    ('Brouilly', '', 'AOC-AOP', 'Rouge', 'Gamay N', 'Sec', 'Région 1', '', '', 2000, 16, 'Brouilly.png'),
    ('Chablis Grand Cru', '', 'AOC-AOP', 'Blanc', 'Chardonnay', 'Sec', 'Région 1', '', '', 2000, 30, 'Chablis.png'),
    ('Hautes Côtes de Beaune', '', 'AOC-AOP', 'Rouge', 'Pinot noir', 'Sec', 'Région 1', '', '', 2000, 18, 'Hautes-Côtes.png'),
    ('Arbois', '', 'AOC-AOP', 'Blanc', 'Savagnin', 'Vin jaune', 'Région 1', '', '', 2000, 54, 'Vin-jaune.png'),
    ('Chinon', '', 'AOC-AOP', 'Blanc', 'Chenin', 'Sec', 'Région 1', '', '2005 est une année exceptionnelle', 2000, 20, 'Chinon-Blanc.png'),
    ('Chinon', '', 'AOC-AOP', 'Rouge', 'Cabernet-Franc N', 'Sec', 'Région 1', '', '', 2000, 24, 'Chinon-Rouge.png')
  ;



create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95)
);

create table bottle (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `type` varchar(100) NOT NULL,
  `appellation` varchar(100) NOT NULL,
  `year` int NOT NULL,
  `reward` text,
  `reference_id` int,
  `frontImg` text,
  `backImg` text,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bottle_user`
    FOREIGN KEY (`user_id`)
    REFERENCES user(`id`),
  CONSTRAINT `fk_bottle_reference`
    FOREIGN KEY (`reference_id`)
    REFERENCES reference(`id`)
);
