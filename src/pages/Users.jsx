import React, { useEffect, useState } from 'react';
import { getAllUsers, saveUser } from '../service/api';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUser(formData);
      toast.success("User Registered!");
      setFormData(initialForm);
      loadUsers();
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toString().includes(searchTerm)
  );

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="fw-bold text-dark">👥 Member Directory</h2>
        <p className="text-muted">Manage library memberships and contact information.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary py-3 border-0 text-center">
              <h5 className="card-title text-white mb-0">Register New Member</h5>
            </div>
            <div className="card-body p-4 bg-white">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="form-floating">
                  <input type="text" name="name" className="form-control border-0 bg-light shadow-none" id="floatName" placeholder="Name" value={formData.name} onChange={handleChange} required />
                  <label htmlFor="floatName">Full Name</label>
                </div>
                <div className="form-floating">
                  <input type="email" name="email" className="form-control border-0 bg-light shadow-none" id="floatEmail" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  <label htmlFor="floatEmail">Email Address</label>
                </div>
                <div className="form-floating">
                  <input type="text" name="phone" className="form-control border-0 bg-light shadow-none" id="floatPhone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                  <label htmlFor="floatPhone">Phone Number</label>
                </div>
                <div className="form-floating">
                  <input type="text" name="address" className="form-control border-0 bg-light shadow-none" id="floatAddress" placeholder="Address" value={formData.address} onChange={handleChange} />
                  <label htmlFor="floatAddress">Address</label>
                </div>
                <div>
                  <label className="form-label text-muted small fw-bold px-1">Join Date</label>
                  <input type="date" name="membershipdate" className="form-control border-0 bg-light shadow-none" value={formData.membershipdate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary rounded-pill py-3 fw-bold mt-2 shadow-sm">
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden p-2 border mb-4">
            <span className="input-group-text bg-transparent border-0 px-3">🔍</span>
            <input type="text" className="form-control border-0 shadow-none" placeholder="Search members..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-uppercase small fw-bold text-muted">
                  <tr>
                    <th className="px-4 py-3 border-0">Member</th>
                    <th className="py-3 border-0">Contact</th>
                    <th className="py-3 border-0 text-center">Joined</th>
                    <th className="px-4 py-3 border-0 text-end">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                  ) : filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{width: '40px', height: '40px'}}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold">{user.name}</div>
                            <div className="text-muted" style={{fontSize: '0.75rem'}}>Address: {user.address || 'N/A'}</div>
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
                      <td className="px-4 text-end text-muted small">#{user.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;