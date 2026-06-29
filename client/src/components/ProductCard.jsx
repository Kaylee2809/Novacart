import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000/images/${product.image}`}
          alt={product.name}
        />

        <h3>{product.name}</h3>
        <p>R {product.price}</p>
      </Link>
    </div>
  );
}




