import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export class Order extends Model {}
Order.init({
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'order_id'
    },
    customerId: {
        type: DataTypes.STRING,
        field: 'customer_id'
    },
    orderDate: {
        type: DataTypes.DATE,
        field: 'order_date'
    }
}, { sequelize, modelName: 'Order', tableName: 'Orders', timestamps: false });
