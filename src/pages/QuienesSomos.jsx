import React from 'react';

function QuienesSomos() {
  return (
    <div className="page-container">
      <h2>Quiénes Somos</h2>
      <p>
        Somos una cadena de supermercados enfocada en brindar productos de calidad y una experiencia eficiente en sala y plataformas digitales.
      </p>
      <div className="info-cards">
        <div className="card">
          <h3>Misión</h3>
          <p>Garantizar el abastecimiento continuo de alimentos y artículos esenciales con estándares de calidad superiores.</p>
        </div>
        <div className="card">
          <h3>Visión</h3>
          <p>Ser la red de supermercados líder en innovación tecnológica, logística de inventario y atención a nuestros clientes.</p>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;