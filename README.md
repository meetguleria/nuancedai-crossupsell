**NuancedAI - CrossUpsell** is a Shopify app designed to help merchants increase revenue through targeted cross-sell and upsell recommendations. It leverages Shopify’s APIs for data access and a PostgreSQL database (via Sequelize) to store critical application data such as store details, user settings, and product relationships.

---

## Table of Contents

1. [Project Purpose](#1-project-purpose)  
2. [High-Level Architecture](#2-high-level-architecture)  
3. [Key Technologies](#3-key-technologies)  
4. [Folder Structure (Overview)](#4-folder-structure-overview)  
5. [Environment Setup](#5-environment-setup)  
6. [Local Development Workflow](#6-local-development-workflow)  
7. [Core Functionalities & Data Flows](#7-core-functionalities--data-flows)  
   1. [Store Onboarding & Shop Sync](#71-store-onboarding--shop-sync)  
   2. [Product Relationship Management](#72-product-relationship-management)  
   3. [User Management & Settings](#73-user-management--settings)  
   4. [Frontend-Backend Communication](#74-frontend-backend-communication)  
8. [Security & Sensitive Data Handling](#8-security--sensitive-data-handling)

---

## 1. Project Purpose

**NuancedAI - CrossUpsell** focuses on:

- **Revenue Optimization**: Presenting customers with relevant products to boost average order value.  
- **Automated Relationship Management**: Quickly create and maintain product pairings for cross-sells and upsells.  
- **Streamlined Onboarding**: Seamlessly sync Shopify store information when the app is first installed.  
- **Modular Code Structure**: Separating controllers, services, and data models for clarity and scalability.

---

## 2. High-Level Architecture

```
┌───────────────────────────────────┐
│    Shopify Store (Merchant)      │
│    - OAuth Installation          │
│    - GraphQL/REST Integration    │
└───────────────────────┬──────────┘
                        │
                        │  (OAuth & Data Sync)
                        │
┌───────────────────────▼──────────────────────┐
│           NuancedAI - CrossUpsell            │
│               (Backend - Node)               │
│  • Handles Product Relationship CRUD         │
│  • Manages Store/User Data                   │
│  • Validates Shopify Sessions                │
└───────────────────────┬──────────────────────┘
                        │
                        │  (Sequelize ORM)
                        │
            ┌───────────▼─────────────┐
            │   PostgreSQL Database   │
            │   (Stores, Users, etc.) │
            └──────────────────────────┘
                        │
                        │  (React + Polaris UI)
                        │
            ┌───────────▼─────────────┐
            │   NuancedAI Frontend    │
            │     (Vite + React)      │
            └──────────────────────────┘
```

1. **Shopify Integration**: The merchant installs the app via OAuth. Store data is pulled from Shopify (GraphQL/REST).  
2. **Backend (Express)**: Handles session validation, CRUD endpoints for product relationships, store/user onboarding, and webhook events.  
3. **PostgreSQL**: Stores persistent data like product relationships, store records, and user settings.  
4. **Frontend (React)**: Embedded within Shopify’s admin UI. Uses Shopify Polaris for a consistent interface and communicates with the backend via secure endpoints.

---

## 3. Key Technologies

- **Node.js (Express)**: Lightweight web server for routing and middleware.  
- **Shopify App Bridge & @shopify/shopify-app-express**: Manages OAuth flows, embedded session handling.  
- **Sequelize (PostgreSQL)**: ORM for handling database reads, writes, and migrations.  
- **React & Vite**: Builds a responsive, embedded single-page app with hot-reload.  
- **Shopify Polaris**: Ensures a polished, Shopify-native UI experience.

---

## 4. Folder Structure (Overview)

While the project revolves around a **unified codebase** under `web/`, it is conceptually divided into **backend** (Node/Express) and **frontend** (React/Polaris) modules:

```
web/
├─ config/            # Database connection and setup scripts
├─ controllers/       # Express controllers for store, user, product relationships
├─ routes/            # Express routes mapping to the respective controllers
├─ services/          # Business logic and database interactions
├─ models/            # Sequelize models representing DB tables
├─ utils/             # Reusable helpers (e.g., encryption, database setup)
├─ shopify.js         # Shopify app configuration (session handling, OAuth settings)
├─ privacy.js         # Privacy webhooks required by Shopify
├─ index.js           # Main Express server entry point
└─ frontend/          # React-based embedded app (Shopify Polaris UI + Vite)
   ├─ index.html
   ├─ index.jsx
   ├─ vite.config.js
   ├─ components/     # Shared UI elements, providers, modals
   ├─ hooks/          # Custom React hooks for data fetching and authentication
   ├─ pages/          # Individual pages (Home, NotFound, Onboarding, etc.)
   ├─ Routes.jsx      # Dynamic route definitions using React Router
   └─ ...
```

---

## 5. Environment Setup

1. **Create a `.env` file** at the project root:

   ```bash
   SHOPIFY_API_KEY=<your_app_key>
   SHOPIFY_API_SECRET=<your_app_secret>
   SCOPES=read_products,write_products
   HOST=<ngrok_or_production_url>
   
   BACKEND_PORT=3000
   FRONTEND_PORT=5173
   
   DATABASE_NAME=<postgres_db_name>
   DATABASE_USER=<postgres_user>
   DATABASE_PASSWORD=<postgres_password>
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   
   NODE_ENV=development
   ```

   Make sure to keep `.env` out of version control for security.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Initialize the database** (development mode):
   ```bash
   node web/config/setupDatabase.js
   ```
   This will sync your models with PostgreSQL, creating necessary tables.

---

## 6. Local Development Workflow

1. **Expose your local server** (if testing on a Shopify dev store) with ngrok:
   ```bash
   ngrok http 3000
   ```
   Set `HOST` to your ngrok URL in `.env`.

2. **Start the backend and frontend**:
   ```bash
   npm run dev
   ```
   - Express server listens on **port 3000**.  
   - Vite dev server listens on **port 5173**.

3. **Install the app in your Shopify dev store**:
   - Use the *Test your app* link in the Shopify Partners dashboard or manually install using your `<ngrok_url>/api/auth`.  
   - Upon installation, the app syncs the store’s details and creates the necessary DB records.

---

## 7. Core Functionalities & Data Flows

### 7.1 Store Onboarding & Shop Sync
- When a merchant installs the app, the **backend** fetches store info from Shopify’s GraphQL API and saves it to the `Store` table.  
- An onboarding flag (`hasCompletedOnboarding`) is used to track whether the merchant has finished initial setup.

### 7.2 Product Relationship Management
- **CRUD operations** handle cross-sell/upsell relationships, stored in a `ProductRelationship` table.  
- Endpoints like `POST /api/product-relationships` or `GET /api/product-relationships/:productId` allow merchants to create or retrieve these relationships.  
- Additional fields (e.g., `priority`, `type`, `triggerLocation`) let merchants control how and where recommendations appear.

### 7.3 User Management & Settings
- **User records** tie to `myshopify_domain` and store relevant info such as `email`, `app_settings`, and data consent.  
- Routes like `PUT /api/user/settings` enable merchants to customize app behavior, e.g., toggling certain recommendation features.

### 7.4 Frontend-Backend Communication
- The **React** frontend uses Shopify’s embedded app libraries (via `@shopify/app-bridge-react`) to handle secure, token-based requests.  
- Custom hooks (e.g., `useAuthenticatedFetch`) ensure that requests to the backend include valid session headers.  
- UI elements (like modals for onboarding) rely on real-time data from the backend to guide user actions.

---

## 8. Security & Sensitive Data Handling

1. **Session Storage**:  
   - OAuth tokens are securely persisted in PostgreSQL using `PostgreSQLSessionStorage`.  
   - Automatic re-authentication triggers if tokens expire, preventing unauthorized access.

2. **Encryption**:  
   - Utility functions in `web/utils/encryption.js` can encrypt or decrypt data if needed for sensitive fields.

3. **Data Validation & Error Handling**:  
   - Controllers verify incoming requests to avoid partial/inconsistent data.  
   - Errors are handled gracefully and logged for debugging.

4. **Privacy Webhooks**:  
   - Shopify’s mandatory data deletion or anonymization webhooks (`CUSTOMERS_DATA_REQUEST`, `CUSTOMERS_REDACT`, `SHOP_REDACT`) are handled in `privacy.js`, ensuring compliance with Shopify’s policies.

---