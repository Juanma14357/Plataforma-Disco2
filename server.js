import express from 'express';
import router from './routes/index.js';
import mongoose from 'mongoose';



const url = "mongodb+srv://juancomes54:6vojNqZUvqiSIZeg@proyecto.4lap9.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto"
const app = express();
const PORT = 3000;



// Middleware para usar el router
app.use('/', router);
app.use(express.json());

const connectToMongo = ()=>{
  mongoose.conecct(url)
} 

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto 3000`);
});



