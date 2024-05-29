import { Router } from 'express';
import CategoryController from './app/controllers/CategoryController';
import ContactController from './app/controllers/ContactController';

const router = Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.delete('/contacts/:id', ContactController.delete);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);
router.put('/categories/:id', CategoryController.update);

export default router;
