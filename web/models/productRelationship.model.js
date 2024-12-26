import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./product.model.js";

class ProductRelationship extends Model {}

ProductRelationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    relatedProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["upsell", "cross-sell"]],
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: "default",
    },
  },
  {
    sequelize,
    modelName: "ProductRelationship",
    tableName: "product_relationships",
    timestamps: true,
    underscored: true,
  }
);

export default ProductRelationship;
