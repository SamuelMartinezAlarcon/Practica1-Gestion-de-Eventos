import express from 'express';
import Recinto from '../models/recinto.js';

const router = express.Router();

router.get('/recintos', async (req, res) => {
    const resultado = await Recinto.find();
        
    try {
        if (resultado) {
            res.status(200).send({ ok: true, recintos: resultado });
        } else {
            res.status(500).send({ ok: false, error: 'No se encontraron recintos' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, error: 'No se encontraron recintos' });
    }
});

router.get('/recintos/:id', async (req, res) => {
    const resultado = await Recinto.findById(req.params.id);

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: `Recinto ${req.params.id} no encontrado` });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: `Recinto ${req.params.id} no encontrado` });
    }
});

router.get('/recintos/localidad/:nombre', async (req, res) => {
    const resultado = await Recinto.find({ localidad: req.params.nombre });

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: 'No se han encontrado recintos de la localidad indicada' });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: 'No se han encontrado recintos de la localidad indicada' });
    }
});

router.post('/recintos', async (req, res) => {
    const nuevoRecinto = new Recinto({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        aforoMaximo: req.body.aforoMaximo
    });

    const resultado = await nuevoRecinto.save();

    try {
        if (resultado) {
            res.status(201).send({ ok: true, resultado: resultado });
        } else {
            res.status(500).send({ ok: false, error: 'Error añadiendo recinto' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, error: 'Error añadiendo recinto' });
    }
});

router.delete('/recintos/:id', async (req, res) => {
    const resultado = await Recinto.findByIdAndDelete(req.params.id);

    try {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(404).send({ ok: false, error: `Error eliminando recinto ${req.params.id}` });
        }
    } catch (error) {
        res.status(404).send({ ok: false, error: `Error eliminando recinto ${req.params.id}` });
    }
});

export default router;
