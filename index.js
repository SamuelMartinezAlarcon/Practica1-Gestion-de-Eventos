import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventosRoutes from './routes/eventos.js';
import recintosRoutes from './routes/recintos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI?.trim();

if (!mongoUri) {
    throw new Error('La variable de entorno MONGODB_URI no está configurada');
}

if (process.env.RENDER && /127\.0\.0\.1|localhost/i.test(mongoUri)) {
    throw new Error('En Render, MONGODB_URI debe apuntar a MongoDB Atlas, no a una instancia local');
}

app.use(express.json());
app.use('/', eventosRoutes);
app.use('/', recintosRoutes);

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
        process.exitCode = 1;
    });
