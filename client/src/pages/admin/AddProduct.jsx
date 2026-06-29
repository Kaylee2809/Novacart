import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product added!");
      navigate("/admin");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-page">
  <div className="add-product-card">

    <h1>Add Product</h1>

    <form onSubmit={handleSubmit} className="product-form">

      <input
        className="input"
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        placeholder="Price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        className="input textarea"
        placeholder="Product Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="input"
        placeholder="Category (Phones, Laptops...)"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="file-input"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit" className="btn">
        Create Product
      </button>

    </form>

  </div>
</div>
  );
}