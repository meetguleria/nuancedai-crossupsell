import express from 'express';
import { resyncStoreDetails } from '../controllers/storeController.js';

const router = express.Router();

router.get('/store/resync', resyncStoreDetails);

export default router;