const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const auth = require('../middleware/auth');

// Crear Gasto
router.post('/', auth, gastoController.crearGasto);
// Obtener Gastos
router.get('/', auth, gastoController.obtenerGastos);
// Actualizar Gastos
router.put('/:id', auth, gastoController.actualizarGasto);
// Eliminar Gasto
router.delete('/:id', auth, gastoController.eliminarGasto);

module.exports = router;