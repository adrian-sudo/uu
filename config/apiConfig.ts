const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ROUTES = {
  BASE_URL: API_BASE_URL,
  USUARIOS: {
    DEFAULT: "/api/usuarios",
    COMBO: "/api/usuarios/combo",
    // Puedes agregar más rutas aquí si es necesario
  },
  EMPRESA: {
    DEFAULT: "/api/empresas",
  },
  INVENTARIO: {
    DEFAULT: "/api/inventario"
  }
  // Puedes agregar más rutas aquí si es necesario
};

