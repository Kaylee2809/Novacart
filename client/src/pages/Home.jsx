import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  console.log("PRODUCTS ARRAY:", products);

  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch(err) {
        console.log(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(Boolean)
    .filter((product)=>{
      const matchesSearch =
      product.name
      .toLowerCase()
      .includes(search.toLowerCase());
      const matchesCategory =
      category === "All" ||
      product.category === category;
      return matchesSearch && matchesCategory;
    });

  return (

    <div className="container">

      <h1>Products</h1>

      <div className="shop-controls">
        <input type="text" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)}/>

        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="All">
            All Categories
          </option>
          <option value="Smartphones">
            Smartphones
          </option>
          <option value="Laptops">
            Laptops
          </option>
          <option value="Audio">
            Audio
          </option>
          <option value="Gaming">
            Gaming
          </option>
          <option value="Gaming Accessories">
            Gaming Accessories
          </option>
          <option value="Wearables">
            Wearables
          </option>
          <option value="PC Components">
            PC Components
          </option>
          <option value="Smart Home">
            Smart Home
          </option>
        </select>
      </div>

      <div className="grid">
        {filteredProducts.map((p)=>(<ProductCard key={p._id} product={p}/>
        ))}
      </div>
    </div>
  );
}