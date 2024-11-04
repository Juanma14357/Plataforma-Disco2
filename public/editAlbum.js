// Función para obtener el ID del álbum de la URL
function getAlbumId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('album');
}

// Función para obtener los detalles del álbum
async function obtenerDetallesAlbum(id) {
    try {
        const response = await axios.get(`http://localhost:3000/band/${id}`);
        document.getElementById('titulo').value = response.data.Titulo;
        document.getElementById('ano').value = response.data.Año;
        document.getElementById('descripcion').value = response.data.Descripcion;
        document.getElementById('portada').value = response.data.Portada;
    } catch (error) {
        console.error("Error al obtener detalles del álbum:", error);
    }
}

// Función para volver a la página anterior
function goBack() {
    window.history.back();
}

// Cuando se carga la página, obtener el ID del álbum y sus detalles
const albumId = getAlbumId();
if (albumId) {
    obtenerDetallesAlbum(albumId);
}

// Manejar el evento de envío del formulario
document.getElementById('editAlbumForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const albumData = {
        Titulo: document.getElementById('titulo').value,
        Año: document.getElementById('ano').value,
        Descripcion: document.getElementById('descripcion').value,
        Portada: document.getElementById('portada').value,
    };

    try {
        await axios.put(`http://localhost:3000/band/${albumId}`, albumData);
        Swal.fire({
            icon: 'success',
            title: 'Álbum actualizado',
            text: 'Los cambios se han guardado correctamente.',
        }).then(() => {
            window.location.href = `album.html?album=${albumId}`;
        });
    } catch (error) {
        console.error("Error al actualizar el álbum:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo actualizar el álbum. Inténtalo más tarde.',
        });
    }
});
