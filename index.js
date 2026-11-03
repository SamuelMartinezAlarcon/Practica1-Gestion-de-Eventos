import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventosRoutes from './routes/eventos.js';
import recintosRoutes from './routes/recintos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/eventos/eventos', eventosRoutes);
app.use('/recintos/eventos', recintosRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
