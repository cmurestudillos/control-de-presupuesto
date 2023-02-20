const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    lista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);