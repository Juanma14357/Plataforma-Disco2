function saludar() {
    Swal.fire("hola", "todo bien?", "success");
}

function toggleFavorite(element) {

    element.classList.toggle('active');
}

async function obtenerAlbum() {
    try {
        const response = await axios.get()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

obtenerAlbum();