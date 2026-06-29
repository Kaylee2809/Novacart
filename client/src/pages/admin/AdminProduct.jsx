import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id)=>{

try{

await api.delete(`/products/${id}`);

setProducts(
 products.filter(
  (p)=>p._id !== id
 )
);


}catch(err){

console.log(err);

}

};

  return (
    <div>

      <div className="admin-header">
        <h1>Products</h1>
        <p>Manage your store products</p>
      </div>

      <div className="admin-grid">

        {products.map((p) => (
          <div key={p._id} className="admin-card">

            <img src={`http://localhost:5000/images/${p.image}`} alt={p.name} className="admin-img"/>

            <div>
              <h3>{p.name}</h3>
              <p>R {p.price}</p>
              <p className="desc">{p.description}</p>
              <p className="category">📁 {p.category}</p>
            </div>

            <button onClick={() => deleteProduct(p._id)}>
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}