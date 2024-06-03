import OrderItem from '../models/orderItem.model.js';

const extractIdFromGid = (gid) => {
  if (!gid) {
    return null;
  }
  const matches = gid.match(/gid:\/\/shopify\/[A-Za-z]+\/(\d+)/);
  return matches ? matches[1] : null;
};

export async function saveOrderItems(orderId, lineItems) {
  console.log("Raw line items received:", JSON.stringify(lineItems, null, 2));

  const formattedItems = lineItems.map(item => ({
    shop_item_id: extractIdFromGid(item.id),
    order_id: orderId,
    title: item.title,
    variant_id: extractIdFromGid(item.variant?.id),
    quantity: item.quantity,
    price: item.price || "0.00",
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
