import express from 'express';
import Event from '../models/evento.js';

const router = express.Router();

router.get('/eventos', async (req, res) => {
    const resultado = await Event.find().populate('recinto');

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(500).send({ ok: false, error: 'No se han encontrado eventos' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, error: 'No se han encontrado eventos' });
    }
});

router.get('/eventos/:id', async (req, res) => {
    const resultado = await Event.findById(req.params.id).populate('recinto');

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: `Evento ${req.params.id} no encontrado` });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: `Evento ${req.params.id} no encontrado` });
    }
});

router.get('/eventos/localidad/:nombre', async (req, res) => {
    const resultado = await Event.find().populate({ localidad: req.params.nombre });

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: 'No se han encontrado eventos' });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: 'No se han encontrado eventos' });
    }
});

router.post('/eventos', async (req, res) => {
    const nuevoEvento = new Event({
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        entradas: req.body.entradas,
        recinto: req.body.recinto
    });

    const resultado = await nuevoEvento.save();

    try {
        if (resultado) {
            res.status(201).send({ ok: true, resultado: resultado });
        } else {
            res.status(500).send({ ok: false, error: 'Error añadiendo evento' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, error: 'Error añadiendo evento' });
    }
});

router.put('/eventos/:id', async (req, res) => {
    const resultado = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: `Error actualizando evento ${req.params.id}` });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: `Error actualizando evento ${req.params.id}` });
    }
});

router.delete('/eventos/:id', async (req, res) => {
    const resultado = await Event.findByIdAndDelete(req.params.id);

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: `Error eliminando evento ${req.params.id}` });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: `Error eliminando evento ${req.params.id}` });
    }
});


router.get('/eventos/entradas/:idEvento/:tipoEntrada', async (req, res) => {
    const { idEvento, tipoEntrada } = req.params;

    try {    
        const evento = await Event.findById(idEvento);

        if (!evento) {
            return res.status(404).send({ ok: false, error: `Error obteniendo datos de entrada para evento ${idEvento}` });
        }

        const entrada = evento.entradas.find(
            e => e.tipo === tipoEntrada
        );
    
        if (!entrada) {
            return res.status(404).send({ ok: false, error: `Error obteniendo datos de entrada para evento ${idEvento} y tipo de entrada ${tipoEntrada}` });
        }
    
        res.status(200).send({ ok: true, entrada: {
            precio: entrada.precio,
            disponibles: entrada.disponibles
        } });
    } catch (error) {
    res.status(404).send({ ok: false, error: `Error obteniendo datos de entrada para evento ${idEvento}` });
    }
});

router.put('/eventos/entradas/:idEvento/:tipoEntrada/:cantidad', async (req, res) => {
    const { idEvento, tipoEntrada, cantidad } = req.params;

    try {
        const evento = await Event.findById(idEvento);
        
        const entrada = evento.entradas.find(
            e => e.tipo === tipoEntrada
        );

        if (!entrada ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) < 0 ||
            Number(cantidad) > entrada.disponibles) {
        return res.status(404).send({ ok: false, error: `Error actualizando entradas del evento ${idEvento}` });
    }

    entrada.disponibles -= Number(cantidad);
    await evento.save();

    res.status(200).send({ ok: true, resultado: evento });
    } catch (error) {
        res.status(404).send({ ok: false, error: `Error actualizando entradas del evento ${idEvento}` });
    }
});

export default router;
