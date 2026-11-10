import React from 'react';

function NuestrasTiendas() {
  const tiendas = [
    { id: 1, ciudad: 'Santiago', direccion: 'Av. Providencia 1234', horario: '08:30 - 21:00' },
    { id: 2, ciudad: 'Concepción', direccion: 'Calle O\'Higgins 567', horario: '08:30 - 21:30' },
    { id: 3, ciudad: 'Valparaíso', direccion: 'Av. Argentina 890', horario: '09:00 - 20:30' }
  ];

  return (
    <div className="page-container">
      <h2>Nuestras Tiendas</h2>
      <p>Encuentra tu sucursal más cercana y sus horarios de atención.</p>
      
      <div className="stores-grid">
        {tiendas.map((tienda) => (
          <div className="store-card" key={tienda.id}>
            <h3>Sucursal {tienda.ciudad}</h3>
            <p><strong>Dirección:</strong> {tienda.direccion}</p>
            <p><strong>Horario:</strong> {tienda.horario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NuestrasTiendas;