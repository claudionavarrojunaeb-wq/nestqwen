# Proyecto Full Stack: React + Vite + NestJS

Este proyecto separa frontend y backend:
- Frontend: React con Vite.
- Backend: API REST con NestJS.

## 1. Requisitos
- Node.js 20+
- npm 10+
- Git

## 2. Estructura recomendada

```text
mi-app/
├─ frontend/           # React + Vite
├─ backend/            # NestJS
└─ readme.md
```

## 3. Creacion del proyecto

### 3.1 Crear carpeta raiz

```bash
mkdir mi-app
cd mi-app
```

### 3.2 Crear frontend con Vite

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
cd ..
```

### 3.3 Crear backend con NestJS CLI

```bash
npm install -g @nestjs/cli
nest new backend
```

Cuando pregunte por package manager, selecciona npm.

## 4. Configuracion del backend (NestJS)

### 4.1 Habilitar CORS
Edita `backend/src/main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
```

### 4.2 Crear endpoint de prueba

`backend/src/app.controller.ts`:

```ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/health')
  getHealth() {
    return { status: 'ok', service: 'nestjs-api' };
  }
}
```

## 5. Configuracion del frontend (React + Vite)

### 5.1 Consumir API desde React

Reemplaza `frontend/src/App.tsx`:

```tsx
import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  service: string;
};

function App() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(async (res) => {
        if (!res.ok) throw new Error('Error consultando API');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>React + Vite + NestJS</h1>
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando...</p>}
    </main>
  );
}

export default App;
```

## 6. Ejecucion del proyecto

Abre 2 terminales:

### Terminal 1: backend

```bash
cd backend
npm run start:dev
```

API disponible en:
- `http://localhost:3000/api/health`

### Terminal 2: frontend

```bash
cd frontend
npm run dev
```

Aplicacion disponible en:
- `http://localhost:5173`

## 7. Scripts utiles

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
cd backend
npm run start:dev
npm run build
npm run start:prod
npm run test
```

## 8. Buenas practicas de implementacion
- Mantener separadas las responsabilidades: UI en frontend y logica de negocio en backend.
- Versionar variables de entorno con archivos `.env.example`.
- Usar DTOs y validaciones en NestJS (`class-validator`, `class-transformer`).
- Crear una capa de servicios en frontend para centralizar llamadas HTTP.
- Agregar manejo de errores consistente en ambos lados.

## 9. Siguiente paso recomendado
- Implementar un modulo de autenticacion (JWT) en NestJS y conectar login en React.
