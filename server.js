import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Password = process.env.Password; // Acceder a la variable de entorno para la contraseña
const PORT = process.env.PORT; // Acceder a la variable de entorno para el puerto

// Usar backticks para interpolar la contraseña en la URL
const url = `mongodb+srv://juancomes54:${Password}@proyecto.4lap9.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto`;

const app = express();

// Ruta para el Health Check de Render
app.use("/health", (req, res) => res.sendStatus(200));

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
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escuchando en puerto ${process.env.PORT || 3000}`);
});
