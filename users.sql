drop database if exists cashiswine;
create database cashiswine;

use cashiswine;

create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95)
);