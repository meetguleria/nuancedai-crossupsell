import Order from '../models/Order.js';

async function saveOrders(orderData) {
    try {
        await Order.create(orderData);
        console.log('Order saved successfully');
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
}

export default saveOrders;