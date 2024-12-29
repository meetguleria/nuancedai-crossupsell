import { processAndSaveShopDetails, getOnboardingStatus, completeOnboarding } from "../services/store.service.js";

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

export async function getOnboardingStatusController(req, res) {
  try {
    const storeId = req.params.storeId;
    const onboardingStatus = await getOnboardingStatus(storeId);
    res.status(200).json({ hasCompletedOnboarding: onboardingStatus });
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    res.status(500).json({ error: "Failed to fetch onboarding status." });
  }
}

export async function completeOnboardingController(req, res) {
  try {
    const storeId = req.params.storeId;
    const updatedStore = await completeOnboarding(storeId);
    res.status(200).json({ hasCompletedOnboarding: updatedStore.hasCompletedOnboarding });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    res.status(500).json({ error: "Failed to complete onboarding." });
  }
}