import ProductRelationship from "../models/productRelationship.model.js";

export async function createRelationship({ productId, relatedProductId, type, priority = 0, source = "default" }) {
  if (!productId || !relatedProductId || !type) throw new Error("Missing fields");
  return await ProductRelationship.create({ productId, relatedProductId, type, priority, source });
}

export async function getRelationshipsForProduct(productId) {
  return await ProductRelationship.findAll({ where: { productId } });
}

export async function updateRelationship(relationshipId, updates) {
  const rel = await ProductRelationship.findByPk(relationshipId);
  if (!rel) throw new Error("Not found");
  return await rel.update(updates);
}

export async function deleteRelationship(relationshipId) {
  const rel = await ProductRelationship.findByPk(relationshipId);
  if (!rel) throw new Error("Not found");
  return await rel.destroy();
}