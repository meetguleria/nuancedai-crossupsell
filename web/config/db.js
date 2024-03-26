import './env.js';
import { Sequelize } from 'sequelize';

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

console.log(DATABASE_USERNAME);

const sequelize = new Sequelize(
  DATABASE_NAME, 
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
    {
      host: DATABASE_HOST,
      dialect: 'postgres',
      port: 5432,
      logging: console.log,
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  // Test query to check logging
  sequelize.query('SELECT NOW();').then(() => console.log('Query executed')).catch(console.error);
})
  .catch(error => console.error('Unable to connect to the database:', error));

export default sequelize;