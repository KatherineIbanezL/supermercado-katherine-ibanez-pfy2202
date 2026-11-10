import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

function Carrito() {
  const { carrito, modificarCantidadCarrito } = useContext(InventoryContext);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-gray-500 text-center py-8">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.nombre}</h3>
                <p className="text-sm text-gray-500">{item.marca}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => modificarCantidadCarrito(item.id, -1)}
                  className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded font-bold text-xl"
                >
                  -
                </button>
                <span className="font-bold text-lg w-6 text-center">{item.cantidad}</span>
                <button 
                  onClick={() => modificarCantidadCarrito(item.id, 1)}
                  className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carrito;