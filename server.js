import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Importa el paquete CORS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "mongodb+srv://juancomes54:6vojNqZUvqiSIZeg@proyecto.4lap9.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto";
const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en JSON
app.use(express.json());

// Middleware estático para archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Usar las rutas definidas en index.js
app.use('/', router);

// Conectar a MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.log(error);
    }
};

connectToMongo();

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
