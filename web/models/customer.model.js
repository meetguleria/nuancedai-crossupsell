import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { encrypt, decrypt } from "../utils/encryption.js";

class Customer extends Model {
  getDecryptedName() {
    if (this.name) {
      const encrypted = JSON.parse(this.name);
      return decrypt(encrypted);
    }
    return null;
  }
}

Customer.init({
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
      set(value) {
        const encrypted = encrypt(value);
        this.setDataValue('name', JSON.stringify(encrypted));
      },
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
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
    underscored: true,
});

export default Customer;
