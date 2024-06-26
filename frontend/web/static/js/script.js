globalId = null;
globaluser = null;
globalemail = null;
globalcontra = null;

$(document).ready(function () {
  $("#formulario-registro").submit(function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los datos del formulario
    var username = $("#name").val();
    var email = $("#email").val();
    var password1 = $("#pass").val();
    var agreeTerm = $("#agree-term").prop("checked") ? 1 : 0; // Verificar si la checkbox está marcada

    if (agreeTerm === 0) {
      $("#error-message").text(
        "Debes aceptar los términos y condiciones para crear un nuevo usuario."
      );
      $("#error-message").show(); // Mostrar el mensaje de error
      return; // Salir de la función y no enviar el formulario
    } else {
      if (
        email.indexOf("VIP.com") !== -1 ||
        email.indexOf("ADMIN.com") !== -1 ||
        email.indexOf("JEFE.com") !== -1
      ) {
        console.log({
          error: "error papito",
          message: "No intentes estafarnos papito, cagaste.",
        });
      } else {
        $.ajax({
          url: "http://localhost:9010/web/login/", // URL del backend
          method: "POST",
          data: {
            username: username,
            email: email,
            password1: password1,
          },
          success: function (response) {
            // Si la respuesta es exitosa, redirigir al usuario a la página de inicio de sesión
            if (response.success) {
              $("#success-message").text(
                "Registro exitoso: " + response.message
              );
              $("#success-message").show(); // Mostrar el mensaje de éxito
              console.log("Respuesta exitosa:", response);
              window.alert("Usuario Creado Exitosamente");
              window.setTimeout(function () {
                window.location.href =
                  "http://localhost:9020/web/inicio_sesion/";
              }, 1000); // Retraso de 1 segundos
            } else {
              // Muestra el mensaje de error recibido del servidor
              console.log(response.error);
              var errorMessage = response.error;
              if (errorMessage.includes("duplicado")) {
                $("#error-message").text();
                $("#error-message").show(); // Mostrar el mensaje de error
                setTimeout(function () {
                  console.log(response);
                  window.alert(
                    "Error: Los datos ingresados ya existen en la base de datos."
                  );
                  window.location.href = "http://localhost:9020/web/login/";
                }, 1000); // Retraso de 1 segundos antes de redirigir
              } else {
                window.location.href = "http://localhost:9020/web/login/";
                window.alert("este usuario ya existe");
              }
              // Maneja el mensaje de error según tus necesidades
            }
          },
          error: function (xhr, status, error) {
            // Mostrar el mensaje de error en caso de un error

            console.error("Error en AJAX:", xhr);
            var errorMessage = xhr.responseJSON.message;
            if (errorMessage.includes("duplicado")) {
              $("#error-message").text(
                "Error: Los datos ingresados ya existen en la base de datos."
              );
              $("#error-message").show(); // Mostrar el mensaje de error
              setTimeout(function () {
                window.location.href = "http://localhost:9020/web/login/";
              }, 1000); // Retraso de 1 segundos antes de redirigir
            } else {
              window.location.href = "http://localhost:9020/web/login/";
              window.alert("este usuario ya existe");
            }
          },
        });
      }
    }
  });
});

$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serialize();
    $.ajax({
      url: "http://localhost:9010/web/inicio_sesion/",
      method: "POST",
      data: formData,
      success: function (response) {
        // Maneja la respuesta del servidor
        if (response.redirect) {
          // Abre la página en una nueva pestaña
          console.log(response.user_id1);
          globalId = response.user_id1;
          globalcorreo = response.user_correo;
          globalusuario = response.usuario;
          globalcontra = response.user_contra;
          console.log(globalId);
          window.alert("¡Inicio de sesión exitoso!");
          window.open(response.redirect, "_blank");

          // Guarda el valor de globalId en la sesión del navegador
          sessionStorage.setItem("globalId", globalId);
          sessionStorage.setItem("globalcorreo", globalcorreo);
          sessionStorage.setItem("globalusuario", globalusuario);
          localStorage.setItem("globalId", globalId);
          localStorage.setItem("globalcorreo", globalcorreo);
          localStorage.setItem("globalusuario", globalusuario);
        } else {
          // Muestra el mensaje de error recibido del servidor
          console.log(response.error);
          var errorMessage = response.message;
          if (errorMessage.includes("registrados")) {
            $("#error-message").text();
            $("#error-message").show(); // Mostrar el mensaje de error
            console.log(response);
            window.alert(errorMessage, "error");
          }
        }
      },
      error: function (response) {
        error = response.message;
        errorMessage = "DATOS ERRONEOS O NUNCA REGISTRADOS";
        window.alert(errorMessage);
        console.log();
      },
    });
  });
});

