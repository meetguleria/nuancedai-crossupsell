import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/db.js';

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
        allowNul: false,
    },
    customer_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'customers',
            key: 'id',
        },
    },
    shipping_city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shipping_country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
});

export default Order;