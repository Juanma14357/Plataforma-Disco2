import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 5000;

// Middleware para usar el router
app.use('/', router);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
