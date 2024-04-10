import OrderItem from '../models/orderItem.model.js';

export async function saveOrderItems(orderId, lineItems) {
  console.log("Raw line items received:", JSON.stringify(lineItems, null, 2));

  const formattedItems = lineItems.map(item => ({
    shop_item_id: item.id,
    order_id: orderId,
    title: item.title,
    variant_id: item.variant?.id,
    quantity: item.quantity,
    price: item.originalTotalSet?.shopMoney?.amount || "0.00",
  }));

  console.log("Formatted items for bulkCreate:", JSON.stringify(formattedItems, null, 2));

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
