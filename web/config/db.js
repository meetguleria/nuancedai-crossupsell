import './env.js';
import { Sequelize } from 'sequelize';

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD);
const DATABASE_HOST = process.env.DATABASE_HOST;

const connectionUri = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`;
console.log(`Connection URI: ${connectionUri}`);

const sequelize = new Sequelize(connectionUri, {
      host: DATABASE_HOST,
      dialect: 'postgres',
      port: 5432,
      logging: console.log,
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
  .catch(error => console.error('Unable to connect to the database:', error));

export default sequelize;