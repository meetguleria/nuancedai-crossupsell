import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    shopify_item_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variant_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
    underscored: true,
  }
);

export default OrderItem;
