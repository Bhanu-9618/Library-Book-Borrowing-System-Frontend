import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm px-3"
      style={{ background: 'rgba(33, 37, 41, 0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <span className="text-warning">Lib</span>Manager
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <NavLink className="nav-link px-3" style={{ fontWeight: "bold" }} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" style={{ fontWeight: "bold" }} to="/books">Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" style={{ fontWeight: "bold" }} to="/users">Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" style={{ fontWeight: "bold" }} to="/history">History</NavLink>
            </li>
            <li className="nav-item ms-lg-3">
              <NavLink
                className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm"
                to="/rent"
              >
                Rent Book
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;