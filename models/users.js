import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const UsuarioSchema = new Schema({
    Nombre: { type: String,   },
    Apellido: { type: String,   },
    Email: {
      type: String,
      validate: {
        validator: function(v) {
          return regex.test(v);
        },
        message: "Debes ingresar un mail válido",
      },
    },
    Contraseña: { type: String,   },
    Favoritos: { type: String },
  });

export default mongoose.model('User', UsuarioSchema); 

