import {
  createRelationship,
  getRelationshipsForProduct,
  updateRelationship,
  deleteRelationship,
} from "../services/productRelationship.service.js";

export async function createProductRelationship(req, res) {
  try {
    const { productId, relatedProductId, type, priority, source } = req.body;
    if (!productId || !relatedProductId || !type) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const relationship = await createRelationship({
      productId,
      relatedProductId,
      type,
      priority,
      source,
    });
    return res.status(201).json({
      message: "Relationship created successfully.",
      data: relationship,
    });
  } catch (error) {
    console.error("Error creating relationship:", error);
    return res.status(500).json({ error: "Failed to create relationship." });
  }
}

export async function getProductRelationships(req, res) {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Missing productId." });
    }
    const relationships = await getRelationshipsForProduct(productId);
    return res.status(200).json({
      message: "Relationships retrieved successfully.",
      data: relationships,
    });
  } catch (error) {
    console.error("Error fetching relationships:", error);
    return res.status(500).json({ error: "Failed to fetch relationships." });
  }
}

export async function updateProductRelationship(req, res) {
  try {
    const { relationshipId } = req.params;
    if (!relationshipId) {
      return res.status(400).json({ error: "Missing relationshipId." });
    }
    const updated = await updateRelationship(relationshipId, req.body);
    return res.status(200).json({
      message: "Relationship updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating relationship:", error);
    return res.status(500).json({ error: "Failed to update relationship." });
  }
}

export async function deleteProductRelationship(req, res) {
  try {
    const { relationshipId } = req.params;
    if (!relationshipId) {
      return res.status(400).json({ error: "Missing relationshipId." });
    }
    await deleteRelationship(relationshipId);
    return res.status(200).json({
      message: "Relationship deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting relationship:", error);
    return res.status(500).json({ error: "Failed to delete relationship." });
  }
}