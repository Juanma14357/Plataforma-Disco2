
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('albumForm');
    
    // Añade un listener para el evento de envío
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Captura los valores de los inputs
        const titulo = document.getElementById('Titulo').value;
        const descripcion = document.getElementById('Descripcion').value;
        const año = document.getElementById('Año').value;
        const portada = document.getElementById('Portada').value;

        try {
            // Envía los datos a la API
            const response = await axios.post('http://localhost:3000/band', {
                Titulo: titulo,
                Descripcion: descripcion,
                Año: año,
                Portada: portada
            });
            

            alert(response.data.message);

            form.reset(); // Limpiar el formulario
        } catch (error) {
            console.error("Error al crear el álbum:", error);
            alert('Error al crear el álbum');
        }
    });
});
