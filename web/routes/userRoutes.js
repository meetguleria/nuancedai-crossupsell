import express from 'express';
import {
  getUserDetailsController,
  udpateUserSettingsController,
  updateDataConsentController,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/user', getUserDetailsController);
router.put('/user/settings', udpateUserSettingsController);
router.put('/user/data-consent', updateDataConsentController);

export default router;