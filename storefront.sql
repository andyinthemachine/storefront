DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  dept_name VARCHAR (45) NOT NULL,
  price  FLOAT (8,2) default 0,
  quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (name, dept_name, price, quantity)
VALUES ("Fischer SL skis", "skis", 800, 10),
("Fischer GS skis", "skis", 900, 8),
("Fischer GS skis", "skis", 900, 8),
("Fischer Free skis", "skis", 750, 15),
("Look bindings", "bindings", 200, 5),
("Tyrolia bindings", "bindings", 150, 4),
("Fischer bindings", "bindings", 150, 11),
("Leki SL poles", "poles", 100, 15),
("Leki GS poles", "poles", 90, 10),
("Leki SG poles", "poles", 110, 10),
("POC MIPS helmet", "helmets", 800, 10);

SELECT * FROM products;