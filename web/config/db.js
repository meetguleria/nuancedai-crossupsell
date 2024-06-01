import env from './env.js';
import { Sequelize } from 'sequelize';

const DATABASE_NAME = env.databaseName;
const DATABASE_USERNAME = env.databaseUser;
const DATABASE_PASSWORD = env.databasePassword;
const DATABASE_HOST = env.databaseHost;

const connectionUri = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`;
console.log(`Connection URI: ${connectionUri}`);

const sequelize = new Sequelize(connectionUri, {
  host: DATABASE_HOST,
  dialect: 'postgres',
  port: env.databasePort,
  logging: console.log,
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
  .catch(error => console.error('Unable to connect to the database:', error));

export default sequelize;