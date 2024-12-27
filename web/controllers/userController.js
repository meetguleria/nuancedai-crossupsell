import {
  getUserDetails,
  updateUserSettings,
  updateDataConsent,
} from '../services/user.service.js';

export async function getUserDetailsController(req, res) {
  try {
    const session = res.locals.shopify.session;
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: No session found.' });
    }
    const user = await getUserDetails(session);
    res.status(200).json({
      message: 'User details fetched successfully.',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details.' });
  }
}

export async function updateUserSettingsController(req, res) {
  try {
    const session = res.locals.shopify.session;
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: No session found.' });
    }
    const { app_settings } = req.body;
    if (
      typeof app_settings !== 'object' ||
      Array.isArray(app_settings) ||
      app_settings === null
    ) {
      return res.status(400).json({ error: 'Invalid app_settings format.' });
    }
    const updatedUser = await updateUserSettings(session, app_settings);
    res.status(200).json({
      message: 'User settings updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user settings:', error.message);
    res.status(500).json({ error: 'Failed to update user settings.' });
  }
}

export async function updateDataConsentController(req, res) {
  try {
    const session = res.locals.shopify.session;
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: No session found.' });
    }
    const { data_consent } = req.body;
    if (typeof data_consent !== 'boolean') {
      return res.status(400).json({ error: 'Invalid data_consent format. Must be a boolean.' });
    }
    const updatedUser = await updateDataConsent(session, data_consent);
    res.status(200).json({
      message: 'Data consent updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating data consent:', error.message);
    res.status(500).json({ error: 'Failed to update data consent.' });
  }
}