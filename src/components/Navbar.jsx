import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white";

  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Usamos flex-row para que el logo SIEMPRE esté a la izquierda y los enlaces a la derecha */}
        <div className="flex flex-row justify-between items-center gap-2">
          
          {/* Logo Clickeable (Fijo a la izquierda) */}
          <div className="flex items-center">
            <Link to="/listar" className="flex items-center gap-2 group cursor-pointer">
              {/* Usamos un tamaño de texto adaptable para que no se rompa en celulares */}
              <h1 className="text-sm sm:text-lg font-bold text-white group-hover:text-blue-200 transition">
                Super Admin
              </h1>
            </Link>
          </div>

          {/* Enlaces de navegación (Alineados a la derecha) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/listar" className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${isActive('/listar')}`}>
              Listar
            </Link>
            <Link to="/ingresar" className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${isActive('/ingresar')}`}>
              Agregar
            </Link>
            <Link to="/carrito" className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${isActive('/carrito')}`}>
              Carrito
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;