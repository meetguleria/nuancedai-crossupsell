import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Order extends Model {}

Order.init({
    shopify_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            notEmpty: true,
        },
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // customer_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: 'customers',
    //       key: 'id',
    //   },
    // },
    line_items: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    order_status: {
      type: DataTypes.JSONB,
      allowNull: true
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
});

export default Order;