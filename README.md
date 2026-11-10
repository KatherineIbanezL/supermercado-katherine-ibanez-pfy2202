# Supermercado Admin - Sistema de Gestión de Inventario

Aplicación web Single Page Application (SPA) desarrollada con **React**, **Tailwind CSS** y **React Router DOM** para la administración de inventario de productos de supermercado, control de stock y flujo de compras interactivo.

---

## Características Principales

* **Gestión de Inventario (CRUD):**
  * Listado completo de artículos con estado de stock.
  * Incorporación de nuevos productos con validación de formularios.
  * Eliminación dinámica de artículos.
* **Filtros por Categorías:** Clasificación y filtrado de productos por tipo (*Lácteos, Abarrotes, Panadería, Frutas y Verduras, Bebidas, Limpieza*).
* **Gestión de Stock en Tiempo Real:** Sincronización automática de existencias al agregar unidades al carrito de compras.
* **Navegación Dinámica:** Enrutamiento entre páginas sin recarga mediante `react-router-dom`.
* **Diseño 100% Responsivo:** Interfaz adaptada a dispositivos móviles y pantallas de escritorio construida con **Tailwind CSS**.
* **Modales Personalizados:** Feedback visual al usuario (confirmaciones y alertas) mediante componentes de React sin uso de `alert()` nativos.
* **Arquitectura Modular:** Separación de datos (`/data`), contexto global (`/context`), componentes (`/components`) y vistas (`/pages`).

---

## Tecnologías Utilizadas

* **React** (v18+) - Librería principal para la interfaz de usuario.
* **React Router DOM** (v6+) - Enrutamiento y navegación SPA.
* **Context API** - Manejo del estado global (inventario y carrito).
* **Tailwind CSS** - Framework de estilos utility-first para diseño responsivo.
* **JavaScript (ES6+)** - Lógica del cliente y manipulación de datos.

---

## Estructura del Proyecto

```text
supermercado-inventario/
├── public/
│   └── images/               # Imágenes estáticas de los productos (.webp, .png)
├── src/
│   ├── components/           # Componentes reutilizables (Navbar, FooterMenu)
│   ├── context/              # Contexto global (InventoryContext)
│   ├── data/                 # Datos iniciales estructurados (articulos.js)
│   ├── pages/                # Vistas principales (ListarArticulos, IngresarArticulo, DetalleArticulo, Carrito)
│   ├── App.jsx               # Configuración de rutas y layout principal
│   ├── index.css             # Directivas principales de Tailwind CSS
│   └── index.js           # Punto de entrada de React
├── package.json              # Dependencias y scripts del proyecto
└── README.md                 # Documentación del proyecto
```

---

## Instalación y Ejecución Local

Para ejecutar este proyecto localmente en tu máquina, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/supermercado-inventario.git
cd supermercado-inventario
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador (por defecto en `http://localhost:5173` o el puerto configurado por Vite/React).



