import { processAndSaveShopDetails } from "../services/store.service.js";

export async function resyncStoreDetails(req, res) {
  try {
    const session = res.locals.shopify.session;
    const updatedStoreDetails = await processAndSaveShopDetails(session);
    res.status(200).json({
      message: "Store details updated successfully.",
      storeDetails: updatedStoreDetails,
    });
  } catch (error) {
    console.error("Error re-syncing store details:", error);
    res.status(500).json({ error: "Failed to re-sync store details." });
  }
}