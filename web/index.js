import './config/env.js';
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";

import storeRoutes from './routes/storeRoutes.js';
import initialSetupRoutes from './routes/initialSetupRoutes.js';

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

app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), shopify.redirectToShopifyOrAppRoot());

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.use(express.static(STATIC_PATH));

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());

app.use('/api/setup', initialSetupRoutes);
app.use('/api/stores', storeRoutes);

app.use(shopify.cspHeaders());

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.use('*', (req, res) => {
  res.sendFile(join(STATIC_PATH, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));