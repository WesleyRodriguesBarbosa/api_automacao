import express from 'express';
import deviceController from '../controllers/deviceController.js';

const router = express.Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getById);
router.put('/:id', deviceController.update);
router.delete('/:id', deviceController.delete);

export default router;