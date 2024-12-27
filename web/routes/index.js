import express from 'express';
import initialSetupRoutes from './initialSetupRoutes.js';
import productRelationshipRoutes from './productRelationshipRoutes.js';
import storeRoutes from './storeRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use(initialSetupRoutes);
router.use(productRelationshipRoutes);
router.use(storeRoutes);
router.use(userRoutes);

export default router;