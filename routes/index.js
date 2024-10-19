import { Router } from 'express';
import User from '../models/users.js'; // Cambia el nombre aquí si prefieres usar User
import AlbumSchema from '../models/albums.js';

const router = Router();




router.post('/user', async (req, res) => {
  const { Nombre, Apellido, Email, Contraseña, Favoritos } = req.body; // Usa las mayúsculas
  try {
      const newUser = new User({
          Nombre, 
          Apellido,
          Email,
          Contraseña,
          Favoritos
      });
      const savedUser = await newUser.save(); // Guarda el usuario
      // Devuelve el usuario completo
      res.status(201).json({ 
          message: 'Usuario creado exitosamente', 
          user: savedUser 
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
  }
});



export default router;