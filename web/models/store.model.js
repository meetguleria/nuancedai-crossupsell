import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Store extends Model {}

Store.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
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
  installed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Store',
  tableName: 'stores',
  timestamps: true,
  underscored: true,
});

export default Store;