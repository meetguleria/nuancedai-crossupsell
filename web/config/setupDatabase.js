import './env.js';
import sequelize from './db.js';
import { Order, OrderItem, Product, Store, User, ShopCustomer } from '../models/index.js';

const setupDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: true });
      console.log('Development environment: Database setup complete. All models were synchronized successfully.');
    } else {
      await sequelize.sync();
      console.log('Production environment: Database models synchronized successfully.');
    }
  } catch (error) {
    console.error('Failed to setup database:', error);
  }
};

setupDatabase();