import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  shopify_data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  myshopify_domain: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  primary_domain_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  app_settings: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  data_consent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  underscored: true
});

export default User;