import mongoose from 'mongoose';
import Recinto from './recinto.js';

const entradaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        minlength: 3
   },
   precio: {
        type: Number,
        required: true,
        min: 0
   },
   disponibles: {
        type: Number,
        required: true,
        min: 0
   },
});

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5
    },
    fecha: {
        type: Date,
        required: true
    },
    entradas: [entradaSchema],
    recinto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recinto',
        required: true
    }
});

const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;