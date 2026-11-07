# Gestión de eventos

API REST para gestionar recintos, eventos y entradas. Está desarrollada con Node.js, Express y MongoDB.

## Requisitos

- Node.js
- MongoDB

## Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/eventos
```

Inicia el servidor con:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Rutas principales

### Recintos

- `GET /recintos`
- `GET /recintos/:id`
- `GET /recintos/localidad/:nombre`
- `POST /recintos`
- `DELETE /recintos/:id`

### Eventos

- `GET /eventos`
- `GET /eventos/:id`
- `GET /eventos/localidad/:nombre`
- `POST /eventos`
- `PUT /eventos/:id`
- `DELETE /eventos/:id`
- `GET /eventos/entradas/:idEvento/:tipoEntrada`
- `PUT /eventos/entradas/:idEvento/:tipoEntrada/:cantidad`

No subas `.env` ni `node_modules` al repositorio.
