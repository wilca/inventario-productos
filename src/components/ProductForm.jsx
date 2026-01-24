import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, MenuItem, Box
} from '@mui/material';
import Swal from 'sweetalert2';
import { getCategories } from '../services/productService';

/**
 * ProductForm Component
 * Dialogo para crear o actualizar un producto.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Controla la visibilidad del dialogo
 * @param {Function} props.onClose - Callback para cerrar el dialogo
 * @param {Function} props.onSubmit - Callback cuando el formulario es válido y se envía
 * @param {Object} [props.initialData] - Datos para prellenar el formulario al editar
 */
const ProductForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: 0,
        images: ['']
    });

    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});
    const imageDefault = 'https://i.imgur.com/1sk8cj2.png';
    const [categories, setCategories] = useState([]);

    const isEditMode = !!initialData;

    const loadAllCategories = async () => {
        try {
            const data = await getCategories();
            data.unshift({ id: 0, name: 'Seleccione una categoría', slug: 'Seleccione una categoría', image: 'Seleccione una categoría', creationAt: '2026-01-01' });
            setCategories(data);
        } catch (error) {
            console.log('error', error);
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Error al cargar categorías',
                showConfirmButton: false,
                timer: 3000,
                background: '#fdezea'
            });
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                description: initialData.description || '',
                categoryId: initialData.category?.id || 0,
                images: initialData.images || []
            });
            if (initialData.images && initialData.images.length > 0) {
                setImageUrl(initialData.images[0]);
            } else {
                setImageUrl('');
            }
        } else {
            loadAllCategories();
            setFormData({
                title: '',
                price: '',
                description: '',
                categoryId: 0,
                images: ['']
            });
            setImageUrl('');
        }
    }, [initialData, open]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.title) tempErrors.title = 'El título es requerido';
        if (!formData.price || formData.price <= 0) tempErrors.price = 'El precio debe ser mayor a 0';
        if (!formData.description) tempErrors.description = 'La descripción es requerida';
        if (formData.categoryId === 0) tempErrors.categoryId = 'La categoría es requerida';
        if (formData.images.length === 0 || !formData.images[0]) {
            setImageUrl(imageDefault);
            setFormData(prev => ({
                ...prev,
                images: [imageDefault]
            }));
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Imagen por defecto',
                showConfirmButton: false,
                timer: 2000,
                background: '#fff5f5'
            });
        };

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setFormData(prev => ({
            ...prev,
            images: [url]
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditMode ? 'Editar Producto' : 'Crear Producto'}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} columns={2}>
                    <Grid size={1}>
                        <TextField
                            label="Título"
                            name="title"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>
                    <Grid size={1}>
                        <TextField
                            label="Precio"
                            name="price"
                            type="number"
                            fullWidth
                            value={formData.price}
                            onChange={handleChange}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            select
                            label="Categoría"
                            id="categoryId"
                            name="categoryId"
                            fullWidth
                            value={formData.categoryId}
                            onChange={handleChange}
                            disabled={isEditMode}
                            error={!!errors.categoryId}
                            helperText={errors.categoryId}
                        >
                            {categories.length > 0 && categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            label="Descripción"
                            name="description"
                            multiline
                            rows={3}
                            fullWidth
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            disabled={isEditMode}
                        />
                    </Grid>

                    <Grid size={2}>
                        <TextField
                            label="URL de Imagen"
                            name="images"
                            fullWidth
                            value={imageUrl}
                            onChange={handleImageChange}
                            error={!!errors.images}
                            helperText={errors.images}
                            disabled={isEditMode}
                        />
                    </Grid>

                    {imageUrl && (
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                src={imageUrl}
                                alt="Preview"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: 200,
                                    borderRadius: 2,
                                    border: '1px solid #ddd',
                                    p: 1
                                }}
                                onError={(e) => {
                                    e.target.src = imageDefault;
                                }}
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
