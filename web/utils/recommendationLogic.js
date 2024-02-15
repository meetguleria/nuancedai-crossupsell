export function generateRecommendations(products) {

    const uniqueProductIds = new Set(prodcuts.map(product => product.id));
    const uniqueProducts = Array.from(uniqueProductIds).map(id => 
        products.find(product => product.id === id));

    return uniqueProducts;
}