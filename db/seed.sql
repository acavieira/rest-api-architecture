-- MySQL seed script for rest_api_architecture
CREATE DATABASE IF NOT EXISTS rest_api_architecture;
USE rest_api_architecture;

DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS products;

CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Dummy clients
INSERT INTO clients (name, email) VALUES ('Ana Vieira', 'ana@demo.com');
INSERT INTO clients (name, email) VALUES ('Carlos Silva', 'carlos@demo.com');
INSERT INTO clients (name, email) VALUES ('Maria Souza', 'maria@demo.com');
INSERT INTO clients (name, email) VALUES ('John Doe', 'john@demo.com');
INSERT INTO clients (name, email) VALUES ('Beatriz Lima', 'beatriz@demo.com');
INSERT INTO clients (name, email) VALUES ('Lucas Martins', 'lucas@demo.com');
INSERT INTO clients (name, email) VALUES ('Emily Clark', 'emily@demo.com');
INSERT INTO clients (name, email) VALUES ('Pedro Santos', 'pedro@demo.com');
INSERT INTO clients (name, email) VALUES ('Julia Costa', 'julia@demo.com');
INSERT INTO clients (name, email) VALUES ('Sophia Brown', 'sophia@demo.com');
INSERT INTO clients (name, email) VALUES ('Michael Johnson', 'michael@demo.com');
INSERT INTO clients (name, email) VALUES ('Olivia Lee', 'olivia@demo.com');
INSERT INTO clients (name, email) VALUES ('William Smith', 'william@demo.com');
INSERT INTO clients (name, email) VALUES ('Emma Wilson', 'emma@demo.com');
INSERT INTO clients (name, email) VALUES ('James Miller', 'james@demo.com');
INSERT INTO clients (name, email) VALUES ('Isabella Moore', 'isabella@demo.com');
INSERT INTO clients (name, email) VALUES ('Benjamin Taylor', 'benjamin@demo.com');
INSERT INTO clients (name, email) VALUES ('Mia Anderson', 'mia@demo.com');
INSERT INTO clients (name, email) VALUES ('Elijah Thomas', 'elijah@demo.com');
INSERT INTO clients (name, email) VALUES ('Charlotte Jackson', 'charlotte@demo.com');

-- Dummy products
INSERT INTO products (name, price) VALUES ('Dell Inspiron 15 Laptop', 3500.00);
INSERT INTO products (name, price) VALUES ('Logitech M720 Mouse', 150.00);
INSERT INTO products (name, price) VALUES ('LG 24MP59G Monitor', 900.00);
INSERT INTO products (name, price) VALUES ('Redragon Kumara Keyboard', 250.00);
INSERT INTO products (name, price) VALUES ('HyperX Cloud Stinger Headset', 320.00);
INSERT INTO products (name, price) VALUES ('Samsung Galaxy S21 Smartphone', 4200.00);
INSERT INTO products (name, price) VALUES ('Apple iPad 9th Gen Tablet', 3800.00);
INSERT INTO products (name, price) VALUES ('HP DeskJet 2774 Printer', 500.00);
INSERT INTO products (name, price) VALUES ('ThunderX3 Gaming Chair', 1200.00);
INSERT INTO products (name, price) VALUES ('Logitech C920 Webcam', 400.00);
INSERT INTO products (name, price) VALUES ('Kingston A400 480GB SSD', 250.00);
INSERT INTO products (name, price) VALUES ('NVIDIA RTX 3060 GPU', 2500.00);
INSERT INTO products (name, price) VALUES ('Corsair 650W PSU', 450.00);
INSERT INTO products (name, price) VALUES ('NZXT H510 Case', 600.00);
INSERT INTO products (name, price) VALUES ('AMD Ryzen 5 5600X CPU', 1100.00);
INSERT INTO products (name, price) VALUES ('Corsair Vengeance 16GB RAM', 350.00);
INSERT INTO products (name, price) VALUES ('Seagate 2TB HDD', 350.00);
INSERT INTO products (name, price) VALUES ('TP-Link Archer C6 Router', 220.00);
INSERT INTO products (name, price) VALUES ('Samsung Odyssey 27 Monitor', 1800.00);
INSERT INTO products (name, price) VALUES ('Fifine K669B Microphone', 180.00);
INSERT INTO products (name, price) VALUES ('Google Pixel 7', 3900.00);
INSERT INTO products (name, price) VALUES ('Apple MacBook Air M2', 7500.00);
INSERT INTO products (name, price) VALUES ('Sony WH-1000XM4 Headphones', 1200.00);
INSERT INTO products (name, price) VALUES ('Razer DeathAdder Mouse', 200.00);
INSERT INTO products (name, price) VALUES ('Acer Aspire 5 Laptop', 3200.00);
INSERT INTO products (name, price) VALUES ('Canon EOS M50 Camera', 4100.00);
INSERT INTO products (name, price) VALUES ('JBL Flip 5 Speaker', 400.00);
INSERT INTO products (name, price) VALUES ('Microsoft Surface Pro 8', 8000.00);
INSERT INTO products (name, price) VALUES ('Philips Hue Smart Bulb', 150.00);
INSERT INTO products (name, price) VALUES ('Amazon Echo Dot', 250.00);
INSERT INTO products (name, price) VALUES ('Fitbit Charge 5', 900.00);
INSERT INTO products (name, price) VALUES ('GoPro HERO10', 2500.00);
INSERT INTO products (name, price) VALUES ('Samsung T7 Portable SSD', 600.00);
INSERT INTO products (name, price) VALUES ('Lenovo ThinkPad X1', 9500.00);
INSERT INTO products (name, price) VALUES ('Bose SoundLink Mini', 800.00);
INSERT INTO products (name, price) VALUES ('TP-Link Deco M5', 700.00);
INSERT INTO products (name, price) VALUES ('WD My Passport 1TB', 350.00);
INSERT INTO products (name, price) VALUES ('Apple Watch Series 8', 3200.00);
INSERT INTO products (name, price) VALUES ('Samsung Galaxy Tab S8', 4200.00);