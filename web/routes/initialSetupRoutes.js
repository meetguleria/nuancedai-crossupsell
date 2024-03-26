import express from 'express';
import { initialSetup } from '../controllers/initialSetupController.js';

const router = express.Router();

router.get('/initial-setup', initialSetup);

export default router;