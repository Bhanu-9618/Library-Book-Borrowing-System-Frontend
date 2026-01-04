import React, { useEffect, useState } from 'react';
import { getAllUsers, saveUser, updateUser, deleteUser, searchUsers } from '../service/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = { name: '', email: '', phone: '', address: '', membershipdate: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      setUsers(result.data);
    } catch (error) {
      toast.error("Could not load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      loadUsers();
      return;
    }
    try {
      const result = await searchUsers(value);
      setUsers(result.data);
    } catch (error) {
      setUsers([]);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      const emailExists = users.some(user => user.email === formData.email);
      if (emailExists) {
        toast.error("Email already exists!");
        return;
      }
    }

    try {
      if (isEditing) {
        await updateUser(formData);
        toast.success("User Updated!");
      } else {
        await saveUser(formData);
        toast.success("User Registered!");
      }
      loadUsers();
      resetForm();
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User Deleted");
        loadUsers();
      } catch (error) {
        toast.error("Delete Failed");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold text-dark">👥 Member Directory</h2>
            <p className="text-muted">Manage library memberships and contact information.</p>
          </div>
          <button className={`btn ${showForm ? 'btn-outline-danger' : 'btn-primary'} rounded-pill px-4`}
            onClick={() => showForm ? resetForm() : setShowForm(true)}>
            {showForm ? 'Close' : '+ Add Member'}
          </button>
        </div>

        {showForm && (
          <div className="card border-0 shadow-lg rounded-4 p-4 mb-5">
            <form onSubmit={handleSubmit} className="row g-3">
              {isEditing && (
                <div className="col-md-12">
                  <div className="form-floating">
                    <input type="text" className="form-control bg-light" value={formData.id} readOnly />
                    <label>Member ID</label>
                  </div>
                </div>
              )}
              {!isEditing && (
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <label>Full Name</label>
                  </div>
                </div>
              )}
              <div className={isEditing ? "col-md-12" : "col-md-6"}>
                <div className="form-floating">
                  <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  <label>Email Address</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" name="phone" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                  <label>Phone Number</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" name="address" className="form-control" placeholder="Address" value={formData.address} onChange={handleChange} required />
                  <label>Address</label>
                </div>
              </div>
              {!isEditing && (
                <div className="col-md-12">
                  <label className="form-label text-muted small fw-bold px-1">Join Date</label>
                  <input type="date" name="membershipdate" className="form-control" value={formData.membershipdate} onChange={handleChange} required />
                </div>
              )}
              <div className="col-12">
                <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} w-100 rounded-pill py-3 fw-bold`}>
                  {isEditing ? 'Update Member' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden p-2 border mb-4" style={{ maxWidth: '500px' }}>
          <span className="input-group-text bg-transparent border-0 px-3">🔍</span>
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search by ID or Name..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-uppercase small fw-bold text-muted" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <tr>
                  <th className="px-4 py-3 border-0">ID</th>
                  <th className="py-3 border-0">Member</th>
                  <th className="py-3 border-0">Contact</th>
                  <th className="py-3 border-0 text-center">Joined</th>
                  <th className="px-4 py-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-muted">#{user.id}</td>
                    <td className="py-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold">{user.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>Address: {user.address || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="small fw-semibold">{user.email}</div>
                      <div className="text-muted small">{user.phone}</div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark border rounded-pill px-3 fw-normal">{user.membershipdate}</span>
                    </td>
                    <td className="px-4 text-end">
                      <button className="btn btn-sm btn-outline-info rounded-circle me-2" onClick={() => handleEdit(user)}>✏️</button>
                      <button className="btn btn-sm btn-outline-danger rounded-circle" onClick={() => handleDelete(user.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;