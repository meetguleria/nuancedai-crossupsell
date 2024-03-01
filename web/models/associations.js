import sequelize from '../config/db.js';
import User from './user.model.js';
import Store from './store.model.js';
import Order from './order.model.js';
import OrderItem from './orderItem.model.js';

User.hasMany(Store, { foreignKey: 'userId' });
Store.belongsTo(User, {foreignKey: 'userId' });
Store.hasMany(Order, { foreignKey: 'storeId' });
Order.belongsTo(Store, { foreignKey: 'storeId' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

export { sequelize, Order, OrderItem };