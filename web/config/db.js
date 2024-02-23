import './env.js';
import { Sequelize } from 'sequelize';

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