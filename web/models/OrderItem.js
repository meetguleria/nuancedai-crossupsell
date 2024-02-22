import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export class OrderItem extends Model {}
OrderItem.init({
    orderItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'order_item_id'
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Order',
            key: 'orderId',
        },
        field: 'order_id'
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'productId'
        },
        field: 'product_id'
    },
    quantity: DataTypes.INTEGER
}, { sequelize, modelName: 'OrderItem', tableName: 'OrderItems' });
