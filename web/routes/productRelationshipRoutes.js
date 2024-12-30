import express from 'express';
import shopify from '../shopify.js';
import {
  createProductRelationship,
  getProductRelationships,
  updateProductRelationship,
  deleteProductRelationship,
} from '../controllers/productRelationshipController.js';

const router = express.Router();
router.use(shopify.validateAuthenticatedSession());

router.post('/product-relationships', createProductRelationship);
router.get('/product-relationships/:productId', getProductRelationships);
router.put('/product-relationships/:relationshipId', updateProductRelationship);
router.delete('/product-relationships/:relationshipId', deleteProductRelationship);

export default router;