import sequelize from './db.js';
import { Order, OrderItem, Product, Store, User, ShopCustomer } from '../models/index.js';

const setupDatabase = async () => {
  console.log('Starting database setup...'); 
  try {
    console.log('Syncing models with the database...');
    await sequelize.sync({ force: true });
    console.log('Database models synchronized successfully. All tables created.');
  } catch (error) {
    console.error('Failed to setup database:', error.message);
    console.error('Error details:', error);
  }
};

setupDatabase();