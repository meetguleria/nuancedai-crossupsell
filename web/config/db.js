import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the path to your .env file, relative to the current file
dotenv.config({ path: resolve(__dirname, '../../.env') });

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

const sequelize = new Sequelize(
  DATABASE_NAME, 
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
      dialect: 'postgres',
      port: 5432
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

export default sequelize;