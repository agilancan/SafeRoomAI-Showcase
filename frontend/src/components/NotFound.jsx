// src/components/NotFound.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <FaExclamationTriangle className="notfound-icon" />
      <h1>404</h1>
      <p className="lead">Sorry, this page does not exist</p>
      <Link to='/' className="btn-back">
        Go Back
      </Link>
    </div>
  );
}