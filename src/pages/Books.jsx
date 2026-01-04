import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, saveBook, deleteBook, updateBook, getBookById } from '../service/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Books = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const initialForm = { title: '', author: '', publisher: '', isbn: '', category: '', availableCopies: 0, availability: 'Available' };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => { loadBooks(); }, []);

    const loadBooks = async () => {
        try {
            const result = await getAllBooks();
            setBooks(result.data);
        } catch (error) {
            toast.error("Failed to load books");
        }
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value.trim() === "") {
            loadBooks();
            return;
        }

        try {
            const result = await getBookById(value);
            if (result.data) {
                setBooks([result.data]);
            } else {
                setBooks([]);
            }
        } catch (error) {
            setBooks([]);
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
        try {
            isEditing ? await updateBook(formData) : await saveBook(formData);
            toast.success(`Book ${isEditing ? 'Updated' : 'Added'}!`);
            loadBooks();
            resetForm();
        } catch (error) {
            toast.error("Operation Failed");
        }
    };

    const handleEdit = (book) => {
        setFormData(book);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this book?")) {
            try {
                await deleteBook(id);
                toast.success("Book Removed");
                loadBooks();
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
                        <h2 className="fw-bold mb-1">📚 Book Collection</h2>
                        <p className="text-muted">Manage your inventory.</p>
                    </div>
                    <button className={`btn ${showForm ? 'btn-outline-danger' : 'btn-primary'} rounded-pill px-4`}
                        onClick={() => showForm ? resetForm() : setShowForm(true)}>
                        {showForm ? 'Close' : '+ Add Book'}
                    </button>
                </div>

                {showForm && (
                    <div className="card border-0 shadow-lg rounded-4 p-4 mb-5">
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-6">
                                <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="author" className="form-control" placeholder="Author" value={formData.author} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="category" className="form-control" placeholder="Category" value={formData.category} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <input type="number" name="availableCopies" className="form-control" placeholder="Copies" value={formData.availableCopies} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <select name="availability" className="form-select text-muted" value={formData.availability} onChange={handleChange}>
                                    <option value="Available">Available</option>
                                    <option value="Out of Stock">Unavailable</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} w-100 rounded-pill py-2 fw-bold`}>
                                    {isEditing ? 'Update Book' : 'Save Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="input-group bg-white rounded-pill shadow-sm p-1 border mb-4" style={{ maxWidth: '500px' }}>
                    <span className="input-group-text bg-transparent border-0 px-3">🔍</span>
                    <input
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Search by ID..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className='table-responsive' style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <tr>
                                    <th className="px-4">ID</th>
                                    <th>Details</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="px-4 text-muted">#{book.id}</td>
                                        <td>
                                            <div className="fw-bold">{book.title}</div>
                                            <div className="small text-muted">{book.author}</div>
                                        </td>
                                        <td><span className="badge bg-light text-dark border">{book.category || 'General'}</span></td>
                                        <td>
                                            <span className={`badge rounded-pill ${book.availability === 'Available' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                {book.availability}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-success rounded-pill me-2 px-3" onClick={() => navigate('/rent')}>Rent</button>
                                            <button className="btn btn-sm btn-outline-info rounded-circle me-2" onClick={() => handleEdit(book)}>✏️</button>
                                            <button className="btn btn-sm btn-outline-danger rounded-circle" onClick={() => handleDelete(book.id)}>🗑️</button>
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

export default Books;