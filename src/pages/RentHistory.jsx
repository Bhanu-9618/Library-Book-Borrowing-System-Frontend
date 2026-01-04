import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRenthistory, updateBorrowStatus, searchBorrows } from '../service/api';
import Navbar from '../components/Navbar';

const RentHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getRenthistory();
      setHistory(res.data.reverse());
    } catch (err) {
      toast.error("Failed to load borrowing history");
    }
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      fetchHistory();
      return;
    }
    try {
      const res = await searchBorrows(value);
      setHistory(res.data.reverse());
    } catch (err) {
      setHistory([]);
    }
  };

  const handleStatusUpdate = async (item) => {
    const newStatus = "Returned";

    const updatedData = {
      ...item,
      status: newStatus,
      returnDate: new Date().toISOString().split('T')[0]
    };

    try {
      await updateBorrowStatus(updatedData);
      toast.success(`Transaction #${item.borrowid} updated to ${newStatus}`);
      fetchHistory();
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const filteredHistory = history.filter(item => {
    return filterStatus === "All" || item.status === filterStatus;
  });

  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
        <div className="mb-5">
          <h2 className="fw-bold text-dark">📊 Rent History</h2>
          <p className="text-muted">Detailed history of all book rentals.</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-primary text-white">
              <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Total Rentals</small>
              <h3 className="fw-bold mb-0">{history.length}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-warning text-dark">
              <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Active Borrows</small>
              <h3 className="fw-bold mb-0">{history.filter(i => i.status === 'Borrowed').length}</h3>
            </div>
          </div>
        </div>

        <div className="row mb-4 g-3 align-items-center">
          <div className="col-md-6">
            <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden p-1 border">
              <span className="input-group-text bg-transparent border-0 px-3 text-muted">🔍</span>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search by Member ID.."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 ms-auto text-end">
            <select
              className="form-select rounded-pill border shadow-sm px-4"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
            <table className="table table-hover align-middle mb-0 text-nowrap">
              <thead className="bg-light text-uppercase small fw-bold text-muted" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <tr>
                  <th className="px-4 py-3 border-0">Rent ID</th>
                  <th className="py-3 border-0">Member ID</th>
                  <th className="py-3 border-0">Book ID</th>
                  <th className="py-3 border-0 text-center">Due Date</th>
                  <th className="py-3 border-0 text-center">Return Date</th>
                  <th className="py-3 border-0 text-center">Status</th>
                  <th className="px-4 py-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <tr key={item.borrowid} className="transition-all">
                      <td className="px-4 py-4">
                        <span className="fw-bold text-primary">#R-{item.borrowid}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-2">👤</div>
                          <span className="fw-semibold text-dark">{item.userid}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-2">📖</div>
                          <span className="fw-semibold text-dark">{item.bookid}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="text-danger small fw-bold">{item.dueDate}</span>
                      </td>

                      <td className="text-center">
                        {item.returnDate ? (
                          <span className="text-success small fw-bold">{item.returnDate}</span>
                        ) : (
                          <span className="text-muted small fst-italic">Pending...</span>
                        )}
                      </td>

                      <td className="text-center">
                        <span className={`badge rounded-pill px-3 py-2 ${item.status === 'Borrowed'
                            ? 'bg-warning-subtle text-warning border border-warning'
                            : 'bg-success-subtle text-success border border-success'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        {item.status === 'Borrowed' && (
                          <button
                            className="btn btn-sm rounded-pill px-3 fw-bold shadow-sm bg-success text-light"
                            onClick={() => handleStatusUpdate(item)}
                          >
                            ✓ Mark Returned
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No transaction logs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentHistory;