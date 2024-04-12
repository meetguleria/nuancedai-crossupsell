export default function ProductCard(product) {

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name}/>
      <div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>

    </div>
  )
}