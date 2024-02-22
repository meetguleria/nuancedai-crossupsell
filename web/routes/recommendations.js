// import express from 'express';
// import { fetchOrderItemsForRecommendations } from '../utils/fetchData.js';
// import { generateRecommendations } from '../utils/recommendationLogic.js'

// const router = express.Router();

// router.get('/recommendations', async (req, res) => {
//     try {
//         console.log("Attempting to fetch recommendations...");
//         const session = res.locals.shopify.session;
//         if (!session) {
//             console.log("No session found");
//             return res.status(403).send("Session not found");
//         }

//         const products = await fetchOrderItemsForRecommendations(session);
//         const recommendations = generateRecommendations(products);

//         res.json({ success: true, recommendations });
//     } catch (error) {
//         console.error('Error generating recommendations:', error);
//         res.status(500).json({ error: 'Failed to generate recommendations' });
//     }
// });

// export default router;