import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';

class Product extends Model {}

Product.init({
  shopify_product_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Allowing null as not all products may have descriptions
  },
  vendor: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field, consider JSON or array type based on your DB
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Optional, consider your business logic
  },
  inventory_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional field
  },
  image_src: {
    type: DataTypes.STRING,
    allowNull: true, // This will store the URL of the main product image
  },
  image_alt_text: {
    type: DataTypes.STRING,
    allowNull: true, // For SEO and accessibility, optional
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true, // Optional field for tracking when products were added
  },
}, {
  sequelize, // passing the `sequelize` instance is required
  modelName: 'Product', // We choose the model name
  tableName: 'products', // Define the table name explicitly
  timestamps: true, // Enable timestamp fields (createdAt, updatedAt)
  underscored: true, // Use snake_case rather than camelCase for database attributes
});

export default Product;