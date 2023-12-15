import React from 'react';

export default function Spinner({ size = 'lg', my = 5, text = 'primary' }) {
  return (
    <>
      <div
        className={`d-flex justify-content-center align-items-center px-3 my-${my}`}
      >
        <div
          className={`spinner-border spinner-border-${size} text-${text}`}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
