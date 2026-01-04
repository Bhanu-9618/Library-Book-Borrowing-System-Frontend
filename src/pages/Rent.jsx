import React, { useState } from 'react';
import { saveBorrow } from '../service/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Rent = () => {
    const initialForm = { userid: '', bookid: '', borrowdate: '', dueDate: '', status: 'Borrowed' };
    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await saveBorrow(formData);
            toast.success(response.data || "Transaction Successful!");
            setFormData(initialForm);
        } catch (error) {
            toast.error("Transaction Failed. Check IDs.");
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="bg-light min-vh-100 py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">📖 Rent Book</h2>
                        <p className="text-muted">Register book borrowings and set return deadlines.</p>
                    </div>

                    <div className="row justify-content-center g-4">
                        <div className="col-lg-5">
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-header bg-success py-3 border-0 text-center">
                                    <h5 className="card-title text-white mb-0">New Rent</h5>
                                </div>
                                <div className="card-body p-4 bg-white">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Identification</label>
                                            <div className="input-group mb-3 shadow-sm rounded">
                                                <span className="input-group-text bg-light border-0">👤</span>
                                                <input type="number" name="userid" className="form-control border-0 bg-light" placeholder="User ID" value={formData.userid} onChange={handleChange} required />
                                            </div>
                                            <div className="input-group shadow-sm rounded">
                                                <span className="input-group-text bg-light border-0">📚</span>
                                                <input type="number" name="bookid" className="form-control border-0 bg-light" placeholder="Book ID" value={formData.bookid} onChange={handleChange} required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Schedule</label>
                                            <div className="row g-2">
                                                <div className="col-6">
                                                    <div className="p-2 bg-light rounded-3 shadow-sm">
                                                        <label className="x-small text-muted d-block fw-bold">Issue Date</label>
                                                        <input type="date" name="borrowdate" className="form-control form-control-sm border-0 bg-transparent" value={formData.borrowdate} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="p-2 bg-light rounded-3 shadow-sm">
                                                        <label className="x-small text-muted d-block fw-bold">Due Date</label>
                                                        <input type="date" name="dueDate" className="form-control form-control-sm border-0 bg-transparent" value={formData.dueDate} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-sm transition-all">
                                            Confirm
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100 border-start border-4 border-success">
                                <h5 className="fw-bold mb-4">Summary</h5>
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <span className="text-muted small">Member ID</span>
                                        <span className="fw-bold">#{formData.userid || '---'}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <span className="text-muted small">Book ID</span>
                                        <span className="fw-bold">#{formData.bookid || '---'}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <span className="text-muted small">Due Date</span>
                                        <span className="fw-bold">{formData.dueDate || '---'}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <span className="text-muted small">Status</span>
                                        <span className="badge bg-success-subtle text-success rounded-pill px-3">{formData.status}</span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-4 text-center">
                                    <p className="x-small text-muted mb-0 opacity-75">
                                        "Happy Reading! We're glad you're part of the LibManager community. Enjoy your book!"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rent;