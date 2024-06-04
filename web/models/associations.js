import sequelize from '../config/db.js';
import User from './user.model.js';
import Store from './store.model.js';
import Order from './order.model.js';
import OrderItem from './orderItem.model.js';
import ShopCustomer from './shopCustomer.model.js';
import Tag from './tag.model.js';
import ProductTag from './productTag.model.js';

// User and Store
User.hasMany(Store, { foreignKey: 'user_id' });
Store.belongsTo(User, {foreignKey: 'user_id' });

// Store and Order
Store.hasMany(Order, { foreignKey: 'store_id' });
Order.belongsTo(Store, { foreignKey: 'store_id' });

// Order and OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// ShopCustomer and Order
ShopCustomer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(ShopCustomer, { foreignKey: 'customer_id' });

// Product and Tag through ProductTag
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'productId' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tagId' });

export { sequelize, User, Store, Order, OrderItem, ShopCustomer, Product, Tag, ProductTag };
