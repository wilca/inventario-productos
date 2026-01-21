import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Tooltip, Avatar, Box, Typography,
    TablePagination, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Componente ProductTable
 * Muestra una lista de productos en una tabla con paginación y acciones.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.products - Lista de objetos de producto
 * @param {boolean} props.loading - Estado de carga
 * @param {Object} props.pagination - Estado de paginación { offset, limit, total }
 * @param {Function} props.onPageChange - Callback para cambios de paginación
 * @param {Function} props.onEdit - Callback para acción de editar
 * @param {Function} props.onDelete - Callback para acción de eliminar
 */
const ProductTable = ({
    products,
    loading,
    pagination,
    onPageChange,
    onEdit,
    onDelete
}) => {
    const { offset, limit, total } = pagination;

    /**
     * Maneja el cambio de página
     * @param {Object} event 
     * @param {number} newPage 
     */
    const handleChangePage = (event, newPage) => {
        onPageChange({ ...pagination, offset: newPage * limit });
    };

    /**
     * Maneja el cambio de filas por página
     * @param {Object} event 
     */
    const handleChangeRowsPerPage = (event) => {
        onPageChange({
            ...pagination,
            limit: parseInt(event.target.value, 10),
            offset: 0,
        });
    };

    return (
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 3, overflow: 'hidden' }} elevation={2}>
            {loading && (
                <Box sx={{ width: '100%', p: 2, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-label="product table">
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell width={80}>Imagen</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No se encontraron productos</TableCell>
                            </TableRow>
                        )}
                        {products.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle1" fontWeight="600">{row.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 300 }}>
                                        {row.description}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
                                        ${row.price}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {row.category ? (
                                        <Box sx={{
                                            display: 'inline-block',
                                            px: 1.5, py: 0.5,
                                            borderRadius: 2,
                                            bgcolor: 'secondary.light',
                                            color: 'secondary.contrastText',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {row.category.name}
                                        </Box>
                                    ) : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Avatar
                                        variant="rounded"
                                        src={row.images && row.images.length > 0 ? row.images[0] : ''}
                                        alt={row.title}
                                        sx={{ width: 56, height: 56, bgcolor: '#f0f0f0' }}
                                    >
                                        {row.title.charAt(0)}
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => onEdit(row)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton onClick={() => onDelete(row)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={limit}
                page={offset / limit}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Registros por página"
            />
        </Paper>
    );
};

export default ProductTable;
