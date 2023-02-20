const Presupuesto = require('../models/Presupuesto');
const { validationResult } = require('express-validator');

exports.obtenerPresupuestos = async (req, res) => {
    try {
        const presupuestos = await Presupuesto.find({ creador: req.usuario.id }).sort({ year: 0 });
        res.json({ presupuestos });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al obtener los presupuestos.');
    }
}

exports.crearPresupuesto = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        const presupuesto = new Presupuesto(req.body);
        presupuesto.creador = req.usuario.id;
        presupuesto.cantidadRestante = presupuesto.cantidadInicial;
        presupuesto.save();
        res.json({presupuesto, msg:'Presupuesto creado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al crear el presupuesto.');
    }
}

exports.actualizarPresupuesto = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        let presupuesto = await Presupuesto.findById(req.params.id);
        if(!presupuesto) {
            return res.status(404).json({msg: 'Presupuesto no encontrado.'})
        }
        if(presupuesto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }

        const nuevoPresupuesto = {};
        nuevoPresupuesto.cantidadRestante = req.body.cantidadRestante;
        presupuesto = await Presupuesto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoPresupuesto}, { new: true });
        res.json({presupuesto, msg: 'Presupuesto actualizado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar actualizar el presupuesto.');
    }
}

exports.eliminarPresupuesto = async (req, res ) => {
    try {
        let presupuesto = await Presupuesto.findById(req.params.id);
        if(!presupuesto) {
            return res.status(404).json({msg: 'Presupuesto no encontrado.'})
        }
        if(presupuesto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        await Presupuesto.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Presupuesto eliminado.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al eliminar el presupuesto.')
    }
}
