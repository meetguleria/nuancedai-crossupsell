import OrderItem from '../models/orderItem.model.js';

export async function saveOrderItems(orderId, lineItems) {
  const formattedItems = lineItems.map(item => ({
    id: item.id,
    order_id: orderId,
    title: item.title,
    variant_id: item.variant?.id,
    quantity: item.quantity,
    price: item.originalTotalSet?.shopMoney?.amount,
  }));

  try {
    await OrderItem.bulkCreate(formattedItems, {
      updateOnDuplicate: ['title', 'variant_id', 'quantity', 'price'],
    });
    console.log('Order items saved/updated successfully.');
  } catch (error) {
    console.error('Error saving order items with bulkCreate:', error);
    throw error;
  }
}
