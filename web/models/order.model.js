import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Order extends Model {}

Order.init(
  {
    shopify_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "shop_customers",
        key: "id",
      },
    },
    displayFinancialStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayFulfillmentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shipping_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_country: {
      type: DataTypes.STRING,
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
