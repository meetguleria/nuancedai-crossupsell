import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
    shopify_product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body_html: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    vendor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_type: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'products',
});