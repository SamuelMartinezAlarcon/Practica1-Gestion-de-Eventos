import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventosRoutes from './routes/eventos.js';
import recintosRoutes from './routes/recintos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI?.trim();

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
    });
