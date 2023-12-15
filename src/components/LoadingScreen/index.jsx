import React from 'react';
import Spinner from '../Spinner';
import './styles.css';

export function LoadingOverlay() {
  return (
    <div className="loading-overlay gone">
      <Spinner my={0} size="sm" />
    </div>
  );
}

export function startLoading() {
  document
    .getElementsByClassName('loading-overlay')[0]
    .classList.remove('gone');
}

export function stopLoading() {
  document.getElementsByClassName('loading-overlay')[0].classList.add('gone');
}
