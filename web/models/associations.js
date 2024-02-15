import { Product } from './Product.js';
import { Order } from './Order.js';
import { OrderItem } from './OrderItem.js'; 

//Model Associations:
Product.hasMany(OrderItem, { foreignKey: 'productId' });