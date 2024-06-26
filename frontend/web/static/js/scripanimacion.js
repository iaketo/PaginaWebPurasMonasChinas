document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los botones de eliminación de notificaciones
    var deleteButtons = document.querySelectorAll(".btn-delete-notification");

    // Agregar un controlador de eventos clic a cada botón
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Eliminar la notificación padre del botón actual
            var notification = button.parentNode;
            notification.parentNode.removeChild(notification);

            // Mostrar la animación de confirmación si existe
            var deleteAnimation = document.getElementById("delete-animation");
            if (deleteAnimation) {
                deleteAnimation.style.display = "block"; // Mostrar la animación

                // Ocultar la animación después de un tiempo (por ejemplo, 3 segundos)
                setTimeout(function () {
                    deleteAnimation.style.display = "none"; // Ocultar la animación
                }, 3000);
            }
        });
    });
});
