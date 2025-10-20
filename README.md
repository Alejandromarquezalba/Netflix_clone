# 🎬 NFLEX - Clon de Netflix (Frontend)

Un clon de Netflix full-stack con autenticación personalizada, búsqueda en tiempo real y sistema de favoritos. Desarrollado con Next.js.

[![Demo en Vivo](https://img.shields.io/badge/🚀_Demo_Frontend-Click_Here-0D67B6?style=for-the-badge)](https://netflix-clone-topaz-iota.vercel.app/)
[![Repositorio Backend](https://img.shields.io/badge/🔧_Repositorio_Backend-Click_Here-093B59?style=for-the-badge)](https://github.com/tu-usuario/nflex-backend)
[![API en Vivo](https://img.shields.io/badge/💻_API_Backend-En_Línea-34A853?style=for-the-badge)](https://netflixcloneback-production.up.railway.app)

## ✨ Características Principales

- **🔐 Autenticación Segura:** Registro y login de usuarios con JWT.
- **🎬 Búsqueda en Tiempo Real:** Integración con una API externa (TMDB).
- **❤️ Sistema de Favoritos:** Los usuarios pueden guardar sus películas favoritas.
- **📱 Diseño Responsive:** Funciona perfectamente en desktop y móvil.
- **🚀 Modo Demo:** Acceso rápido con un solo clic para reclutadores.

## 🖼️ Demonstración Visual

| Acceso y Autenticación | Gestión de Perfiles | Experiencia Principal |
| :---: | :---: | :---: |
| **Home Público vs. Home Privado** - El catálogo se desbloquea tras el login. | **Vista de Perfiles vs. Edición** - Creación y administración de perfiles personalizados. | **Exploración Completa** - Búsqueda, filtros y gestión de favoritos. |
| ![Home Public vs Private](https://github.com/Alejandromarquezalba/Netflix_clone/blob/main/logeo_antes_despues.png?raw=true) | ![Profiles Management](https://github.com/Alejandromarquezalba/Netflix_clone/blob/main/perfil_antes_despues.png?raw=true) | ![Movies Section](https://github.com/Alejandromarquezalba/Netflix_clone/blob/main/peliculas_seccion.png?raw=true) |
| **Flujo de Autenticación** - Login y registro de usuarios. | | |
| ![Login vs Register](https://github.com/Alejandromarquezalba/Netflix_clone/blob/main/login_y_registro.png?raw=true) | | |

## 🛠️ Tech Stack

**Frontend:** Next.js, React, Tailwind CSS
**Backend:** Node.js, Express, **Prisma** (te recomiendo añadirlo), JWT, Bcrypt

## 🚀 Cómo Probar el Proyecto

### Opción 1: Demo Rápida (Recomendada para Reclutadores)
1. Visita la **[demo en vivo]** (https://netflix-clone-topaz-iota.vercel.app/).
2. **¡Usa el modo invitado!** Haz clic en **"Acceder como Invitado"** o utiliza estas credenciales:
   - **Email:** NewDemo@gmail.com
   - **Contraseña:** New147852369

## 💻 Ejecución Local (Para Developers)

### Prerrequisitos
- Node.js 18+
- Cuenta en [Railway](https://railway.app) para base de datos

### 1. Clonar Repositorio
```bash
git clone https://github.com/Alejandromarquezalba/Netflix_clone.git
cd Netflix_clone

2. Configurar Backend (Puerto 3001)
bash

cd netflix_clone_back
npm install

# Configurar variables (consulta .env.example)
cp .env.example .env
# Editar .env con tus credenciales

npm run start:dev

3. Configurar Frontend (Puerto 3000)
bash

cd ../netf_app_ex  
npm install

# Configurar variables (consulta .env.local.example)
cp .env.local.example .env.local
# Editar .env.local

npm run dev
