import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Customer extends Model {}

Customer.init(
  {
    shopify_customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "ShopCustomer",
    tableName: "shop_customers",
    timestamps: true,
    underscored: true,
  }
);

export default Customer;
