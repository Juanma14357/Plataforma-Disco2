// Función para alternar el estado de favorito
function toggleFavorite(element) {
    element.classList.toggle('active');
}

// Función para obtener álbumes desde el servidor
async function obtenerAlbum() {
    try {
        const response = await axios.get('http://localhost:3000/band'); // Asegúrate de que esta URL esté correcta
        renderAlbums(response.data); // Llama a renderAlbums con los datos obtenidos
    } catch (error) {
        console.log("Error al obtener álbumes:", error);
    }
}

// Función para renderizar los álbumes en el contenedor
function renderAlbums(albums) {
    const albumContainer = document.getElementById('album-container');
    albumContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos álbumes

    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('bg-gray-800', 'p-4', 'rounded-lg', 'relative');

        // Construir el contenido del álbum
        albumDiv.innerHTML = `
            <h3 class="text-center mt-4 text-xl">${album.Titulo} (${album.Año})</h3>
            <p class="text-center mx-auto font-bold text-xl">${album.Descripcion}</p>
            <img src="${album.Portada}" alt="${album.Titulo}" class="h-64 mx-auto rounded-lg">
        `;

        // Agregar el evento de clic para redirigir al álbum
        albumDiv.querySelector('img').addEventListener('click', () => {
            redirect(album._id); // Asegúrate de que el ID del álbum esté disponible
        });

        // (Opcional) Si deseas incluir un botón para marcar como favorito
        const favoriteButton = document.createElement('button');
        favoriteButton.innerText = 'Favorito';
        favoriteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-blue-500', 'text-white', 'rounded');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que se dispare el evento de clic en la imagen
            toggleFavorite(favoriteButton); // Llama a la función para alternar el favorito
        });
        albumDiv.appendChild(favoriteButton);

        albumContainer.appendChild(albumDiv);
    });
}

// Función para redirigir a la página del álbum individual
const redirect = (id) => {
    window.location.href = `./album.html?album=${id}`;
};

// Llama a la función cuando se carga el script
obtenerAlbum();
