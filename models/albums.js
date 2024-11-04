import { Schema } from 'mongoose';
import mongoose from 'mongoose';


const CancionSchema = new Schema({
    Titulo: { type: String, required: true },
    Duracion: { type: Number, required: true },
    Url: { type: String },
});

const AlbumSchema = new Schema({
    Titulo: { type: String, required: true },
    Descripcion: { type: String },
    Año: { type: Number, required: true },
    Canciones: [CancionSchema],  
    Portada: { type: String },
});


export default mongoose.model('Album', AlbumSchema);