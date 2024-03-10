import express from 'express';
import { saveStoreDetails } from '../controllers/storeController.js';

const router = express.Router();

router.post('/store', saveStoreDetails);

export default router;