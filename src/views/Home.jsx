import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, bgcolor: 'transparent' }}>
                <Typography variant="h1" component="h1" gutterBottom sx={{ background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Bienvenido al Inventario de productos
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Gestiona tus productos de manera fácil y rápida.
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Button variant="contained" size="large" component={RouterLink} to="/inventory">
                        Ir a Inventario
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Home;
