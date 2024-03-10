import { fetchShopifyShopDetails, processAndSaveShopDetails } from '../services/store.service.js';

export async function  storeController(req, res) {
  try {
    const session = res.locals.shopify.session;

    const shopDetails = await fetchShopifyShopDetails(session);
    const savedDetails = await processAndSaveShopDetails(shopDetails, session);

    res.status(200).json({
      message: "Shopify store details saved successfully.",
      details: savedDetails
    });
  } catch (error) {
    console.error(`Error in saveStoreDetails: `)
  }
}