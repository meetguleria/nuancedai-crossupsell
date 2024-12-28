import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Destructure environment variables
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = process.env;

// Validate environment variables
if (!DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST || !DATABASE_PORT) {
  throw new Error('Database configuration is incomplete. Please check your .env file.');
}

// Construct the connection URI
const connectionUri = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
console.log(`Connecting to database at host: ${DATABASE_HOST} on port: ${DATABASE_PORT}`);

// Initialize Sequelize
const sequelize = new Sequelize(connectionUri, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export { sequelize, connectionUri };
