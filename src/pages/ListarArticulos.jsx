import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

function ListarArticulos() {
  const { articulos, eliminarArticulo } = useContext(InventoryContext);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  const categorias = [...new Set(articulos.map(a => a.tipo))];

  const articulosFiltrados = filtroCategoria 
    ? articulos.filter(a => a.tipo === filtroCategoria)
    : articulos;

  // Función auxiliar para construir la URL correcta de las imágenes
  const obtenerRutaImagen = (rutaImagen) => {
    if (!rutaImagen) return 'https://via.placeholder.com/150?text=Producto';
    if (rutaImagen.startsWith('http')) return rutaImagen;
    
    // Limpia la barra inicial si existe
    const rutaLimpia = rutaImagen.startsWith('/') ? rutaImagen.slice(1) : rutaImagen;
    return `${import.meta.env.BASE_URL}${rutaLimpia}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 border border-gray-200 rounded-lg shadow-md mt-4 sm:mt-6">
      {/* Encabezado de la Sección */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Inventario de Productos
        </h2>
      
        {/* Pestañas de categorías */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setFiltroCategoria('')}
            className={`py-2 px-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
              filtroCategoria === ''
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              className={`py-2 px-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                filtroCategoria === cat
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* VISTA 1: Tarjetas para Celulares */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {articulosFiltrados.map((articulo) => (
          <div key={articulo.id} className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center bg-gray-50 shadow-sm">
            <img 
              src={obtenerRutaImagen(articulo.imagen)}
              alt={articulo.nombre} 
              className="w-16 h-16 object-cover rounded-md border bg-white flex-shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Producto';
              }}
            />
            <div className="flex-grow">
              <h3 className="font-bold text-gray-900 text-sm">{articulo.nombre}</h3>
              <p className="text-xs text-gray-500 mb-1">Marca: {articulo.marca}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  {articulo.tipo}
                </span>
                <span className={`text-xs font-bold ${articulo.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                  Stock: {articulo.stock}
                </span>
              </div>
              <div className="flex gap-4 text-xs">
                <Link to={`/articulo/${articulo.id}`} className="text-blue-600 font-medium underline">
                  Ver Detalles
                </Link>
                <button 
                  onClick={() => eliminarArticulo(articulo.id)}
                  className="text-red-500 font-medium underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {articulosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 py-4 text-sm">No hay artículos disponibles.</p>
        )}
      </div>

      {/* VISTA 2: Tabla para Pantallas Grandes */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b">Imagen</th>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b">Nombre</th>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b">Marca</th>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b">Tipo</th>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b text-center">Stock</th>
              <th className="px-4 py-3 font-semibold text-gray-900 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articulosFiltrados.map((articulo) => (
              <tr key={articulo.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img 
                    src={obtenerRutaImagen(articulo.imagen)}
                    alt={articulo.nombre} 
                    className="w-12 h-12 object-cover rounded-md border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Producto';
                    }}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{articulo.nombre}</td>
                <td className="px-4 py-3">{articulo.marca}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {articulo.tipo}
                  </span>
                </td>
                <td className={`px-4 py-3 text-center font-bold ${articulo.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {articulo.stock}
                </td>
                <td className="px-4 py-3 text-center space-x-3">
                  <Link to={`/articulo/${articulo.id}`} className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Ver Detalles
                  </Link>
                  <button 
                    onClick={() => eliminarArticulo(articulo.id)}
                    className="text-red-500 hover:text-red-700 font-medium underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {articulosFiltrados.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">No hay artículos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ListarArticulos;