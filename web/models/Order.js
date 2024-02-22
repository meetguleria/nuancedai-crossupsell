import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Order extends Model {}

Order.init({
  buyerAcceptsMarketing: {
    type: DataTypes.BOOLEAN,
    field: 'buyer_accepts_marketing',
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentTotalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'current_total_price',
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
});

export default Order;
