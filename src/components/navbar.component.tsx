import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './helpers/authProvider';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      {currentUser && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/seance"} className="nav-link">
                Seance
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
