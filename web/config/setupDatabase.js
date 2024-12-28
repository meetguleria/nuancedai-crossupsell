import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Store, User, ProductRelationship } from '../models/index.js';

// Load environment variables
dotenv.config();

// Destructure environment variables
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = process.env;

// Validate environment variables
if (!DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST || !DATABASE_PORT) {
  throw new Error('Database configuration is incomplete. Please check your .env file.');
}

// Create Sequelize instance
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    logging: console.log,
  }
);

const setupDatabase = async () => {
  console.log('Starting database setup...');
  try {
    console.log('Syncing models with the database...');
    await sequelize.sync({ force: true });
    console.log('Database models synchronized successfully. All tables created.');
  } catch (error) {
    console.error('Failed to setup database:', error.message);
    console.error('Error details:', error);
  } finally {
    await sequelize.close();
  }
};

setupDatabase();
