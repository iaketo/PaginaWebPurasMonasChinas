$(document).ready(function () {
  $("#bossito").submit(function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los datos del formulario
    var username = $("input[name='nombreboss']").val();
    var email = $("input[name='correoboss']").val();
    var contra = $("#contraboss").val();

    // Imprimir los valores obtenidos del formulario en la consola
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", contra);

    // Enviar los datos al backend mediante AJAX
    $.ajax({
      url: "http://localhost:9010/web/administracion/", // URL del backend
      method: "POST",
      data: {
        username: username,
        email: email,
        contra: contra,
      },
      success: function (response) {
        // Si la respuesta es exitosa, redirigir al usuario a la página de inicio de sesión
        $("#success-message").text("Registro exitoso: " + response.message);
        $("#success-message").show(); // Mostrar el mensaje de éxito
        console.log("Respuesta exitosa:", response);
        window.setTimeout(function () {}, 5000); // Retraso de 5 segundos
      },
      error: function (xhr, status, error) {
        // Mostrar el mensaje de error en caso de un error
        console.error("Error en la solicitud AJAX:", xhr);
        if (xhr.responseJSON && xhr.responseJSON.message) {
          var errorMessage = xhr.responseJSON.message;
          if (errorMessage.includes("duplicado")) {
            $("#error-message").text(
              "Error: Los datos ingresados ya existen en la base de datos."
            );
            $("#error-message").show(); // Mostrar el mensaje de error
            setTimeout(function () {}, 5000); // Retraso de 5 segundos antes de redirigir
          } else {
            window.location.href = "http://localhost:9020/web/crudboss/";
          }
        } else {
          console.error("No se pudo obtener el mensaje de error.");
        }
      },
    });
  });
});
$("#cerrarsesionbtn").on("click", function () {
  localStorage.removeItem("globalProductos");
  localStorage.removeItem("savedCards");
  localStorage.removeItem("globalId");
  localStorage.removeItem("globalusuario");
  localStorage.removeItem("globalcorreo");
  localStorage.removeItem("globalcontra");
});