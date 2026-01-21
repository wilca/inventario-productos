import React from 'react';

const InventoryListIcon = ({
    size = 48, // Tamaño por defecto
    primaryColor = "#61DAFB", // Color de los checks (azul React)
    secondaryColor = "currentColor", // Color del portapapeles (hereda del texto padre)
    className = "", // Para añadir clases de Tailwind o CSS adicional
    ...props // Pasa cualquier otra prop al SVG
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {/* Portapapeles (color secundario) */}
        <g stroke={secondaryColor}>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </g>

        {/* Lista con checks (color primario/acento) */}
        <g stroke={primaryColor}>
            <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
            <path d="M9 17l2 2 4-4" strokeWidth="2.5" opacity="0.6" />
            <line x1="15" y1="12" x2="19" y2="12" opacity="0.5" />
            <line x1="15" y1="17" x2="19" y2="17" opacity="0.3" />
            {/* Check superior añadido para balancear */}
            <path d="M9 7l2 2 4-4" strokeWidth="2.5" />
            <line x1="15" y1="7" x2="19" y2="7" opacity="0.5" />
        </g>
    </svg>
);

export default InventoryListIcon;
