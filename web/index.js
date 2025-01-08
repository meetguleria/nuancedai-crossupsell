import dotenv from 'dotenv';
dotenv.config();

import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";

import storeRoutes from './routes/storeRoutes.js';
import initialSetupRoutes from './routes/initialSetupRoutes.js';
import productRelationshipRoutes from './routes/productRelationshipRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

app.use(shopify.cspHeaders());

app.use(express.json());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use('/api/setup', initialSetupRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/product-relationships', productRelationshipRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(serveStatic(STATIC_PATH, { index: false }));

// Catch-all route for frontend
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));