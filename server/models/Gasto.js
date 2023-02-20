const mongoose = require('mongoose');

const GastoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },     
    cantidad: {
        type: Number
    },
    creado: {
        type: Date,
        default: Date.now()
    },       
    presupuesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presupuesto'
    }  
});

module.exports = mongoose.model('Gasto', GastoSchema);