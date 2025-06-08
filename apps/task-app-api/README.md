# Task App API

API REST simple para gestionar tareas. Permite crear, leer, actualizar y eliminar tareas (CRUD), desarrollada con Node.js, Express, TypeScript y MongoDB.

## Tecnologías utilizadas

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Zod (validación de esquemas)
- Vite Node (entorno de desarrollo)

## Instalación individual

1. Clona este repositorio:

```bash
git clone https://github.com/riversdev/task-app.git
cd task-app/task-app-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` con la estructura de `.env.example`

   _Asegúrate de tener una instancia de MongoDB corriendo localmente o utiliza un URI remoto._

## Scripts

`npm run dev` - Inicia el servidor en modo desarrollo

`npm run build` - Compila el proyecto

`npm run preview` - Ejecuta el servidor desde la carpeta dist que genera la compilación

## Endpoints

Todos los endpoints están bajo el prefijo `/api/tasks`

| Método | Endpoint         | Descripción              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/tasks`     | Obtener todas las tareas |
| GET    | `/api/tasks/:id` | Obtener una tarea        |
| POST   | `/api/tasks`     | Crear una nueva tarea    |
| PUT    | `/api/tasks/:id` | Actualizar una tarea     |
| DELETE | `/api/tasks/:id` | Eliminar una tarea       |

### Ejemplo de objeto de tarea

```json
{
  "id": "683cf4e05e9c0a0d57767312",
  "createdAt": "2025-06-03T00:00:00.000Z",
  "updatedAt": "2025-06-03T00:00:00.000Z",
  "deletedAt": null,
  "title": "Example task",
  "description": "Example task description",
  "priority": "medium",
  "dueDate": "2026-01-01T00:00:00.000Z",
  "assignedTo": "Chanchito feliz",
  "status": "todo"
}
```
