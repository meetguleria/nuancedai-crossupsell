import express from 'express';
import shopify from '../shopify.js';
import { resyncStoreDetails, getOnboardingStatusController, completeOnboardingController } from '../controllers/storeController.js';

const router = express.Router();

// Shopify session validation middleware
router.use(shopify.validateAuthenticatedSession(), (req, res, next) => {
  console.log("Session Details:", res.locals.shopify.session);
  next();
});

router.get('/store/resync', resyncStoreDetails);

// Route to get the onboarding status of a store
router.get('/stores/:storeId/onboarding-status', getOnboardingStatusController);

// Route to complete the onboarding process for a store
router.post('/stores/:storeId/onboarding-complete', completeOnboardingController);

export default router;