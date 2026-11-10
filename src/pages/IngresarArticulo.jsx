import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

function IngresarArticulo() {
  const { agregarArticulo } = useContext(InventoryContext);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [tipoModal, setTipoModal] = useState(''); // 'error' o 'exito'
  
  // 1. Agregamos 'imagen' al estado inicial del formulario
  const [formulario, setFormulario] = useState({
    nombre: '',
    marca: '',
    tipo: '',
    stock: '',
    imagen: ''
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos obligatorios
    if (
      formulario.nombre.trim() === '' || 
      formulario.marca.trim() === '' || 
      formulario.tipo.trim() === '' || 
      formulario.stock === ''
    ) {
      setMensajeModal("Por favor completa todos los campos.");
      setTipoModal("error");
      setMostrarModal(true);
      return;
    }

    // Validación de número
    const stockNumerico = parseInt(formulario.stock);
    if (isNaN(stockNumerico) || stockNumerico < 0) {
      setMensajeModal("Por favor ingresa una cantidad de stock válida (0 o mayor).");
      setTipoModal("error");
      setMostrarModal(true);
      return;
    }
    
    // 2. Si el usuario no ingresa ruta de imagen, asignamos una por defecto
    const rutaImagenFinal = formulario.imagen.trim() !== '' 
      ? formulario.imagen 
      : '/images/supermercado.png';

    // Guardar artículo con la imagen procesada
    agregarArticulo({
      ...formulario,
      stock: stockNumerico,
      imagen: rutaImagenFinal
    });
    
    // 3. Reiniciamos el formulario
    setFormulario({ nombre: '', marca: '', tipo: '', stock: '', imagen: '' }); 
    
    // Mensaje de éxito
    setMensajeModal('Artículo ingresado correctamente');
    setTipoModal("exito");
    setMostrarModal(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Agregar Nuevo Artículo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre del producto:</label>
          <input 
            type="text" 
            name="nombre" 
            value={formulario.nombre} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Arroz Grado 1"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Marca:</label>
          <input 
            type="text" 
            name="marca" 
            value={formulario.marca} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Tucapel"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Tipo de producto:</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              "Lácteos",
              "Abarrotes",
              "Panadería",
              "Frutas y Verduras",
              "Bebidas",
              "Limpieza"
            ].map((cat) => (
              <label
                key={cat}
                className={`flex items-center justify-center px-3 py-2 border rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                  formulario.tipo === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value={cat}
                  checked={formulario.tipo === cat}
                  onChange={handleChange}
                  className="sr-only"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Stock Inicial:</label>
          <input 
            type="number" 
            name="stock" 
            min="0"
            value={formulario.stock} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. 100"
          />
        </div>

        {/* 4. Nuevo campo para la ruta de la imagen */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Imagen (opcional):</label>
          <input 
            type="text" 
            name="imagen" 
            value={formulario.imagen} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. /images/leche-soprole.webp"
          />
          <span className="text-xs text-gray-400">*Si se deja vacío, se asignará una imagen predeterminada.</span>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 mt-4"
        >
          Guardar Artículo
        </button>
      </form>

      {/* Modal Personalizado */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all text-center">
            
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

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tipoModal === 'error' ? 'Faltan datos' : '¡Éxito!'}
            </h3>
            
            <p className="text-sm text-gray-500 mb-6">{mensajeModal}</p>
            
            <button
              onClick={() => setMostrarModal(false)}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ${
                tipoModal === 'error' 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
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

export default IngresarArticulo;