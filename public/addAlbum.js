document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('albumForm');
    
    // Añade un listener para el evento de envío
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Captura los valores de los inputs
        const titulo = document.getElementById('Titulo').value.trim();
        const descripcion = document.getElementById('Descripcion').value.trim();
        const año = document.getElementById('Año').value.trim();
        const portada = document.getElementById('Portada').value.trim();

        // Validar campos
        let errorMessage = '';
        if (!titulo || !año) {
            errorMessage += 'El título y el año son obligatorios. ';
        }
        if (descripcion.length > 50) {
            errorMessage += 'La descripción no puede tener más de 50 caracteres.';
        }

        // Si hay mensajes de error, mostramos un SweetAlert2
        if (errorMessage) {
            await Swal.fire({
                icon: 'error',
                title: 'Error de Validación',
                text: errorMessage
            });
            return; // Salimos de la función si hay errores
        }

        try {
            // Envía los datos a la API
            const response = await axios.post('http://localhost:3000/band', {
                Titulo: titulo,
                Descripcion: descripcion,
                Año: año,
                Portada: portada
            });
            
            await Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: response.data.message
            });

            form.reset(); // Limpiar el formulario
        } catch (error) {
            console.error("Error al crear el álbum:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el álbum'
            });
        }
    });
});
