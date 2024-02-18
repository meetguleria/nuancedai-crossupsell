import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';

import sequelize from '../config/db.js';

export async function saveProducts(productData) {
    try {
        const { id, title, vendor, product_type, tags, images } = productData;
        
        const primaryImage = images.length > 0 ? images[0] : null;
        await Product.upsert({
            productId: id,
            productName: title,
            vendor: vendor,
            productType: product_type,
            tags: tags.join(', '),
            imageUrl: primaryImage ? primaryImage.src : null,
            imageWidth: primaryImage ? primaryImage.width : null,
            imageHeight: primaryImage ? primaryImage.height : null,
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
                productId: item.productId,
                quantity: item.quantity,
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