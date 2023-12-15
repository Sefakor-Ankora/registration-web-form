import React from 'react';
import './styles.css';

export function TwoColumnLayout({ children }) {
  if (!children) {
    return '';
  }
  if (!Array.isArray(children)) {
    return children;
  }
  return (
    <div className="row">
      <div className="col-lg-8 pe-lg-5 pe-md-0 col-md-12 mb-lg-0 mb-5">
        {children && children[0]}
      </div>
      <div className="side-bar col-lg-4 col-md-12 p-4 mt-lg-0 mt-3">
        {children && children.slice(1)}
      </div>
    </div>
  );
}
