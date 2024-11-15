import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Style.css'; // Import the external CSS file

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <nav className="navigation">
        <h1 className="nav-links">
          <Link to="/products">Product Management</Link>
        </h1>
        <h1 className="nav-links">
          <Link to="/users">User Management</Link>
        </h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      </header>

      <section className="dashboard-section">
        <h3>Products Added</h3>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div className="product-display">
            <div className="chart-container">
              <ProductBarChart products={products} />
            </div>
            
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${formatPrice(product.price)}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
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

export default Dashboard;
