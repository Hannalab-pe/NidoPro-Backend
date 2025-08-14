# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Agregado
- Proyecto base de NestJS con estructura inicial
- Configuración de TypeScript y ESLint
- Estructura modular preparada para escalabilidad
- Sistema de testing con Jest configurado
- Configuración básica de NestJS CLI

### Características Base
- **Framework**: NestJS 10.x con TypeScript
- **Testing**: Jest con configuración e2e
- **Linting**: ESLint con configuración estándar
- **Estructura**: Arquitectura modular lista para desarrollo

### Archivos Base
- `src/app.controller.ts`: Controlador principal
- `src/app.service.ts`: Servicio principal
- `src/app.module.ts`: Módulo raíz de la aplicación
- `src/main.ts`: Punto de entrada de la aplicación
- `test/`: Configuración y tests end-to-end

## [Unreleased]

### Planeado
- Sistema de autenticación JWT
- Módulos CRUD para todas las entidades
- Base de datos con TypeORM
- Sistema de roles y permisos
- WebSockets para notificaciones en tiempo real
- Documentación API con Swagger
- Validación de datos con class-validator
- Sistema de archivos y uploads
- Cache con Redis
- Rate limiting
- Logging avanzado
- Monitoreo y métricas
- Dockerización
- CI/CD con GitHub Actions

### Módulos por Implementar
- **Auth**: Autenticación y autorización
- **Users**: Gestión de usuarios
- **Students**: Gestión de estudiantes
- **Teachers**: Gestión de docentes
- **Classes**: Gestión de clases
- **Evaluations**: Sistema de evaluaciones
- **Parents**: Gestión de padres de familia
- **Specialists**: Gestión de especialistas
- **Reports**: Sistema de reportes
- **Notifications**: Sistema de notificaciones
