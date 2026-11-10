import React, { createContext, useState } from 'react';
import { productosIniciales } from '../data/articulos';

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [articulos, setArticulos] = useState(productosIniciales);

  // 2. Estado del carrito
  const [carrito, setCarrito] = useState([]);

  // Agregar nuevo artículo desde el formulario
  const agregarArticulo = (nuevoArticulo) => {
    setArticulos([...articulos, { id: Date.now(), ...nuevoArticulo, stock: Number(nuevoArticulo.stock) }]);
  };

  // Función para eliminar un artículo del inventario
  const eliminarArticulo = (id) => {
      setArticulos(prev => prev.filter(art => art.id !== id));
        
      // Borra del carrito al eliminarlo del inventario
      setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Agregar un artículo existente al carrito y descontar stock
  const agregarAlCarrito = (id, cantidad) => {
    const articulo = articulos.find(a => a.id === id);
    if (!articulo || articulo.stock < cantidad) return;

    // Descontar del inventario
    setArticulos(prev => prev.map(art => art.id === id ? { ...art, stock: art.stock - cantidad } : art));

    // Agregar o sumar al carrito
    setCarrito(prev => {
      const existe = prev.find(item => item.id === id);
      if (existe) {
        return prev.map(item => item.id === id ? { ...item, cantidad: item.cantidad + cantidad } : item);
      }
      return [...prev, { ...articulo, cantidad }];
    });
  };

  // Modificar cantidades desde la vista del carrito (aumentar/disminuir)
  const modificarCantidadCarrito = (id, delta) => {
    const articuloEnInv = articulos.find(a => a.id === id);
    const itemEnCarrito = carrito.find(c => c.id === id);

    // Validar que no se intente sacar más del stock disponible
    if (delta > 0 && articuloEnInv.stock < delta) return;

    // Si se resta 1 y solo quedaba 1, se elimina del carrito
    if (delta < 0 && itemEnCarrito.cantidad === 1) {
      setCarrito(prev => prev.filter(c => c.id !== id));
    } else {
      setCarrito(prev => prev.map(c => c.id === id ? { ...c, cantidad: c.cantidad + delta } : c));
    }
    
    // Devolver o restar el stock en el inventario general
    setArticulos(prev => prev.map(a => a.id === id ? { ...a, stock: a.stock - delta } : a));

  };

    return (
        <InventoryContext.Provider value={{ 
        articulos, 
        carrito, 
        agregarArticulo, 
        agregarAlCarrito, 
        modificarCantidadCarrito,
        eliminarArticulo
        }}>
        {children}
        </InventoryContext.Provider>
    );
}