export function generateRecommendations(products) {

    const uniqueProductIds = new Set(products.map(product => product.id));
    const uniqueProducts = Array.from(uniqueProductIds).map(id => 
        products.find(product => product.id === id));

    return uniqueProducts;
}