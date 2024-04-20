import express from 'express';
import { fetchDataAndProcess } from '../controllers/shopDataController.js';

const router = express.Router();

router.get('/fetch-and-process-shop-data', fetchDataAndProcess);

export default router;