import Product from '../models/product.model';

async function saveOrUpdateProducts(productsData) {
    try {
        const formattedProducts = products.map(product => ({
            shopify_product_id: product.id,
            title: product.title,
            body_html: product.body_html,
            vendor: product.vendor,
            product_type: product.product_type
        }));

        await Product.bulkcreate(formattedProducts, {
            updateOnDuplicate: ['title', 'body_html', 'vendor', 'product_type']
        });

        console.log('Products saved/updated successfully');
    } catch (error) {
        console.error('Failed to save products to database:', error);
    }
};

export default { saveOrUpdateProducts };