import express from 'express';
import shopify from '../shopify.js';
import { resyncStoreDetails, getOnboardingStatusController, completeOnboardingController } from '../controllers/storeController.js';

const router = express.Router();

router.use(shopify.validateAuthenticatedSession());

router.get('/store/resync', resyncStoreDetails);

export default router;