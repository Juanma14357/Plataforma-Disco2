// Función para obtener el ID del álbum de la URL
function getAlbumId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('album'); // Obtiene el ID del álbum de la URL
}

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const buttonAddSong = document.getElementById('buttonAddSong');

    buttonAddSong.addEventListener('click', async (event) => {
        event.preventDefault();

        const albumId = getAlbumId(); // Llama a getAlbumId aquí
        console.log("ID del álbum:", albumId); // Verifica el valor del ID

        if (!albumId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró el ID del álbum. Por favor, verifica la URL.',
                confirmButtonText: 'Aceptar'
            });
            return; // Sale si no hay ID
        }

        const titulo = document.getElementById('Titulo').value;
        const duracion = document.getElementById('Duracion').value;
        const url = document.getElementById('Url').value; // Cambié 'Link' a 'Url' para que coincida con tu modelo

        const cancion = {
            Titulo: titulo,
            Duracion: duracion,
            Url: url, // Asegúrate de que esto coincida con tu esquema de Mongoose
        };

        try {
            const response = await axios.put(`http://localhost:3000/band/${albumId}/cancion`, {
                Cancion: cancion,
                accion: 'agregar'
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: response.data.message,
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = `./album.html?album=${albumId}`;
            });
        } catch (error) {
            console.error("Error al añadir la canción:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo añadir la canción. Inténtalo más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
