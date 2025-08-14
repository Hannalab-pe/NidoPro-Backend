# NidoPro-Backend

## 🏗️ API REST para Sistema de Gestión Educativa - Backend

**NidoPro-Backend** es la API REST desarrollada con NestJS que proporciona todos los servicios backend para el sistema de gestión educativa NidoPro, incluyendo autenticación, gestión de usuarios, y operaciones CRUD para todas las entidades del sistema.

## ✨ Características Principales

### 🔧 **Arquitectura Robusta**
- Framework NestJS con TypeScript
- Arquitectura modular y escalable
- Decoradores y Guards para autenticación
- Inyección de dependencias automática

### 🔐 **Sistema de Autenticación**
- JWT (JSON Web Tokens) para autenticación
- Guards para protección de rutas
- Middleware de autorización por roles
- Refresh tokens para sesiones persistentes

### 📊 **Base de Datos**
- Soporte para PostgreSQL/MySQL/SQLite
- TypeORM para mapeo objeto-relacional
- Migraciones automáticas
- Seeding de datos inicial

### 🏗️ **Estructura Modular**
- Módulos separados por funcionalidad
- DTOs para validación de datos
- Pipes de transformación
- Interceptors para logging y transformación

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Base de datos (PostgreSQL recomendado)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Hannalab-pe/NidoPro-Backend.git

# Navegar al directorio
cd NidoPro-Backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones
npm run migration:run

# Iniciar en modo desarrollo
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000/`

## 📁 Estructura del Proyecto

```
src/
├── auth/                            # Módulo de autenticación
│   ├── dto/                         # DTOs de autenticación
│   ├── guards/                      # Guards JWT y roles
│   ├── strategies/                  # Estrategias Passport
│   └── auth.service.ts              # Servicio de autenticación
├── users/                           # Módulo de usuarios
│   ├── dto/                         # DTOs de usuarios
│   ├── entities/                    # Entidades de usuario
│   └── users.service.ts             # Servicio de usuarios
├── students/                        # Módulo de estudiantes
│   ├── dto/
│   ├── entities/
│   └── students.service.ts
├── teachers/                        # Módulo de docentes
│   ├── dto/
│   ├── entities/
│   └── teachers.service.ts
├── classes/                         # Módulo de clases
│   ├── dto/
│   ├── entities/
│   └── classes.service.ts
├── evaluations/                     # Módulo de evaluaciones
│   ├── dto/
│   ├── entities/
│   └── evaluations.service.ts
├── common/                          # Utilidades compartidas
│   ├── decorators/                  # Decoradores personalizados
│   ├── filters/                     # Filtros de excepción
│   ├── guards/                      # Guards globales
│   ├── interceptors/                # Interceptors
│   └── pipes/                       # Pipes de validación
├── config/                          # Configuraciones
│   ├── database.config.ts           # Configuración BD
│   └── jwt.config.ts                # Configuración JWT
├── database/                        # Configuración de BD
│   ├── migrations/                  # Migraciones
│   └── seeds/                       # Datos iniciales
└── main.ts                          # Punto de entrada
```

## 🛡️ Endpoints de la API

### Autenticación
```http
POST   /auth/login           # Iniciar sesión
POST   /auth/register        # Registrar usuario
POST   /auth/refresh         # Renovar token
POST   /auth/logout          # Cerrar sesión
```

### Usuarios
```http
GET    /users               # Listar usuarios
GET    /users/:id           # Obtener usuario
PUT    /users/:id           # Actualizar usuario
DELETE /users/:id           # Eliminar usuario
```

### Estudiantes
```http
GET    /students            # Listar estudiantes
POST   /students            # Crear estudiante
GET    /students/:id        # Obtener estudiante
PUT    /students/:id        # Actualizar estudiante
DELETE /students/:id        # Eliminar estudiante
```

### Docentes
```http
GET    /teachers            # Listar docentes
POST   /teachers            # Crear docente
GET    /teachers/:id        # Obtener docente
PUT    /teachers/:id        # Actualizar docente
DELETE /teachers/:id        # Eliminar docente
```

### Clases
```http
GET    /classes             # Listar clases
POST   /classes             # Crear clase
GET    /classes/:id         # Obtener clase
PUT    /classes/:id         # Actualizar clase
DELETE /classes/:id         # Eliminar clase
```

## 🔧 Configuración

### Variables de Entorno
```bash
# Base de datos
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=nidopro

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Aplicación
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### Base de Datos
```sql
-- Crear base de datos
CREATE DATABASE nidopro;

-- El sistema creará automáticamente las tablas mediante migraciones
```

## 👥 Roles y Permisos

### Administrador
- Gestión completa de usuarios
- Control total del sistema
- Acceso a todos los endpoints
- Configuración del sistema

### Docente
- Gestión de sus clases asignadas
- Crear y editar evaluaciones
- Visualizar estudiantes de sus clases
- Generar reportes académicos

### Padre de Familia
- Visualizar información de sus hijos
- Acceso a calificaciones y asistencia
- Comunicación con docentes
- Reportes de progreso

### Especialista
- Gestión de evaluaciones psicopedagógicas
- Acceso a casos asignados
- Generar reportes especializados
- Programar citas y seguimientos

## 🛠️ Tecnologías Utilizadas

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **Base de Datos**: TypeORM + PostgreSQL
- **Autenticación**: JWT + Passport
- **Validación**: class-validator + class-transformer
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev         # Servidor con hot-reload
npm run start:debug       # Servidor con debugging

# Construcción
npm run build             # Build para producción
npm run start:prod        # Iniciar producción

# Base de datos
npm run migration:create  # Crear migración
npm run migration:run     # Ejecutar migraciones
npm run migration:revert  # Revertir migración
npm run seed              # Ejecutar seeds

# Testing
npm run test              # Tests unitarios
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Coverage

# Calidad de código
npm run lint              # Ejecutar ESLint
npm run format            # Formatear código
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests con coverage
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Tests en modo watch
npm run test:watch
```

## 🔄 Roadmap Futuro

- [ ] Implementación de módulos CRUD completos
- [ ] WebSockets para notificaciones en tiempo real
- [ ] Sistema de archivos y uploads
- [ ] Cache con Redis
- [ ] Rate limiting
- [ ] Logging avanzado con Winston
- [ ] Monitoreo con Prometheus
- [ ] Dockerización completa
- [ ] CI/CD con GitHub Actions
- [ ] Documentación API con Swagger

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Hannalab-pe**
- GitHub: [@Hannalab-pe](https://github.com/Hannalab-pe)

## 🔗 Enlaces Relacionados

- **Frontend**: [NidoPro-Frontend](https://github.com/Hannalab-pe/NidoPro-Frontend)
- **Documentación API**: `http://localhost:3000/api` (Swagger)
- **Issues**: [GitHub Issues](https://github.com/Hannalab-pe/NidoPro-Backend/issues)

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:
1. Revisa la documentación de NestJS
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

⭐ **¡No olvides darle una estrella si te gusta el proyecto!** ⭐
