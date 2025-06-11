# VotoCiudadano.ar

Plataforma colaborativa para visualizar tendencias de voto en elecciones de Argentina.

## 🚀 Características principales

- Registro anónimo de votos por mesa electoral
- Visualización en tiempo real de tendencias
- Validación comunitaria de datos
- Mapas de calor y gráficos interactivos
- Gestión colaborativa de mesas electorales

## 🛠️ Tecnologías utilizadas

- **Frontend**: React + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Gráficos**: Recharts
- **Mapas**: Leaflet
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB Atlas
- **Autenticación**: JWT (solo para moderadores)

## 🚀 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm run install:all
   ```
3. Configurar variables de entorno (ver `.env.example` en cada carpeta)
4. Iniciar servidores de desarrollo:
   ```bash
   npm start
   ```

## 📂 Estructura del proyecto

```
├── frontend/          # Aplicación React
├── backend/           # API de Node.js
├── package.json       # Configuración del workspace
└── README.md         # Este archivo
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📄 Aviso legal

Esta plataforma no representa resultados oficiales. Los datos son colaborativos y anónimos.
