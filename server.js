import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Todo esto para que funcione lo de Pledu
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "mongodb+srv://juancomes54:6vojNqZUvqiSIZeg@proyecto.4lap9.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto";
const app = express();
const PORT = 3000;

// Middleware para usar el router
app.use('/', router);
app.use(express.json());

// Función para conectar a MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.log(error);
  }
};

// Ejecutar la función para conectar a MongoDB
connectToMongo();

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
