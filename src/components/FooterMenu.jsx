import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function FooterMenu() {
  const location = useLocation();

  return (
    <footer className="footer-menu">
      <nav className="bottom-nav">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span>Inventario</span>
        </Link>
        <Link 
          to="/quienes-somos" 
          className={`nav-item ${location.pathname === '/quienes-somos' ? 'active' : ''}`}
        >
          <span>Quiénes somos</span>
        </Link>
        <Link 
          to="/nuestras-tiendas" 
          className={`nav-item ${location.pathname === '/nuestras-tiendas' ? 'active' : ''}`}
        >
          <span>Nuestras tiendas</span>
        </Link>
      </nav>
    </footer>
  );
}

export default FooterMenu;