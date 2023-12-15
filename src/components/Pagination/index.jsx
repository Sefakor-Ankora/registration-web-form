import React from 'react';
import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx';

export default function Pagination({
  current_page = 1,
  total_pages = 5,
  onClick = () => {},
}) {
  if (!Number(current_page) || !Number(total_pages)) {
    return '';
  }
  const pages = [];
  for (let i = 1; i <= total_pages; i++) {
    pages.push(i);
  }
  if (pages.length === 0) {
    return '';
  }
  return (
    <div
      className="btn-toolbar"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <div className="btn-group me-2" role="group" aria-label="First Page">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClick(1)}
          disabled={current_page === 1 ? true : false}
        >
          <RxTrackPrevious />
        </button>
      </div>
      <div className="btn-group me-2" role="group" aria-label="Second group">
        {pages.map((page) => {
          const active = page === current_page ? 'active' : '';
          return (
            <button
              type="button"
              className={`btn btn-outline-secondary ${active}`}
              key={page}
              onClick={() => (current_page === page ? () => {} : onClick(page))}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="btn-group me-2" role="group" aria-label="First Page">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClick(total_pages)}
          disabled={current_page === total_pages ? true : false}
        >
          <RxTrackNext />
        </button>
      </div>
    </div>
  );
}