$(document).ready(function () {
  var formulario = $("#wawita");
  var contadorNotificaciones = 0;

  formulario.on("submit", function (event) {
    event.preventDefault();
    var username = formulario.find('input[name="username"]').val();
    var email = formulario.find('input[name="email"]').val();
    var contra = formulario.find('input[name="contra"]').val();

    // Realizar una solicitud AJAX para guardar el usuario
    $.ajax({
      url: "http://localhost:9010/web/administracion/",
      method: "POST",
      data: {
        username: username,
        email: email,
        contra: contra,
      },
      success: function (response) {
        // Convertir la respuesta a cadena
        console.log(response.message);
        if (response.message === "Registro exitoso") {
          console.log("Usuario guardado correctamente en la base de datos");
          mostrarNotificacion(
            "Se ha creado un nuevo usuario con el nombre " + username,
            "success"
          );
        } else {
          console.log("Error...");
          mostrarNotificacion(response.message);
        }
      },
      error: function (xhr, errmsg, err) {
        // Si hay un error, imprimir el mensaje de error en la consola
        console.log(
          "Error al guardar el usuario en la base de datos:",
          xhr.responseText
        );

        // Mostrar notificación de error
        mostrarNotificacion("Error al guardar el usuario", "error");
      },
    });

    // Limpiar el formulario después de guardar el usuario
    formulario[0].reset();
  });

  // Función para mostrar una nueva notificación
  function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento div para la notificación
    var notification = $("<div></div>", {
      class: "list-group-item text-center bg-" + tipo,
    });

    // Agregar el mensaje de la notificación
    var mensajeNotificacion = $("<span></span>").text(mensaje);
    notification.append(mensajeNotificacion);

    // Botón para eliminar la notificación
    var botonEliminar = $("<button></button>", {
      text: "Eliminar",
      class: "btn btn-danger",
    }).on("click", function () {
      notification.remove(); // Eliminar la notificación al hacer clic en el botón
      // Decrementar el contador de notificaciones
      actualizarBadge(--contadorNotificaciones);
    });
    notification.append(botonEliminar);

    // Obtener el contenedor de notificaciones
    var notificationsContainer = $(".Notifications-body .list-group");

    // Agregar la notificación al contenedor
    notificationsContainer.append(notification);

    // Incrementar el contador de notificaciones
    actualizarBadge(++contadorNotificaciones);
  }

  // Función para actualizar el badge con el número de notificaciones
  function actualizarBadge(numero) {
    var badge = $(".btn-Notifications-area .badge");
    badge.text(numero);
  }
});

// Script para el botón de inicio de sesión VIP en el modal
$(document).ready(function () {
  $("#loginButton2").click(function (event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log("Correo:", email, "Contraseña:", password);
    $.ajax({
      url: "http://localhost:9010/web/EsVIP/",
      method: "POST",
      data: {
        correo: email,
        contra: password,
      },
      success: function (response) {
        console.log(response.message);
        if (response.message === "El usuario es VIP") {
          // Mostrar animación VIP
          const vipAnimation = document.getElementById("vip-animation");
          vipAnimation.classList.remove("hidden");
          vipAnimation.classList.add("fade-in");

          // Ocultar animación después de 3 segundos y mostrar mangas extra
          setTimeout(function () {
            vipAnimation.classList.remove("fade-in");
            vipAnimation.classList.add("fade-out");

            setTimeout(function () {
              vipAnimation.classList.add("hidden");
              vipAnimation.classList.remove("fade-out");

              // Mostrar mangas adicionales
              const extraMangas = document.querySelectorAll(".extra-manga");
              extraMangas.forEach(function (manga) {
                manga.style.display = "block";
              });
            }, 1000); // Duración del fade-out
          }, 2000); // Duración antes de ocultar la animación
          // Aquí puedes agregar la lógica para mostrar contenido VIP
        } else {
          console.log("OoPS");
          console.log(response.message);
        }
      },
      error: function (xhr, errmsg, err) {
        console.error("Error en la verificación VIP:", xhr.responseText);
      },
    });
  });
});

