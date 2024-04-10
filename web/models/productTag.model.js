import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./product.model.js";
import Tag from "./tag.model.js";

class ProductTag extends Model {}

ProductTag.init({
  productId: {
    type: DataTypes.INTEGER,
    refrences: {
      model: Product,
      key: 'id',
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: "ProductTag",
  tableName: "product_tags",
  timestamps: false,
});

export default ProductTag;