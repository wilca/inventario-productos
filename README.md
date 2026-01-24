# Inventario de Productos (SPA)

## Descripción
Esta es una Aplicación (SPA) desarrollada con React y Vite para la gestión de un inventario de productos. Permite visualizar, crear, editar y eliminar productos, así como filtrar título y rango de fechas. Cuenta con una interfaz moderna y responsiva construida con Material UI.

## Características
- **Listado de Productos**: Visualización de productos con paginación, mostrando nombre, precio, categoría y imagen.
- **Gestión de Productos (CRUD)**.
- **Búsqueda y Filtrado**.
- **Interfaz de Usuario (UI/UX)**.

## API
El proyecto consume la **Platzi Fake Store API**:
- **Documentación**: [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/)

## Estructura del Proyecto
La estructura de directorios del código es la siguiente:

```
src/
├── components/       # Componentes
├── services/         # Lógica de comunicación 
├── views/            # Vistas principales
├── App.jsx           # Componente raíz y rutas
├── main.jsx          # Punto de entrada 
└── index.css         # Estilos globales y resets
```

## Pasos para iniciar el proyecto

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

1.  **Requisitos Previos**:
    - Asegúrate de tener instalado **Node.js** (se recomienda la versión LTS actual).

2.  **Instalar Dependencias**:
    Abre una terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    El proyecto ya incluye un archivo `.env` con la URL de la API:
    ```
    VITE_API_FAKE_STORE_URL=https://api.escuelajs.co/api/v1
    ```

4.  **Ejecutar en Desarrollo**:
    Para iniciar el servidor de desarrollo local:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible usualmente en `http://localhost:5173`.

5.  **Construir para Producción** (Opcional):
    Para generar la versión optimizada para producción:
    ```bash
    npm run build
    ```
