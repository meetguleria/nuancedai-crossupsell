import express from 'express';
import { handleFetchAndSaveProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/fetch-and-save-products', handleFetchAndSaveProducts);

export default router;