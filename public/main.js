// Función para alternar el estado de favorito
function toggleFavorite(element) {
    element.classList.toggle('active');
    const icon = element.querySelector('i');

    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas'); // Cambia al ícono de corazón relleno
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far'); // Cambia al ícono de corazón sin relleno
    }
}

// Función para eliminar un álbum
async function eliminarAlbum(albumId) {
    try {
        await axios.delete(`http://localhost:3000/band/${albumId}`);
        obtenerAlbum(); // Recargar la lista de álbumes después de eliminar uno
    } catch (error) {
        console.log("Error al eliminar álbum:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar el álbum. Inténtalo más tarde.',
        });
    }
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

        albumDiv.innerHTML = `
            <h3 class="text-center m-4 text-2xl">${album.Titulo} (${album.Año})</h3>
            <img src="${album.Portada}" alt="${album.Titulo}" class="h-64 mx-auto rounded-lg" onerror="this.src='https://via.placeholder.com/150'">
        `;

        albumDiv.querySelector('img').addEventListener('click', () => {
            redirect(album._id); 
        });

        // Crear el botón de favorito con ícono de corazón vacío
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('absolute', 'top-2', 'right-2', 'text-white', 'rounded', 'p-2');
        favoriteButton.innerHTML = '<i class="far fa-heart fa-lg"></i>'; // Ícono de corazón sin rellenar

        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            toggleFavorite(favoriteButton);
        });

        // Crear el botón de eliminar álbum
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('absolute', 'bottom-2', 'right-2', 'text-red-500', 'p-3');
        deleteButton.innerHTML = '<i class="fas fa-trash fa-2x"></i>'; 

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás recuperar este álbum!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarAlbum(album._id);
                }
            });
        });

        albumDiv.appendChild(favoriteButton);
        albumDiv.appendChild(deleteButton);
        albumContainer.appendChild(albumDiv);
    });
}

// Función para redirigir a la página del álbum individual
const redirect = (id) => {
    window.location.href = `./album.html?album=${id}`;
};

// Llama a la función cuando se carga el script
obtenerAlbum();
