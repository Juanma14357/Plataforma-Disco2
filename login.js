// Asegúrate de que este script se ejecute después de que el DOM se haya cargado
document.addEventListener(function() {
    document.getElementById('login-formulario').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }


        if (password.length < 6) {
            const passwordInput = document.getElementById('password');
            Swal.fire({
                icon: 'error',
                title: 'Contraseña muy corta',
                text: 'Tu respuesta es demasiado corta.',
            });
            passwordInput.classList.add('border-red-500'); 

            passwordInput.addEventListener('input', function() {
                if (this.value.length >= 6) {
                    this.classList.remove('border-red-500'); 
                }
            });
            return; 
        }

        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido!',
        });
    });
});
