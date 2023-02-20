const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController');
const auth = require('../middleware/auth');

//Obtener presupuestos
router.get('/' , auth, presupuestoController.obtenerPresupuestos)
// Crear presupuesto
router.post('/', auth, presupuestoController.crearPresupuesto);
//Actualizar presupuesto
router.put('/:id', auth, presupuestoController.actualizarPresupuesto);
// Eliminar presupuesto
router.delete('/:id', auth, presupuestoController.eliminarPresupuesto);

module.exports = router;