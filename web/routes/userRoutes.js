import express from 'express';
import shopify from '../shopify.js';
import {
  getUserDetailsController,
  updateUserSettingsController,
  updateDataConsentController,
} from '../controllers/userController.js';

const router = express.Router();

router.use(shopify.validateAuthenticatedSession());

router.get('/user', getUserDetailsController);
router.put('/user/settings', updateUserSettingsController);
router.put('/user/data-consent', updateDataConsentController);

export default router;