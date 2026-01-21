import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Componente Navbar
 * Barra de navegación para la aplicación.
 *
 * @component
 */
const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >
                            INVENTARIO DE PRODUCTOS
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                startIcon={<HomeIcon />}
                                variant={isActive('/') ? 'contained' : 'text'}
                                color="primary"
                            >
                                Inicio
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/inventory"
                                startIcon={<InventoryIcon />}
                                variant={isActive('/inventory') ? 'contained' : 'text'}
                                color="primary"
                            >
                                Inventario
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;
