import { processAndSaveShopDetails } from "../services/store.service.js";
import { fetchShopifyShopDetails as fetchUserShopDetails } from "../services/user.service.js";

export const initialSetup = async (req, res) => {
  try {
    const session = res.locals.shopify.session;

    const storeDetails = await processAndSaveShopDetails(session);
    const userShopDetails = await fetchUserShopDetails(session);

    res.status(200).json({
      message: "Initial setup completed successfully.",
      storeDetails: storeDetails,
      userShopDetails: userShopDetails,
    });
  } catch (error) {
    console.error("Error during initial setup:", error.message);
    res.status(500).json({ error: "Internal server error during initial setup."});
  }
}