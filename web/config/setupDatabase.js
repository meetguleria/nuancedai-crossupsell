import sequelize from './db.js';
import {Order, OrderItem, Product, Store, User } from '../models/index.js';

const setupDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database setup complete. All models were synchronized successfully.')
  } catch (error) {
    console.error('Failed to setup database:', error);
  }
};

setupDatabase();