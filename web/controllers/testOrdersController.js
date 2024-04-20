import  createTestOrders from '../services/testOrderService.js';

export async function handleCreateTestOrders(req, res) {
  try {
    const session = res.locals.shopify.session;

    await createTestOrders(session);

    res.status(200).json({ message: "Test orders created successfully."});
  } catch (error) {
    console.error(`Error in handleCreateTestOrders: ${error}`);
    res.status(500).json({ error: "Failed to create test orders."});
  }
}