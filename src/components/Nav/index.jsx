import { MdOutlineDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { getUser, logout } from '../../api';

export function Nav({ title = 'Dashboard', children }) {
  return (
    <>
      <nav>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-primary">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">{title}</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">{children}</ul>
          <button
            className="btn btn-secondary"
            onClick={() => {
              logout();
              window.location = '/';
            }}
          >
            Logout
          </button>
          <hr />
          <Link to="/profile" className="text-decoration-none text-white">
            <div className="d-flex align-items-center">
              <img
                src="https://github.com/mdo.png"
                alt=""
                style={{ width: '32px' }}
                className="rounded-circle me-2"
              />
              <strong className="one-line">{getUser().name}</strong>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export function NavItem({
  path = '/',
  children,
  icon = <MdOutlineDashboard />,
}) {
  const { pathname } = useLocation();
  const isActive = pathname === path ? 'active' : '';
  return (
    <>
      <li className="nav-item">
        <Link to={path} className={`nav-link ${isActive}`} aria-current="page">
          <span style={{ fontSize: '20px' }} className="me-2">
            {icon}
          </span>
          {children}
        </Link>
      </li>
    </>
  );
}
