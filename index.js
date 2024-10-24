function iniciarJuego() {
    // Aquí puedes redirigir a otra página o iniciar el juego
    window.location.href = "principal.html"; // Redirige a la página del juego
    // O puedes inicializar la lógica del juego directamente aquí
     // Pausa la animación de las letras al hacer clic en el botón
     letras.forEach(letra => {
        letra.style.animationPlayState = 'paused'; // Detiene la animación

        // Puedes agregar lógica aquí para iniciar el juego
    });
}