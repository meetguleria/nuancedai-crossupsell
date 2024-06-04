import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Tag extends Model {}

Tag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: "Tag",
  tableName: "tags",
  timestamps: true,
  underscored: true,
});

export default Tag;