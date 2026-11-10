import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

function DetalleArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articulos, agregarAlCarrito } = useContext(InventoryContext);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [tipoModal, setTipoModal] = useState('exito');
  
  const [cantidadInput, setCantidadInput] = useState(1);
  const articulo = articulos.find(a => a.id === parseInt(id));

  if (!articulo) {
    return <div className="text-center mt-10 text-xl font-bold">Artículo no encontrado.</div>;
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

    // Si pasa las validaciones, agrega con éxito
    agregarAlCarrito(articulo.id, cantidad);
    setMensajeModal('Añadido al carrito con éxito');
    setTipoModal('exito');
    setMostrarModal(true);
  };

  const cerrarModalYNavegar = () => {
    setMostrarModal(false);
    navigate('/carrito');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md mt-10">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 mb-4 text-sm font-semibold">
        ← Volver
      </button>

      {/* Vista previa de la Imagen del Producto */}
      <div className="mb-6 flex justify-center">
        <img 
          src={articulo.imagen || '/images/default.webp'} 
          alt={articulo.nombre} 
          className="w-40 h-40 object-cover rounded-lg shadow border border-gray-200"
        />
      </div>

      <h2 className="text-3xl font-bold text-blue-800 mb-2">{articulo.nombre}</h2>
      <p className="text-gray-600 mb-6">Marca: <span className="font-semibold">{articulo.marca}</span></p>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <p className="text-lg">Categoría: <span className="text-blue-700 font-semibold">{articulo.tipo}</span></p>
        <p className="text-lg mt-2">Stock disponible: <span className={`font-bold ${articulo.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{articulo.stock}</span></p>
      </div>

      {articulo.stock > 0 ? (
        <div className="flex items-center gap-4">
          <input 
            type="number" 
            min="1" 
            max={articulo.stock}
            value={cantidadInput}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > articulo.stock) {
                setCantidadInput(articulo.stock); // Clampa la cantidad al máximo permitido
              } else {
                setCantidadInput(e.target.value);
              }
            }}
            className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-semibold"
          />
          <button 
            onClick={handleAgregar}
            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Agregar al Carrito
          </button>
        </div>
      ) : (
        <div className="bg-red-100 text-red-700 p-3 rounded font-bold text-center">Agotado</div>
      )}

      {/* Modal Personalizado Dinámico */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all text-center">
            
            {/* Icono dinámico según tipoModal */}
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
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              {tipoModal === 'error' ? 'Atención' : '¡Éxito!'}
            </h3>
            
            {/* Mensaje dinámico */}
            <p className="text-sm text-gray-500 mb-6">{mensajeModal}</p>
            
            {/* Botón dinámico: si es error solo cierra el modal; si es éxito redirige al carrito */}
            <button
              onClick={() => {
                if (tipoModal === 'error') {
                  setMostrarModal(false);
                } else {
                  cerrarModalYNavegar();
                }
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none transition duration-150 ${
                tipoModal === 'error' 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
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