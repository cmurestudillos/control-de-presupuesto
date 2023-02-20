const mongoose = require('mongoose');

const PresupuestoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },     
    cantidadInicial: {
        type: Number, 
        required: true
    },   
    cantidadRestante: {
        type: Number 
    }, 
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);