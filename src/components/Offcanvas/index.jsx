import React from 'react';
import { Offcanvas as bsOffcanvas } from 'bootstrap';

export function toggleOffcanvas(id) {
  const canvas = new bsOffcanvas(document.getElementById(id));
  canvas.toggle();
}

export function hideOffcanvas(id) {
  const canvas = new bsOffcanvas(document.getElementById(id));
  canvas.hide();
}

export function Offcanvas({
  id,
  children,
  title = 'Offcanvas',
  width = 50,
  zIndex = 1,
}) {
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex="-1"
      id={id}
      aria-labelledby={id}
      style={{ width: `${width}dvw`, zIndex: zIndex + 1040 }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">{title}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body p-4">{children}</div>
    </div>
  );
}
