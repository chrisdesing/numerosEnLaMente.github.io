let timerInterval;
let seconds = 0;

// Función para iniciar el temporizador
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// Función para detener el temporizador
function stopTimer() {
    clearInterval(timerInterval);
}

// Función para mostrar el tiempo transcurrido en el temporizador
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(displaySeconds).padStart(2, '0');
}

// Función que verifica si todas las respuestas están completas
function checkCompletion() {
    // Seleccionamos todos los inputs de respuesta
    const answers = document.querySelectorAll(".respuesta");
    
    // Comprobamos si todas las respuestas están completas
    const allAnswered = Array.from(answers).every(input => input.value.trim() !== "");
    
    // Solo mostrar la alerta si todas las respuestas están completas
    // if (allAnswered) {
    //     stopTimer()
    //     alert("¡Todas las respuestas están completas!");
        
       
    // }
    
}
// Detener el temporizador y mostrar el tiempo
function detenerTemporizador() {
    stopTimer()
   
}

// Añadir un evento a los inputs para verificar la completitud
// document.querySelectorAll(".respuesta").forEach(input => {
//     input.addEventListener("input", checkCompletion);
// });

// Función para detectar tecla Enter en computadora
window.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.1;  
    startTimer();
});

// Función de validación
function validarRespuesta(fila, operacion) {
    const x = parseFloat(document.getElementById('x' + fila).value);
    const y = parseFloat(document.getElementById('y' + fila).value);
    const respuesta = parseFloat(document.getElementById('respuesta-' + operacion + fila).value);
    const resultadoElemento = document.getElementById(operacion + fila);
    const mensajeErrorElemento = document.getElementById('error-' + operacion + fila);

    const sonidoCorrecto = document.getElementById('sonido-correcto');
    const sonidoIncorrecto = document.getElementById('sonido-incorrecto');

    // Detecta el primer clic del usuario para empezar a reproducir la música
    window.addEventListener('click', function() {
        const musicaFondo = document.getElementById('musica-fondo');
        musicaFondo.play();
    }, { once: true });

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
        mensajeErrorElemento.textContent = `✗ INCORRECTO`;
        mensajeErrorElemento.style.display = 'inline';
        resultadoElemento.style.display = 'none';
        sonidoIncorrecto.play(); // Reproduce el sonido incorrecto
        setTimeout(() => {
            mensajeErrorElemento.style.display = 'none';
        }, 1000);
    }
}

// Función para reiniciar el juego
function resetGame() {
    // Detener el temporizador
    stopTimer();
    seconds = 0;
    updateTimerDisplay();

    // Borra todas las respuestas
    const answers = document.querySelectorAll(".respuesta");
    answers.forEach(input => input.value = "");

    // Borra los valores de los inputs en las celdas td_initial
    const initialInputs = document.querySelectorAll(".td_initial input[type='number']");
    initialInputs.forEach(input => input.value = ""); // Limpia los valores de los inputs X e Y

    // Borra todas las etiquetas de resultado (asumiendo que las etiquetas tienen clase "resultado")
    const resultados = document.querySelectorAll(".resultado");
    resultados.forEach(resultado => {
        resultado.textContent = ""; // Limpia el texto
        resultado.style.display = 'none'; // Oculta la etiqueta
    });

    // Reinicia el temporizador
    startTimer();
}

