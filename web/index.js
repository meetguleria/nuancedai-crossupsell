import './config/env.js';
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";

import { fetchProducts } from './services/shopifyService.js';
import  shopifyRoutes from './routes/shopifyRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(shopify.config.auth.callbackPath, (req, res, next) => {
    console.log('OAuth callback received', req.query);
    next();
}, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());  

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is successfully connected!' });
});  

app.get('/api/products', async (req, res) => {
    try {
        const session = res.locals.shopify.session;
        const products = await fetchProducts(session);
        res.json(products);
    } catch (error) {
        console.error(`Failed to fetch products: ${error}`);
        res.status(500).json({ error: "Failed to fetch products"});
    }
});

app.use('/api/orders', orderRoutes);

app.use('/api/shopify', shopifyRoutes);
app.use('/api/products', productRoutes);
app.use(shopify.cspHeaders());

app.use
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));