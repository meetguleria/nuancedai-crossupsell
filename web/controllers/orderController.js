import { processOrders } from '../services/order.service.js';

const orderController = {
    async fetchAndProcessOrders(req, res) {
        try {
            const session = res.locals.shopify.session;

            await processOrders(session);

            res.status(200).json({ message: "Orders fetched and processed successfully." });
        } catch (error) {
          console.error(`Failed to fetch and process orders: ${error}`);
          res.status(500).json({ error: "Failed to fetch and process orders."});
        }
    },
}