$(document).ready(function () {
  var usuarioHaIniciadoSesion = false;
  // Event listener para el botón de cuenta
  $("#cuentaButton").on("click", function () {
    // Verificar si el usuario ha iniciado sesión
    if (usuarioHaIniciadoSesion) {
      // Si el usuario ha iniciado sesión, abrir el modal de cuenta
      $("#cuentaModal").modal("show");
    } else {
      // Si el usuario no ha iniciado sesión, redirigir al modal de inicio de sesión
      $("#myModal").modal("show");
    }
  });
  // Event listener para el botón de guardar cambios en el modal de cuenta
  $("#saveChangesButton").on("click", function () {
    // Obtener los datos del formulario
    var newUsername = $("#username").val();
    var newPassword = $("#password").val();
    var newEmail = $("#email").val();

    // Validar el correo electrónico
    if (
      newEmail.endsWith("@gmailVIP.com") ||
      newEmail.endsWith("@hotmailVIP.com")
    ) {
      // Realizar la solicitud AJAX para actualizar el usuario
      $.ajax({
        url: "http://localhost:9010/web/actualizar-usuario/",
        method: "POST",
        data: {
          userId: userIdToUpdate, // Usar el ID del usuario almacenado globalmente
          newUsername: newUsername,
          newEmail: newEmail,
          newPassword: newPassword,
        },
        success: function (response) {
          if (response.status === "success") {
            console.log({
              icon: "success",
              title: "¡Usuario actualizado exitosamente!",
              showConfirmButton: false,
              timer: 1500,
            });
            $("#cuentaModal").modal("hide"); // Ocultar el modal después de la actualización
            // Aquí puedes añadir más acciones si es necesario, como recargar la página o actualizar datos adicionales
          } else {
            console.log({
              icon: "error",
              title: "Error al actualizar usuario",
              text: response.message,
            });
          }
        },
        error: function (xhr, errmsg, err) {
          console.log(xhr.status + ": Error al actualizar usuario");
        },
      });
    } else {
      // Mostrar mensaje de error si el correo electrónico no es válido
      alert(
        "El correo electrónico debe terminar en @gmailVIP.com o @hotmailVIP.com"
      );
    }
  });
});

$(document).ready(function () {
  var formulario = $("#bossito");
  var contadorNotificaciones = 0;

  formulario.on("submit", function (event) {
    event.preventDefault();
    var username = formulario.find('input[name="nombreboss"]').val();
    var email = formulario.find('input[name="correoboss"]').val();
    var contra = formulario.find('input[name="contraboss"]').val();

    // Realizar una solicitud AJAX para guardar el usuario
    $.ajax({
      url: "http://localhost:9010/web/administracion/",
      method: "POST",
      data: {
        username: username,
        email: email,
        contra: contra,
      },
      success: function (response) {
        // Convertir la respuesta a cadena
        console.log(response.message);
        if (response.message === "Registro exitoso") {
          console.log("Usuario guardado correctamente en la base de datos");
          mostrarNotificacion(
            "Se ha creado un nuevo usuario con el nombre " + username,
            "success"
          );
        } else {
          console.log("Error...");
          mostrarNotificacion(response.message);
        }
      },
      error: function (xhr, errmsg, err) {
        // Si hay un error, imprimir el mensaje de error en la consola
        console.log(
          "Error al guardar el usuario en la base de datos:",
          xhr.responseText
        );

        // Mostrar notificación de error
        mostrarNotificacion("Error al guardar el usuario", "error");
      },
    });

    // Limpiar el formulario después de guardar el usuario
    formulario[0].reset();
  });

  // Función para mostrar una nueva notificación
  function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento div para la notificación
    var notification = $("<div></div>", {
      class: "list-group-item text-center bg-" + tipo,
    });

    // Agregar el mensaje de la notificación
    var mensajeNotificacion = $("<span></span>").text(mensaje);
    notification.append(mensajeNotificacion);

    // Botón para eliminar la notificación
    var botonEliminar = $("<button></button>", {
      text: "Eliminar",
      class: "btn btn-danger",
    }).on("click", function () {
      notification.remove(); // Eliminar la notificación al hacer clic en el botón
      // Decrementar el contador de notificaciones
      actualizarBadge(--contadorNotificaciones);
    });
    notification.append(botonEliminar);

    // Obtener el contenedor de notificaciones
    var notificationsContainer = $(".Notifications-body .list-group");

    // Agregar la notificación al contenedor
    notificationsContainer.append(notification);

    // Incrementar el contador de notificaciones
    actualizarBadge(++contadorNotificaciones);
  }

  // Función para actualizar el badge con el número de notificaciones
  function actualizarBadge(numero) {
    var badge = $(".btn-Notifications-area .badge");
    badge.text(numero);
  }
});

$("#cerrarsesionbtn").on("click", function () {
  localStorage.removeItem("globalProductos");
  localStorage.removeItem("savedCards");
  localStorage.removeItem("globalId");
  localStorage.removeItem("globalusuario");
  localStorage.removeItem("globalcorreo");
  localStorage.removeItem("globalcontra");
});
