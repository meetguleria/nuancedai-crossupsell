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
