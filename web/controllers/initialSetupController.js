import { processAndSaveShopDetails } from "../services/store.service.js";
import { processAndSaveUserDetails } from "../services/user.service.js";
import { processOrders } from "../services/order.service.js";

export const initialSetup = async (req, res) => {
  try {
    const session = res.locals.shopify.session;

    const storeDetails = await processAndSaveShopDetails(session);
    const userShopDetails = await processAndSaveUserDetails(session);
    await processOrders(session);

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