import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import ProductTable from '../components/ProductTable';
import FilterBar from '../components/FilterBar';
import ProductForm from '../components/ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct, filterProductsByTitle } from '../services/productService';
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';

/**
 * Componente Vista Inventory
 * Gestiona la visualización y manipulación del inventario de productos.
 * Maneja la obtención, filtrado, creación, actualización y eliminación de productos.
 *
 * @component
 */
const Inventory = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
        total: 0
    });

    const [openModal, setOpenModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const loadAllProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts(0, 200);
            setAllProducts(data);
            setFilteredProducts(data);
            setPagination(prev => ({
                ...prev,
                total: data.length,
                offset: 0
            }));
            setDisplayedProducts(data.slice(0, 10));
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Error al cargar productos',
                showConfirmButton: false,
                timer: 3000,
                background: '#fdezea'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    useEffect(() => {
        const { offset, limit } = pagination;
        const slice = filteredProducts.slice(offset, offset + limit);
        setDisplayedProducts(slice);
    }, [pagination.offset, pagination.limit, filteredProducts]);

    /**
     * Maneja acciones de filtro desde FilterBar
     * Aplica filtros a `allProducts` y actualiza `filteredProducts`.
     * @param {Object} filters 
     */
    const handleFilter = async (filters) => {
        setLoading(true);
        let results = [...allProducts];

        if (filters.title) {
            try {
                const apiResults = await filterProductsByTitle(filters.title);
                results = apiResults;
            } catch (e) {
                console.error(e);
            }
        } else {
            if (filters.title) {
                const lowerTitle = filters.title.toLowerCase();
                results = results.filter(p => p.title.toLowerCase().includes(lowerTitle));
            }
        }

        if (filters.dateStart && filters.dateEnd) {
            const start = startOfDay(parseISO(filters.dateStart));
            const end = endOfDay(parseISO(filters.dateEnd));

            results = results.filter(p => {
                const dateStr = p.creationAt || p.createdAt;
                if (!dateStr) return false;
                const pDate = parseISO(dateStr);
                return isWithinInterval(pDate, { start, end });
            });
        }

        setFilteredProducts(results);
        setPagination(prev => ({ ...prev, total: results.length, offset: 0 }));
        setLoading(false);
    };

    const handleCreate = async (formData) => {
        try {
            await createProduct(formData);
            setOpenModal(false);
            loadAllProducts();
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: 'Producto creado',
                showConfirmButton: false,
                timer: 3000,
                background: '#e6fffa'
            });
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Error al crear producto',
                showConfirmButton: false,
                timer: 3000,
                background: '#fff5f5'
            });
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateProduct(currentProduct.id, formData);
            setOpenModal(false);
            loadAllProducts();
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: 'Producto actualizado',
                showConfirmButton: false,
                timer: 3000,
                background: '#e6fffa'
            });
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Error al actualizar producto',
                showConfirmButton: false,
                timer: 3000,
                background: '#fff5f5'
            });
        }
    };

    const handleDelete = async (row) => {
        Swal.fire({
            title: `¿Deseas eliminar este producto?`,
            text: `${row.title}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6c63ff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(row.id);
                    loadAllProducts();
                    Swal.fire({
                        toast: true,
                        position: 'bottom-end',
                        icon: 'success',
                        title: 'Producto eliminado',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#e6fffa'
                    });
                } catch (error) {
                    Swal.fire({
                        toast: true,
                        position: 'bottom-end',
                        icon: 'error',
                        title: 'Error al eliminar el producto',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#fff5f5'
                    });
                }
            }
        });
    };

    const openCreateModal = () => {
        setCurrentProduct(null);
        setOpenModal(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setOpenModal(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                    Productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={openCreateModal}
                    sx={{ px: 3, py: 1, borderRadius: 2 }}
                >
                    Crear Producto
                </Button>
            </Box>

            <FilterBar onFilter={handleFilter} Loading={loading} />

            {displayedProducts.length === 0 && !loading && (
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                    No hay productos disponibles.
                </Typography>
            )}
            <ProductTable
                products={displayedProducts}
                loading={loading}
                pagination={pagination}
                onPageChange={setPagination}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <ProductForm
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={currentProduct ? handleUpdate : handleCreate}
                initialData={currentProduct}
            />
        </Box>
    );
};

export default Inventory;
