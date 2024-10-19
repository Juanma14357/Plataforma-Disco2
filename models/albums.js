import { Schema } from 'mongoose';
import mongoose from 'mongoose';


const CancionSchema = new Schema({
    Título: { type: String, required: true },
    Duración: { type: Number, required: true },
});

const AlbumSchema = new Schema({
    Título: { type: String, required: true },
    Descripción: { type: String },
    año: { type: Number, required: true },
    Canciones: [CancionSchema],  
    Portada: { type: String },
});

export default mongoose.model('Album', AlbumSchema);