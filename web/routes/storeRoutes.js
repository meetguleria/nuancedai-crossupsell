import express from 'express';
import { handleShopInstallation } from '../controllers/storeController.js';

const router = express.Router();

// Log when a request is made to the route
router.use('/store', (req, _res, next) => {
  console.log(`Received request for /store with method ${req.method}`);
  next();
});

// Adjusted to handle GET request
router.get('/store', (req, res) => {
  console.log('Processing GET request to /store');
  handleShopInstallation(req, res)
    .then(() => console.log('GET to /store completed.'))
    .catch(error => {
      console.error('Error processing GET to /store:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

export default router;