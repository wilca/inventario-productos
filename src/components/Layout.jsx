import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

/**
 * Componente Layout
 * Componente envoltorio para proporcionar una estructura de diseño consistente (Navbar + Contenido + Footer).
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos para renderizar
 */
const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />
            <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
                {children}
            </Container>
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'white', textAlign: 'center' }}>
                Inventario Productos @ {new Date().getFullYear()}
            </Box>
        </Box>
    );
};

export default Layout;
