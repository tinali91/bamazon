DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Technology", 564.99, 10), ("Nintendo Switch", "Technology", 299.99, 3), ("Orange", "Produce", 0.10, 15), ("Broom", "Household Items", 12, 6), ("Toilet Paper", "Household Items", 8.98, 1), ("Football", "Sports", 25.49, 9), ("Basketball", "Sports", 17.99, 12), ("Headphones", "Technology", 79.99, 4), ("Desk", "Furniture", 125.00, 2), ("Color Pencils", "Arts", 13.99, 5), ("Paint Brushes", "Arts", 6.99, 17);

SELECT * FROM products;