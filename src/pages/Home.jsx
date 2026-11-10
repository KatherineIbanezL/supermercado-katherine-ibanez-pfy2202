import React, { useState } from 'react';

function Home() {
  const [inventario] = useState([
    { id: 1, producto: 'Leche Entera 1L', categoria: 'Lácteos', stock: 150, precio: '$1.050' },
    { id: 2, producto: 'Pan Molde Integral', categoria: 'Panadería', stock: 12, precio: '$2.190' },
    { id: 3, producto: 'Manzana Fuji (kg)', categoria: 'Frutas y Verduras', stock: 80, precio: '$1.490' },
    { id: 4, producto: 'Arroz Grado 1 (1kg)', categoria: 'Abarrotes', stock: 200, precio: '$1.350' },
    { id: 5, producto: 'Aceite Maravilla 1L', categoria: 'Abarrotes', stock: 8, precio: '$2.890' }
  ]);

  return (
    <div className="page-container">
      <h2>Gestión de Inventario</h2>
      <p>Panel de control de stock de productos del supermercado.</p>
      
      <div className="table-responsive">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.producto}</td>
                <td>{item.categoria}</td>
                <td>{item.stock} unidades</td>
                <td>{item.precio}</td>
                <td>
                  <span className={`status-badge ${item.stock < 20 ? 'low-stock' : 'in-stock'}`}>
                    {item.stock < 20 ? 'Stock Bajo' : 'Disponible'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;