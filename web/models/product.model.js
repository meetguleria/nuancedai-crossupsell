import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Product extends Model {}

Product.init(
  {
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
      allowNull: true,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    inventory_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_src: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_alt_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    underscored: true,
  }
);

export default Product;
