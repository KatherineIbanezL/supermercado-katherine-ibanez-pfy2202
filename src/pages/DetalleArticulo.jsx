import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

function DetalleArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articulos, agregarAlCarrito } = useContext(InventoryContext);

  const [cantidadInput, setCantidadInput] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [tipoModal, setTipoModal] = useState('exito');

  // Busca el artículo actual por id
  const articulo = articulos.find(a => a.id === parseInt(id));

  // Función auxiliar para las imágenes
  const obtenerRutaImagen = (rutaImagen) => {
    if (!rutaImagen) return 'https://via.placeholder.com/150?text=Producto';
    if (rutaImagen.startsWith('http')) return rutaImagen;
    
    const rutaLimpia = rutaImagen.startsWith('/') ? rutaImagen.slice(1) : rutaImagen;
    return `${import.meta.env.BASE_URL}${rutaLimpia}`;
  };

  if (!articulo) {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-md text-center mt-10">
        <h2 className="text-xl font-bold text-red-600 mb-4">Producto no encontrado</h2>
        <Link to="/listar" className="text-blue-600 underline">
          Volver a la lista de artículos
        </Link>
      </div>
    );
  }

  const handleAgregar = () => {
    const cantidad = parseInt(cantidadInput);

    if (isNaN(cantidad) || cantidad <= 0) {
      setMensajeModal('Por favor ingresa una cantidad válida.');
      setTipoModal('error');
      setMostrarModal(true);
      return;
    }

    if (cantidad > articulo.stock) {
      setMensajeModal(`No puedes agregar más unidades que el stock disponible (${articulo.stock}).`);
      setTipoModal('error');
      setMostrarModal(true);
      return;
    }

    // Agregar al carrito si pasa las validaciones
    agregarAlCarrito(articulo.id, cantidad);
    setMensajeModal('Añadido al carrito con éxito');
    setTipoModal('exito');
    setMostrarModal(true);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-md mt-6 relative">
      {/* Botón Volver */}
      <Link 
        to="/listar" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition duration-150"
      >
        ← Volver
      </Link>

      {/* Imagen del Producto */}
      <div className="flex justify-center mb-6">
        <img 
          src={obtenerRutaImagen(articulo.imagen)} 
          alt={articulo.nombre} 
          className="w-48 h-48 object-contain rounded-lg border border-gray-100 p-2 shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=Producto';
          }}
        />
      </div>

      {/* Información principal */}
      <h2 className="text-2xl font-extrabold text-blue-900 mb-1">{articulo.nombre}</h2>
      <p className="text-gray-600 mb-6 font-medium">Marca: <span className="text-gray-800">{articulo.marca}</span></p>

      {/* Detalle de categoría y stock */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6 space-y-2">
        <p className="text-gray-700">
          Categoría: <span className="font-semibold text-blue-700">{articulo.tipo}</span>
        </p>
        <p className="text-gray-700">
          Stock disponible: <span className="font-bold text-green-600">{articulo.stock}</span>
        </p>
      </div>

      {/* Controles para agregar al carrito */}
      <div className="flex items-center gap-4">
        <input 
          type="number" 
          min="1" 
          max={articulo.stock}
          value={cantidadInput}
          onChange={(e) => setCantidadInput(e.target.value)}
          className="w-20 border border-gray-300 rounded-md px-3 py-2 text-center font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAgregar}
          className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition duration-200 shadow-sm"
        >
          Agregar al Carrito
        </button>
      </div>

      {/* Modal Dinámico (Error vs Éxito) */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl text-center">
            
            {/* Ícono dinámico */}
            {tipoModal === 'error' ? (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <span className="text-red-600 text-2xl font-bold">!</span>
              </div>
            ) : (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Título dinámico */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tipoModal === 'error' ? 'Atención' : '¡Éxito!'}
            </h3>
            
            {/* Mensaje dinámico */}
            <p className="text-sm text-gray-500 mb-6">{mensajeModal}</p>
            
            {/* Botón dinámico */}
            <button
              onClick={() => {
                setMostrarModal(false);
                if (tipoModal === 'exito') {
                  navigate('/carrito');
                }
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none transition duration-150 ${
                tipoModal === 'error' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalleArticulo;