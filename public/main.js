// Función para alternar el estado de favorito
function toggleFavorite(element) {
    element.classList.toggle('active');
}

// Función para obtener álbumes desde el servidor
async function obtenerAlbum() {
    try {
        const response = await axios.get('http://localhost:3000/band'); 
        renderAlbums(response.data); 
    } catch (error) {
        console.log("Error al obtener álbumes:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron cargar los álbumes. Inténtalo más tarde.',
        });
    }
}

// Función para renderizar los álbumes en el contenedor
function renderAlbums(albums) {
    const albumContainer = document.getElementById('album-container');
    albumContainer.innerHTML = ''; 

    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add("bg-blue-800", "border-5", "border-green-500", 'p-4', 'rounded-lg', 'relative');

        // Establecer la URL de la portada o usar una imagen por defecto
         // URL de imagen por defecto

        // Construir el contenido del álbum
        albumDiv.innerHTML = `
            <h3 class="text-center m-4 text-2xl">${album.Titulo} (${album.Año})</h3>
            <img src="${album.Portada}" alt="${album.Titulo}" class="h-64 mx-auto rounded-lg" onerror="this.src='https://via.placeholder.com/150'"> <!-- Manejo de error -->
        `;

        albumDiv.querySelector('img').addEventListener('click', () => {
            redirect(album._id); // Asegúrate de que el ID del álbum esté disponible
        });

        const favoriteButton = document.createElement('button');
        favoriteButton.innerText = 'Favorito';
        favoriteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-blue-500', 'text-white', 'rounded');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
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
