import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class Store extends Model {}

Store.init({
  shopify_store_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shopify_domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  myshopify_domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primary_domain_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shopify_store_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasCompletedOnboarding: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Store',
  tableName: 'stores',
  timestamps: true,
  underscored: true,
});

export default Store;