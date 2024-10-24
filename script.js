// Función para detectar tecla Enter en computadora

window.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.1;  
});

function checkEnter(event, fila, operacion) {
    if (event.key === "Enter") {
        validarRespuesta(fila, operacion);
    }
}

// Función de validación
function validarRespuesta(fila, operacion) {
    const x = parseFloat(document.getElementById('x' + fila).value);
    const y = parseFloat(document.getElementById('y' + fila).value);
    const respuesta = parseFloat(document.getElementById('respuesta-' + operacion + fila).value);
    const resultadoElemento = document.getElementById(operacion + fila);
    const mensajeErrorElemento = document.getElementById('error-' + operacion + fila);

    const sonidoCorrecto = document.getElementById('sonido-correcto');
    const sonidoIncorrecto = document.getElementById('sonido-incorrecto');

    // Función para reproducir música de fondo
    function reproducirMusica() {
        const musicaFondo = document.getElementById('musica-fondo');
        musicaFondo.play();
    }

    // Detecta el primer clic del usuario para empezar a reproducir la música
    window.addEventListener('click', reproducirMusica, { once: true });


    // Función para detectar tecla Enter en computadora
    function checkEnter(event, fila, operacion) {
        if (event.key === "Enter") {
            validarRespuesta(fila, operacion);
        }
    }
    let resultadoCorrecto;

    switch (operacion) {
        case 'suma':
            resultadoCorrecto = x + y;
            break;
        case 'resta':
            resultadoCorrecto = x - y;
            break;
        case 'multiplicacion':
            resultadoCorrecto = x * y;
            break;
        case 'division':
            if (y === 0) { 
                mensajeErrorElemento.textContent = "No se puede dividir entre cero";
                mensajeErrorElemento.style.display = 'inline';
                resultadoElemento.style.display = 'none';
                sonidoIncorrecto.play(); // Reproduce el sonido incorrecto
                return; // Detener la ejecución aquí
            } else {
                resultadoCorrecto = (x / y).toFixed(1); // Limita a 1 decimal
            }
            break;
        case 'raiz':
            resultadoCorrecto = Math.sqrt(x).toFixed(1); // Limita a 1 decimal
            break;
        case 'exponenciacion':
            resultadoCorrecto = Math.pow(x, 2);
            break;
        default:
            return;
    }

    if (parseFloat(respuesta.toFixed(1)) === parseFloat(resultadoCorrecto)) {
        resultadoElemento.textContent = '✓';
        resultadoElemento.style.color = '#27ae60'; // Verde
        resultadoElemento.style.display = 'inline';
        mensajeErrorElemento.style.display = 'none';
        sonidoCorrecto.play(); // Reproduce el sonido correcto
    } else {
        mensajeErrorElemento.textContent = `✗ (Correcto: ${resultadoCorrecto})`;
        mensajeErrorElemento.style.display = 'inline';
        resultadoElemento.style.display = 'none';
        sonidoIncorrecto.play(); // Reproduce el sonido incorrecto
        setTimeout(() => {
            mensajeErrorElemento.style.display = 'none';
        }, 1000);
    }
}