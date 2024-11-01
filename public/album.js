// Función para obtener el ID del álbum de la URL
function getAlbumId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('album');
}

// Función para obtener los detalles del álbum
async function obtenerDetallesAlbum(id) {
    try {
        const response = await axios.get(`http://localhost:3000/band/${id}`); // Ajusta la URL según tu API
        renderAlbum(response.data);
    } catch (error) {
        console.error("Error al obtener detalles del álbum:", error);
    }
}

// Función para renderizar la información del álbum
function renderAlbum(album) {
    const albumInfo = document.getElementById('album-info');
    albumInfo.innerHTML = `
        <h2 class="text-center text-2xl">${album.Titulo} (${album.Año})</h2>
        <p class="text-center font-semibold mb-4">${album.Descripcion}</p>
        <h3 class="mt-4 text-lg font-semibold">Canciones:</h3>
        <ul class="list-disc pl-6 space-y-2">
            ${album.Canciones.map(cancion => `<li>${cancion.Titulo} (${cancion.Duracion} seg)</li>`).join('')}
        </ul>
    `;
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
