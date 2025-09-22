document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');
    let messageIndex = 0;
    const appearanceDelay = 1500; // 1.5 segundos entre la aparición de cada mensaje
    const restartDelay = 3000; // 3 segundos para que todo el chat desaparezca y reinicie

    // 1. Oculta todos los mensajes y establece su posición inicial
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transition = `opacity 1s ease-in-out`;
        
        // Asigna una posición vertical única para que no se superpongan
        const verticalPosition = (index / (messages.length - 1)) * 70 + 15;
        message.style.top = `${verticalPosition}%`;
    });

    // 2. Función para mostrar el siguiente mensaje
    const showNextMessage = () => {
        if (messageIndex < messages.length) {
            messages[messageIndex].style.opacity = '1';
            messageIndex++;
        } else {
            // Cuando todos los mensajes se han mostrado
            clearInterval(messageInterval); // Detiene el temporizador de aparición
            setTimeout(hideAllMessages, restartDelay); // Espera y luego oculta todo
        }
    };

    // 3. Función para ocultar todos los mensajes y reiniciar el ciclo
    const hideAllMessages = () => {
        messages.forEach(message => {
            message.style.opacity = '0';
        });
        messageIndex = 0; // Reinicia el contador
        
        // Vuelve a iniciar el temporizador de aparición después de un breve retraso
        setTimeout(() => {
            messageInterval = setInterval(showNextMessage, appearanceDelay);
        }, 500);
    };

    // 4. Inicia el ciclo principal
    let messageInterval = setInterval(showNextMessage, appearanceDelay);
});

     // ------------------- NUEVO CÓDIGO PARA LOS DESTELLOS -------------------
    const sparkleContainer = document.getElementById('sparkle-container');
    const numberOfSparkles = 50; // Aumentado para más destellos
    const minSparkleDelay = 100; // Mínimo 0.1 segundos entre destellos
    const maxSparkleDelay = 500; // Máximo 0.5 segundos entre destellos

    const generateSparkle = () => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkleContainer.appendChild(sparkle);

        // Posición y tamaño aleatorio
        const size = Math.random() * 1 + 5; // Tamaño entre 1px y 4px
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const animationDuration = Math.random() * (2 - 1) + 1; // Duración entre 1 y 2 segundos
        const animationDelay = Math.random() * 1; // Retraso de 0 a 2 segundos

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.top = `${startY}vh`;
        sparkle.style.left = `${startX}vw`;
        sparkle.style.animationDuration = `${animationDuration}s`;
        sparkle.style.animationDelay = `${animationDelay}s`;
        
        // Eliminar el destello del DOM después de su animación
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    };

    // Generar un flujo constante de destellos
    setInterval(generateSparkle, Math.random() * (maxSparkleDelay - minSparkleDelay) + minSparkleDelay);

    // Generar destellos iniciales
    for (let i = 0; i < numberOfSparkles; i++) {
        generateSparkle();
    }

    const audio = document.getElementById('background-audio');

    audio.play().catch(error => {
        console.error("La reproducción de audio automática fue bloqueada:", error);
    });

    document.addEventListener('click', () => {
        audio.play().catch(error => {});
    }, { once: true });
