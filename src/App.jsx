import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';

import Navbar from './components/Navbar';
import IngresarArticulo from './pages/IngresarArticulo';
import ListarArticulos from './pages/ListarArticulos';
import DetalleArticulo from './pages/DetalleArticulo';
import Carrito from './pages/Carrito';

function App() {
  return (
    <InventoryProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow p-2 sm:p-4 max-w-4xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/listar" replace />} />
              <Route path="/ingresar" element={<IngresarArticulo />} />
              <Route path="/listar" element={<ListarArticulos />} />
              <Route path="/articulo/:id" element={<DetalleArticulo />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>
          <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600 mt-auto">
            © 2026 Gestión de Inventario - Supermercado
          </footer>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;