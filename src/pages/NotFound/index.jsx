import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function NotFound() {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: '100dvh', width: '100dvw' }}
    >
      <div className="body">
        <div className="center-div text-center">
          <h1 className="not-found-heading">404</h1>
          <h2 className="not-found-subheading">Oops! Page Not Found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
