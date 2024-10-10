import { Router } from 'express';

const router = Router();

// Definir una ruta que devuelva "Hello World!"
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Exportar el router
export default router;