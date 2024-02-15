import sqlite3Library from 'better-sqlite3';
const db = sqlite3Library('./database.sqlite');

// SQL statements to create tables
const createProductsTable = `
CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT
);`;

const createOrdersTable = `
CREATE TABLE IF NOT EXISTS Orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id TEXT NOT NULL,
    order_date DATE NOT NULL
);`;

const createOrderItemsTable = `
CREATE TABLE IF NOT EXISTS OrderItems (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);`;

// Execute SQL statements
db.exec(createProductsTable);
db.exec(createOrdersTable);
db.exec(createOrderItemsTable);

console.log('Database tables created or already exist.');

// Close the database connection
db.close();
