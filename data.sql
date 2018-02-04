CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE productsList (
    item_id INT NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT NOT NULL,
    UNIQUE KEY (item_id)
);

INSERT INTO productsList(item_id, product_name, department_name, price, stock_quantity)
VALUES 
(01, 'Harry Potter and the Sorcerer Stone', 'Books', 26, 3),
(02, 'Gone Girl', 'Books', 12, 15),
(03, 'XBOX', 'Electronics', 350, 10),
(04, 'Fight Club', 'Movies', 5.99, 45),
(05, 'The Office', 'Movies', 19.99, 4),
(06, 'Game of Thrones', 'Books', 26.99, 15),
(07, 'iPhone X', 'Electronics', 1400.99, 3),
(08, 'Blanket', 'Fashion', 6.50, 40),
(09, 'BOSE Speakers', 'Electronics', 300, 18),
(10, 'Dining table', 'Furniture', 299.49, 30),
(11, 'Heels' , 'Fashion' , 24.69, 15),
(12, 'MacBook Air' , 'Electronics', 1990.89, 19),
(13, 'Black Pants' , 'Fashion' , 26.76, 15);

SELECT * FROM productsList;

       
       