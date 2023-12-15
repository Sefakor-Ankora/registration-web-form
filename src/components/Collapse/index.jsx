import React from 'react';
import { Collapse as bsCollapse } from 'bootstrap';

export function Collapse({
  id,
  children = ['Add children to the component.'],
  color = 'light',
  border,
}) {
  return (
    <div className="collapse" id={id}>
      <div className={`card card-body border-${border} text-bg-${color}`}>
        {children}
      </div>
    </div>
  );
}

export function toggleCollapse(id) {
  const collapse = new bsCollapse(document.getElementById(id));
  collapse.toggle();
}
