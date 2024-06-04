import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Customer from "./customer.model.js";

class Order extends Model {}

Order.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
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
        model: Customer,
        key: 'shopify_customer_id',
      },
    },
    display_financial_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    display_fulfillment_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    underscored: true,
  });

Order.belongsTo(Customer, { foreignKey: 'customer_id' });
export default Order;
