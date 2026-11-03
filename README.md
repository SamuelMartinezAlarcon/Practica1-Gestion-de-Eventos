# Práctica 1: API REST de Gestión de Eventos y Entradas

> **Asignatura:** Despliegue de Aplicaciones Web (DAW) — 2º DAW  
> **Curso Académico:** 2026/2027  
> **Proyecto:** Práctica del 1.ᵉʳ Trimestre  

Fichero / Proyecto principal desarrollado en **Node.js**, **Express** y **Mongoose (MongoDB)** para gestionar recintos, eventos y venta de entradas. Incluye la integración con **MongoDB Atlas** y despliegue continuo en la plataforma Cloud **Render**.

---

## 📌 Enlace al Despliegue en Producción

* **URL del Servidor en Render:** `https://<TU-SUBDOMINIO-AQUI>.onrender.com`
* **Prueba de Salud / Endpoint base:** `https://<TU-SUBDOMINIO-AQUI>.onrender.com/eventos`

---

## 🚀 Características y Tecnologías

* **Entorno de Ejecución:** Node.js
* **Framework Web:** Express.js
* **Base de Datos:** MongoDB mediante Mongoose ORM
* **Manejo de Asincronía:** `async/await` estructurado con bloques `try/catch`
* **Estructura de Módulos:** CommonJS (`require` / `module.exports`)
* **Base de Datos Cloud:** MongoDB Atlas
* **Despliegue Cloud:** Render

---

## 📁 Estructura del Proyecto

```text
.
├── models/             # Esquemas y modelos de Mongoose
│   ├── evento.js       # Esquema de Evento y subdocumento de Entradas
│   └── recinto.js      # Esquema de Recintos
├── routes/             # Enrutadores para las peticiones HTTP
│   ├── eventos.js      # Enrutador para /eventos y /eventos/entradas
│   └── recintos.js     # Enrutador para /recintos
├── index.js            # Servidor Express principal y conexión a la BD
├── .env                # Variables de entorno (puerto, URL MongoDB, etc.)
├── .gitignore          # Exclusión de node_modules y .env
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del proyecto
```

---

## 🗄️ Modelos de Datos

### 1. Recinto (`models/recinto.js`)
* `nombre` (String, Obligatorio, min 5 chars)
* `direccion` (String, Obligatorio, min 10 chars)
* `localidad` (String, Obligatorio, min 3 chars)
* `aforoMaximo` (Number, Opcional)

### 2. Evento y Entradas (`models/evento.js`)
* **Evento:**
  * `nombre` (String, Obligatorio, min 5 chars)
  * `fecha` (Date, Obligatorio)
  * `recinto` (ObjectId, Referencia a `Recinto`, Obligatorio)
  * `entradas` (Array de Subdocumentos `Entrada`)
* **Subdocumento Entrada:**
  * `tipo` (String, Obligatorio, min 3 chars, ej: "VIP", "General")
  * `precio` (Number, Obligatorio, $\ge 0$)
  * `disponibles` (Number entero, Obligatorio, $\ge 0$)

---

## 🔌 API Endpoints y Protocolo de Respuesta

Todas las respuestas devuelven un objeto JSON estructurado con la clave `ok: true` (éxito) o `ok: false` (error 4xx/5xx).

### 🏛️ Recintos (`/recintos`)

| Método | Endpoint | Descripción | Código Éxito | Código Error |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/recintos` | Obtiene todos los recintos | `200 OK` | `500` |
| **GET** | `/recintos/:id` | Obtiene un recinto por ID | `200 OK` | `404` |
| **GET** | `/recintos/localidad/:nombre` | Filtra recintos por localidad | `200 OK` | `404` |
| **POST** | `/recintos` | Crea un nuevo recinto | `201 Created` | `500` |
| **DELETE** | `/recintos/:id` | Elimina un recinto por ID | `200 OK` | `404` |

### 🎟️ Eventos y Entradas (`/eventos`)

| Método | Endpoint | Descripción | Código Éxito | Código Error |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/eventos` | Lista eventos (con `populate` de recintos y entradas) | `200 OK` | `500` |
| **GET** | `/eventos/:id` | Obtiene un evento por ID | `200 OK` | `404` |
| **GET** | `/eventos/localidad/:nombre` | Eventos en localidad con fecha futura | `200 OK` | `404` |
| **POST** | `/eventos` | Crea un evento | `201 Created` | `500` |
| **PUT** | `/eventos/:id` | Actualiza los datos de un evento | `200 OK` | `404` |
| **DELETE** | `/eventos/:id` | Elimina un evento | `200 OK` | `404` |
| **GET** | `/eventos/entradas/:idEvento/:tipoEntrada` | Consulta precio y disponibilidad | `200 OK` | `404` |
| **PUT** | `/eventos/entradas/:idEvento/:tipoEntrada/:cantidad` | Resta una cantidad a las entradas disponibles | `200 OK` | `404` |

---

## 💻 Configuración Local e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nombre-del-proyecto
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (`.env`):**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/eventosDB?retryWrites=true&w=majority
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   # o node index.js
   ```

---

## ☁️ Despliegue en Render

1. Subir el código a GitHub (sin incluir la carpeta `node_modules` ni el archivo `.env`).
2. Crear un nuevo servicio **Web Service** en [Render](https://render.com/).
3. Conectar el repositorio de GitHub.
4. En **Environment Variables**, añadir `MONGODB_URI` apuntando a la base de datos MongoDB Atlas.
5. Definir el comando de inicio: `node index.js`.