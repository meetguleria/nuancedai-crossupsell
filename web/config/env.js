// root folder/web/config/env.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert file URL to path for __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculate the path to the root folder where .env is located
const rootPath = path.join(__dirname, '../../');
const envPath = path.join(rootPath, '.env');

dotenv.config({ path: envPath });

const env = {
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,
  shopifApiKey: process.env.SHOPIFY_API_KEY,
  shopifySecretKey: process.env.SHOPIFY_SECRET_KEY,
};

export default env;
