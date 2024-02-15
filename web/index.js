// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";
import reccomendationsRouter from './routes/recommendations.js';

const app = express();

app.use(express.json());

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
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

//app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/api/*", (req, res, next) => {
    console.log('Validating session for', req.path);
    next();
}, shopify.validateAuthenticatedSession(), (req, res, next) => {
    console.log('Session validated for', req.path);
    next();
});

// Right after your express.json() middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    if (Object.keys(req.query).length) console.log(`Query Parameters:`, req.query);
    if (Object.keys(req.body).length) console.log(`Body:`, req.body);
    next();
});

app.use(reccomendationsRouter);

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products", async (req, res) => {
  try {
    console.log("Attempting to fetch products...");
    const session = res.locals.shopify.session;
    if (!session) {
      console.log("No session found");
      throw new Error("Session not found");
    }
    console.log("Session found:", session);

    const { Product } = shopify.api.rest;
    const products = await Product.all({ session });

    console.log("Fetched Products:", JSON.stringify(products, null, 2));
    res.status(200).json(products);
  } catch (error) {
    console.error(`Failed to fetch products: ${error.message}`);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
