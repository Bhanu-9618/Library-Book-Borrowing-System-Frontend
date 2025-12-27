import { Link } from 'react-router-dom';
import heroImage from '../assets/img1.jpg';

const Dashboard = () => {
  return (
    <div className="overflow-hidden bg-light" style={{ minHeight: '100vh' }}>
      <div className="position-relative bg-dark text-white" style={{ minHeight: '450px' }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1
          }}
        ></div>

        <img
          src={heroImage}
          alt="Library"
          className="w-100 h-100 position-absolute start-0 top-0"
          style={{ objectFit: 'cover', zIndex: 0 }}
        />

        <div className="container position-relative h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '120px' }}>
          <div className="text-center px-3">
            <h1 className="display-6 display-md-3 fw-bold mb-3"
              style={{
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                letterSpacing: '-1px'
              }}>
              Welcome to <span className="text-warning">LibManager</span>
            </h1>

            <p className="mb-4 mx-auto opacity-90"
              style={{
                maxWidth: '700px',
                fontWeight: '500',
                fontSize: "22px",
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontStyle: "italic",
                lineHeight: "1.6"
              }}>
              "Elevate your library experience. Manage collections, track members, and handle borrowings with a seamless interface."
            </p>

            <div className="d-flex justify-content-center">
              <Link to="/books"
                className="btn btn-warning btn-lg px-4 px-md-5 fw-bold shadow rounded-pill"
                style={{ fontFamily: "inherit", letterSpacing: "0.5px" }}>
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 3 }}>
        <div className="row g-4 justify-content-center">

          <div className="col-12 col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 text-center bg-white">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                  <span className="fs-2">📚</span>
                </div>
                <h3 className="fw-bold h5 mb-2">Manage Books</h3>
                <p className="text-muted small mb-4">Add new arrivals or curate your digital shelves.</p>
                <Link to="/books" className="btn btn-dark mt-auto w-100 rounded-pill py-2">Open Inventory</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 text-center bg-white">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3">
                  <span className="fs-2">👥</span>
                </div>
                <h3 className="fw-bold h5 mb-2">Manage Users</h3>
                <p className="text-muted small mb-4">Register new members and track profiles.</p>
                <Link to="/users" className="btn btn-dark mt-auto w-100 rounded-pill py-2">View Members</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 text-center bg-white">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle mb-3">
                  <span className="fs-2">🔄</span>
                </div>
                <h3 className="fw-bold h5 mb-2">Rent & Return</h3>
                <p className="text-muted small mb-4">Monitor due dates and manage returns effortlessly.</p>
                <Link to="/rent" className="btn btn-dark mt-auto w-100 rounded-pill py-2">Rent Books</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 text-center bg-white">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="bg-info bg-opacity-10 p-3 rounded-circle mb-3">
                  <span className="fs-2">📊</span>
                </div>
                <h3 className="fw-bold h5 mb-2">Rent History</h3>
                <p className="text-muted small mb-4">View all book rental history.</p>
                <Link to="/history" className="btn btn-dark mt-auto w-100 rounded-pill py-2">View History</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="py-5"></div>
    </div>
  );
};

export default Dashboard;