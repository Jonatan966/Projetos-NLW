import React from 'react';

import './styles.css';

const SimpleSoftButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...resto}) => {
  return (
    <button {...resto} className={`soft-button ${className}`}>
      {children}
    </button>
  );
};

export default SimpleSoftButton;
