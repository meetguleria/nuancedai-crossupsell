import shopify from '../shopify.js';
import Product from '../models/product.model.js';
import Tag from '../models/tag.model.js';
import ProductTag from '../models/productTag.model.js';

const GET_PRODUCTS_QUERY = `
query getProducts($first: Int = 250) {
  products(first: $first) {
    edges {
      node {
        id
        title
        bodyHtml
        vendor
        productType
        featuredImage {
          src
          altText
        }
        variants(first: 1) {
          edges {
            node {
              price
              inventoryQuantity
            }
          }
        }
        tags
        publishedAt
      }
    }
  }
}`;

export async function fetchProducts(session) {
  const client = new shopify.api.clients.Graphql({ session });
  let productsData = [];

  try {
    const response = await client.request(GET_PRODUCTS_QUERY, { variables: {} });

      if (response.errors) {
        console.error('GraphQL Errors:', response.errors);
        throw new Error('GraphQL query failed');
      }

      productsData = response.data.products.edges.map(edge => ({
        shopify_product_id: edge.node.id,
        title: edge.node.title,
        description: edge.node.bodyHtml,
        vendor: edge.node.vendor,
        product_type: edge.node.productType,
        tags: edge.node.tags,
        price: edge.node.variants.edges[0]?.node.price,
        inventory_quantity: edge.node.variants.edges[0]?.node.inventoryQuantity,
        image_src: edge.node.featuredImage?.src,
        image_alt_text: edge.node.featuredImage?.altText,
        published_at: edge.node.publishedAt,
      }));
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
    return productsData;
}

async function saveOrUpdateProducts(productsData) {
  try {
    for (const productData of productsData) {
      // Exclude tags from productData before saving
      const { tags, ...productDetails } = productData;
      const [product, created] = await Product.findOrCreate({
        where: { shopify_product_id: productDetails.shopify_product_id },
        defaults: productDetails
      });

      // Hand tags if present
      if (tags && tags.length) {
        // If tags is a string, split into an array; otherwise, use it directly
        const tagNames = typeof tags === 'string' ? tags.split(', ') : tags;
        for (const tagName of tagNames) {
          const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
          // Create association if it doesn't exist
          await ProductTag.findOrCreate({
            where: { productId: product.id, tagId: tag.id }
          });
        }
      }
    }
      console.log('Products and tags saved/updated successfully.');
    } catch (error) {
        console.error('Error saving/updating products:', error);
        throw error;
    }
    return productsData;
}

export async function processProducts(session) {
  const productsData = await fetchProducts(session);
  await saveOrUpdateProducts(productsData);
  console.log('Complete process of fetching and saving products finished successfully.');
}