import { Router } from 'express';
import User from '../models/users.js'; 
import Album from '../models/albums.js';
import bcrypt from "bcrypt";

const saltRound = 10;

const hashPassword = async (pass) => {
    return await bcrypt.hash(pass, saltRound);
}

const checkPassword = async (pass, dbpass) => {
  try {
    const match = await bcrypt.compare(pass, dbpass);
    return match;
  } catch (error) {
    console.error("Error al comparar contraseñas", error);
    return false;
  }
};

const router = Router();

// Crear un usuario
router.post('/user', async (req, res) => {
  const { Nombre, Apellido, Email, Contraseña, Favoritos } = req.body;
  try {
    const contraseñaHasheada = await hashPassword(Contraseña); 
    const newUser = new User({ Nombre, Apellido, Email, Contraseña: contraseñaHasheada, Favoritos });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

// Obtener usuario por ID (sin contraseña)
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-Contraseña');
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

// Editar usuario
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-Contraseña');
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});


// Crear un album
router.post('/band', async (req, res) => {
  const { Titulo, Descripcion, Año, Portada } = req.body; 
  try {
      const newAlbum = new Album({ Titulo, Descripcion, Año, Portada });
      const savedAlbum = await newAlbum.save();
      res.status(201).json({ message: 'Álbum creado exitosamente', album: savedAlbum });
  } catch (error) {
      console.error("Error al crear el álbum:", error.message); 
      res.status(500).json({ message: 'Error al crear el álbum', error: error.message });
  }
});


// Editar un álbum
router.put('/band/:id', async (req, res) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAlbum) return res.status(404).json({ message: "Álbum no encontrado" });
    res.json({ message: "Álbum actualizado", album: updatedAlbum });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el álbum" });
  }
});

// Agregar o eliminar canción en el álbum
router.put('/band/:id/cancion', async (req, res) => {
  const { Cancion, accion } = req.body; 
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    if (accion === 'agregar') {
      album.Canciones.push(Cancion);
    } else if (accion === 'eliminar') {
      album.Canciones = album.Canciones.filter(c => c !== Cancion);
    }

    const updatedAlbum = await album.save();
    res.json({ message: `Canción ${accion === 'agregar' ? 'agregada' : 'eliminada'} correctamente`, album: updatedAlbum });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar las canciones" });
  }
});

// Obtener todos los álbumes
router.get('/band', async (req, res) => {
  try {
    const albums = await Album.find(); // Obtén todos los álbumes
    res.json(albums); // Devuelve los álbumes en formato JSON
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los álbumes" });
  }
});


// Obtener un álbum específico
router.get('/band/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el álbum" });
  }
});

// Eliminar un álbum
router.delete('/band/:id', async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
    if (!deletedAlbum) return res.status(404).json({ message: "Álbum no encontrado" });
    res.json({ message: "Álbum eliminado", album: deletedAlbum });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el álbum" });
  }
});

export default router;
