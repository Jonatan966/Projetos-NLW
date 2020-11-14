import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './styles.css';

const LinkedSoftButton: React.FC<LinkProps<unknown> & React.RefAttributes<HTMLAnchorElement>> = ({children, className, ...resto}) => {
  return (
    <Link {...resto} className={`soft-button ${className}`}>
      {children}
    </Link>
  );
};

export default LinkedSoftButton;
