import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';

import sequelize from '../config/db.js';

export async function saveProducts(productData) {
    try {
        const { id, title, category } = productData;
        await Product.upsert({
            productId: id,
            productName: title,
            category
        });
        console.log(`Product saved or updated: ${title}`)
    } catch (error) {
        console.error("Error saving products:", error);
        throw new Error('Failed to save products');
    }
}

export async function saveOrderAndItems(orderData, itemsData) {
    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
        const order = await Order.create({
            ...orderData
        }, { transaction });

        //Save each order item, associating them with the saved order
        for (const item of itemsData) {
            await OrderItem.create({
                orderId: order.id,
                ...item
            }, { transaction });
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Failed to save order and items', error);
        throw error;
    }
}