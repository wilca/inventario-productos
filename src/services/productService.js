import axios from 'axios';

const API_URL = import.meta.env.VITE_API_FAKE_STORE_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Obtener productos con paginación
 * @param {number} offset - El desplazamiento para la paginación
 * @param {number} limit - El límite de items por página
 * @returns {Promise<Object>} - Lista de productos
 */
export const getProducts = async (offset = 0, limit = 10) => {
    try {
        const response = await apiClient.get('/products', {
            params: { offset, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

/**
 * Crear un nuevo producto
 * @param {Object} productData - Los datos del producto
 * @returns {Promise<Object>} - El producto creado
 */
export const createProduct = async (productData) => {
    try {
        const response = await apiClient.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

/**
 * Actualizar un producto existente
 * @param {number} id - ID del producto
 * @param {Object} productData - Datos para actualizar
 * @returns {Promise<Object>} - El producto actualizado
 */
export const updateProduct = async (id, productData) => {
    try {
        const response = await apiClient.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar producto ${id}:`, error);
        throw error;
    }
};

/**
 * Eliminar un producto
 * @param {number} id - ID del producto
 * @returns {Promise<boolean>} - Verdadero si fue exitoso
 */
export const deleteProduct = async (id) => {
    try {
        await apiClient.delete(`/products/${id}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar producto ${id}:`, error);
        throw error;
    }
};

/**
 * Filtrar productos (lado del cliente o API dependiendo del soporte)
 * Nota: La API soporta filtrado básico, pero rangos de fecha complejos pueden necesitar lógica del lado del cliente
 * o parámetros de API específicos si están documentados.
 * Por ahora, obtenemos un conjunto más grande o filtramos lo que tenemos si la API no soporta rangos convenientes.
 * La API soporta title, price, categoryId.
 * https://fakeapi.platzi.com/en/rest/products/#filter-products
 */
export const filterProductsByTitle = async (title) => {
    try {
        const response = await apiClient.get('/products', {
            params: { title }
        });
        return response.data;
    } catch (error) {
        console.error('Error al filtrar productos:', error);
        throw error;
    }
}

/**
 * Obtener categorías
 * @returns {Promise<Object>} - Lista de categorías
 */
export const getCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        return response.data;
    } catch (error) {
        console.error(`Error al obtener categorías:`, error);
        throw error;
    }
};