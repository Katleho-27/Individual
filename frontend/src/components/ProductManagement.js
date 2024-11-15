// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductManagement = ({ setProducts }) => { // Receive setProducts from App
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data); // Update shared products state
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : 'http://localhost:5000/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
        setNewProduct({ name: '', description: '', price: '', quantity: '' });
        setEditingProduct(null);
        setError('');
      } else {
        throw new Error('Error adding/updating product');
      }
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, quantity: updatedQuantity }),
        });
        if (response.ok) {
          fetchProducts();
        } else {
          throw new Error('Error selling product');
        }
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      } else {
        throw new Error('Error deleting product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="product-management">
      <header className="header">
        <h2>Product Management</h2>
        <nav className="navigation">
          <h1>
            <Link to="/dashboard">Dashboard</Link>
          </h1>
          <h1>
            <Link to="/users">User Management</Link>
          </h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Product List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleSellProduct(product.id)}>Sell</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     {/* Space for images */}
      <div className="product-images">
        <div className="image-gallery">
          <img src="/pic2.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic3.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic4.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic5.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic6.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic7.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic8.jpg" alt="Product Image" width={400} height={800}/>
          <img src="/pic9.jpg" alt="Product Image" width={400} height={800}/>
        </div>
      </div>



      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Product Management Inc. All Rights Reserved.</p>
        <p>
          <Link to="/terms">Terms & Conditions</Link> |{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
};

export default ProductManagement;
