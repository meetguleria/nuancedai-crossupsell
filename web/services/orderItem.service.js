import OrderItem from '../models/orderItem.model.js';

export async function saveOrderItems(orderId, lineItems) {
  const formattedItems = lineItems.map(item => ({
    id: item.id,
    order_id: orderId,
    title: item.title,
    variant_id: item.variantId,
    quantity: item.quantity,
    price: item.price,
  }));

  try {
    await OrderItem.bulkCreate(formattedItems, {
      updatedOnDuplicate: ['title', 'variant_id', ]
    });
    console.log('Order items saved/updated successfully.');
  } catch (error) {
    console.error('Error saving order items with bulkCreate:', error);
    throw error;
  }
}
