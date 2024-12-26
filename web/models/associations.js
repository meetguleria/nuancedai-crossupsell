import sequelize from '../config/db.js';
import Product from './product.model.js';
import Tag from './tag.model.js';
import ProductTag from './productTag.model.js';
import ProductRelationship from './productRelationship.model.js';

// Product and Tag through ProductTag
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'productId' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tagId' });

// Product and ProductRelationship (self-referencing relationships)
Product.hasMany(ProductRelationship, { foreignKey: 'productId' });
ProductRelationship.belongsTo(Product, { foreignKey: 'relatedProductId' });

export { sequelize, Product, Tag, ProductTag, ProductRelationship };
