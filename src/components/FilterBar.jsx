import { useState } from 'react';
import { Paper, InputBase, IconButton, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * Componente FilterBar
 * Renderiza la entrada de búsqueda y selectores de rango de fechas para filtrar productos.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onFilter - Función callback disparada en acción de búsqueda/filtro
 * @param {boolean} props.Loading - Estado de carga para deshabilitar botones
 */
const FilterBar = ({ onFilter, Loading }) => {
    const [title, setTitle] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    /**
     * Maneja el envío de la búsqueda
     */
    const handleSearch = () => {
        onFilter({ title, dateStart, dateEnd });
    };

    /**
     * Limpia todas las entradas de filtro y reinicia la lista
     */
    const handleClear = () => {
        setTitle('');
        setDateStart('');
        setDateEnd('');
        onFilter({ title: '', dateStart: '', dateEnd: '' });
    };

    return (
        <Paper
            component="form"
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}
            elevation={0}
            variant="outlined"
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 300,
                    border: '1px solid #e2e8f0',
                    borderRadius: 2
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar por título..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            <TextField
                label="Fecha Inicio"
                type="date"
                size="small"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Fecha Fin"
                type="date"
                size="small"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={handleSearch} disabled={Loading}>
                    Filtrar
                </Button>
                <Button variant="outlined" startIcon={<ClearIcon />} onClick={handleClear} disabled={Loading}>
                    Limpiar
                </Button>
            </Box>
        </Paper>
    );
};

export default FilterBar;
