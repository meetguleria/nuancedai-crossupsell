import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export class Product extends Model {}
Product.init({
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'product_id'
    },
    productName: {
        type: DataTypes.STRING,
        field: 'product_name'
    },
    category: DataTypes.STRING
}, { sequelize, modelName: 'Product', tableName: 'Products' });