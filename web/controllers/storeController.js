import { processAndSaveShopDetails } from "../services/store.service.js";

export async function handleShopInstallation(req, res) {
  try {
    const session = res.locals.shopify.session;
    const savedShopDetails = await processAndSaveShopDetails(session);

    res.status(200).json({
      message: "Shop details fetched successfully.",
      shopDetails: savedShopDetails,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
