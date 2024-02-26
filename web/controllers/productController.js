import { processProducts } from '../services/product.service.js';

export async function handleFetchAndSaveProducts(req, res) {
    try {
        // Retrieve the Shopify session from res.locals
        const session = res.locals.shopify.session;

        await processProducts(session);

        res.status(200).json({ message: "Products fetched from Shopify and saved to database successfully."})

        res.status(200).json({ message: "Products fetched from Shopify and saved to database successfully." });
    } catch (error) {
        console.error(`Error in handleFetchAndSaveProducts: ${error}`);
        res.status(500).json({ error: "Failed to fetch and save products." });
    }
}
