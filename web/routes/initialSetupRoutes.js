import express from 'express';
import shopify from '../shopify.js';
import { initialSetup } from '../controllers/initialSetupController.js';

const router = express.Router();

router.get('/initial-setup', shopify.validateAuthenticatedSession(), initialSetup);

export default router;