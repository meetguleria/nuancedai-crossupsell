import { fetchShopifyShopDetails } from '../services/store.service.js';

export async function handleShopInstallation(req, res) {
  console.log('handleShopInstallation: Received request');

  try {
    const session = res.locals.shopify.session;

    if (!session) {
      console.error('Session is undefined or null');
      return res.status(400).json({ error: 'Bad Request: Session is missing.' });
    }

    const shopDetails = await fetchShopifyShopDetails(session);
    console.log('Shop details fetched successfully:', shopDetails);

    res.status(200).json({
      message: "Shop details fetched successfully.",
      shopDetails,
    });
  } catch (error) {
    console.error('Error in handleShopInstallation:', error);
    res.status(400).json({ error: error.message });  
  }
};