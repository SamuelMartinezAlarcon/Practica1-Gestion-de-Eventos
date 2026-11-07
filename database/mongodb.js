import 'dotenv/config';
import { MongoClient } from 'mongodb';

let client;

export async function connectToMongoDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('La variable de entorno MONGODB_URI no está configurada');
    }

    try {
        if (!client) {
            client = new MongoClient(uri);
        }

        await client.connect();
        console.log('Conexión a MongoDB establecida correctamente');
        return client;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

// Se debe llamar únicamente cuando la aplicación termina.
export async function disconnectFromMongoDB() {
    if (client) {
        await client.close();
        client = undefined;
    }
}
