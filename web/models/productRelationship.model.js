import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class ProductRelationship extends Model {}

ProductRelationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relatedProductId: {
      type: DataTypes.STRING,
      allowNull: false,
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
    triggerLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pdp",
      validate: {
        isIn: [["pdp", "cart", "checkout", "post-purchase"]],
      },
    },
    displayType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "popup",
      validate: {
        isIn: [["popup", "inline", "banner", "sidebar"]],
      },
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