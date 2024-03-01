import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Order from './order.model.js';

class OrderItem extends Model {}

OrderItem.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'shopify_order_id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    variant_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
});

export default OrderItem;