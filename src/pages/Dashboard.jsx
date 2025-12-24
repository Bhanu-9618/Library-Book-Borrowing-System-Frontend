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
            <h1 className="display-6 display-md-3 fw-bold mb-3">
              Welcome to <span className="text-warning">LibManager</span>
            </h1>
            <p className="fs-6 fs-md-4 mb-4 mx-auto opacity-90" style={{ maxWidth: '750px', lineHeight: '1.4' }}>
              Elevate your library experience. Manage collections, track members, and handle borrowings with a seamless interface.
            </p>
            <div className="d-flex justify-content-center">
              <Link to="/books" className="btn btn-warning btn-lg px-4 px-md-5 fw-bold shadow rounded-pill">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;