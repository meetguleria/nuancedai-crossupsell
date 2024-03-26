import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopify_order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "shop_customers",
        key: "id",
      },
    },
    order_status: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    underscored: true,
  }
);

export default Order;
