const Gasto = require('../models/Gasto');
const Presupuesto = require('../models/Presupuesto');
const { validationResult } = require('express-validator');

exports.crearGasto = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    try {
        const { presupuesto } = req.body;
        const existePresupuesto = await Presupuesto.findById(presupuesto);
        if(!existePresupuesto) {
            return res.status(404).json({msg: 'Presupuesto no encontrado.'})
        }
        if(existePresupuesto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const gasto = new Gasto(req.body);
        await gasto.save();
        res.json({ gasto, msg:'Gasto creado correctamente.' });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al crear el gasto.')
    }
}

exports.obtenerGastos = async (req, res) => {
    try {
        const { presupuesto } = req.query;
        const existePresupuesto = await Presupuesto.findById(presupuesto);
        if(!existePresupuesto) {
            return res.status(404).json({msg: 'Presupuesto no encontrado.'})
        }
        if(existePresupuesto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const gastos = await Gasto.find({ presupuesto }).sort({ creado: -1 });
        res.json({ gastos });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al obtener los gastos.');
    }
}

exports.actualizarGasto = async (req, res ) => {
    try {
        const { presupuesto, nombre, cantidad } = req.body;
        let gasto = await Gasto.findById(req.params.id);
        if(!gasto) {
            return res.status(404).json({msg: 'No existe el gasto.'});
        }
        const existePresupuesto = await Presupuesto.findById(presupuesto);
        if(existePresupuesto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const nuevoGasto = {};
        nuevoGasto.nombre = nombre;
        nuevoGasto.cantidad = cantidad;
        gasto = await Gasto.findOneAndUpdate({_id : req.params.id }, nuevoGasto, { new: true } );
        res.json({ gasto, msg:'Gasto actualizado correctamente.' });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al actualizar el gasto.')
    }
}

exports.eliminarGasto = async (req, res) => {
    try {
        let gasto = await Gasto.findById(req.params.id);
        if(!gasto) {
            return res.status(404).json({msg: 'No existe el gasto.'});
        }
        await Gasto.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Gasto Eliminado.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al eliminar el gasto.')
    }
}