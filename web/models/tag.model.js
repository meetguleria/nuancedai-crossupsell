import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: "Tag",
  tableName: "tags",
  timestamps: false,
});

export default Tag;