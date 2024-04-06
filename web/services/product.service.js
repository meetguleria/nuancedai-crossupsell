import shopify from '../shopify.js';
import Product from '../models/product.model.js';

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
    const response = await client.request({
      data: 
        {
          query: GET_PRODUCTS_QUERY,
          variables: {},
        },
      });

      if (response.body.errors) {
        console.error('GraphQL Errors:', response.body.errors);
        throw new Error('GraphQL query failed');
      }

      productsData = response.body.data.products.edges.map(edge => ({
        shopify_product_id: edge.node.id,
        title: edge.node.title,
        description: edge.node.bodyHtml,
        vendor: edge.node.vendor,
        product_type: edge.node.productType,
        tags: edge.node.tags.join(', '),
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
        await Product.bulkCreate(productsData, {
            updateOnDuplicate: ['title', 'description', 'vendor', 'product_type', 'tags', 'price', 'inventory_quantity', 'image_src', 'image_alt_text', 'published_at']
        });

        console.log('Products saved/updated successfully.');
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