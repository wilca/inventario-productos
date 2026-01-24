import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6C63FF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#FF6584',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
        text: {
            primary: '#2d3748',
            secondary: '#718096',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#2d3748',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default theme;
