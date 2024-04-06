import sequelize from '../config/db.js';
import {Order, OrderItem, Product, Store, User, ShopCustomer } from '../models/index.js';

const setupDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database setup complete. All models were synchronized successfully.')
  } catch (error) {
    console.error('Failed to setup database:', error);
  }
};

setupDatabase();