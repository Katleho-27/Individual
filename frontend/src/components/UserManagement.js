// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Error fetching users');
      }
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setNewUser({ username: '', password: '' });
        fetchUsers();
      } else {
        setError('Error adding user');
      }
    } catch (err) {
      setError('Error adding user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, password: '' });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setEditingUser(null);
        setNewUser({ username: '', password: '' });
        fetchUsers();
      } else {
        setError('Error updating user');
      }
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      } else {
        setError('Error deleting user');
      }
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-management">
      <header className="header">
        <h2 className="header-title">User Management</h2>
        <nav className="navigation">
          <h1 className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
          </h1>
          <h1 className="nav-links">
            <Link to="/products">Product Management</Link>
          </h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default UserManagement;

