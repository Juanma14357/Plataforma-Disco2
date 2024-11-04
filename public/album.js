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
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function renderAlbum(album) {
    const albumInfo = document.getElementById('album-info');
    albumInfo.innerHTML = `
        <h2 class="text-center text-3xl text-white">${album.Titulo} (${album.Año})</h2>
        <p class="text-center font-semibold mb-4 text-white">${album.Descripcion}</p>
        <div class="space-y-2">
            ${album.Canciones.map((cancion, index) => `
                <div class="flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg">
                    <span class="flex-1 text-left ml-5">${String(index + 1).padStart(2, '0')}</span>
                    <span class="flex-1 text-center">${cancion.Titulo}</span>
                    <span class="flex-1 text-center">${formatDuration(cancion.Duracion)}</span>
                    <button class="text-red-500 hover:text-red-700 mx-2 mr-8" onclick="deleteSong('${cancion._id}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="text-blue-500 hover:text-blue-700" onclick="playSong('${cancion.Url}')">
                        <i class="fas fa-music"></i>
                    </button>
                </div>
            `).join('')}
        </div>
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
    setupAddSongButton();
}

// Función para añadir un listener al botón de añadir canción
function setupAddSongButton() {
    const addSongButton = document.getElementById('addSongButton');
    addSongButton.addEventListener('click', () => {
        console.log("CLICK")
        window.location.href = `addSong.html?album=${albumId}`; // Redirigir a la página de añadir canción
    });
}



async function deleteSong(songId) {
    const albumId = getAlbumId();
    if (!albumId || !songId) {
        console.error("ID del álbum o de la canción no encontrado.");
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:3000/band/${albumId}/cancion/${songId}`);
        Swal.fire({
            icon: 'success',
            title: 'Canción eliminada',
            text: 'La canción ha sido eliminada del álbum.',
        });
        obtenerDetallesAlbum(albumId); 
    } catch (error) {
        console.error("Error al eliminar la canción:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar la canción. Inténtalo más tarde.',
        });
    }
}

// Función para abrir la URL de la canción
function playSong(url) {
    // Verifica si la URL está definida
    if (!url) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se proporcionó una URL de canción válida.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Abre la URL en una nueva pestaña
    window.open(url, '_blank');
}
     