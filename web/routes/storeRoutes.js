import express from 'express';
import { handleShopInstallation } from '../controllers/storeController.js';

const router = express.Router();

router.get('/store', handleShopInstallation);

export default router;