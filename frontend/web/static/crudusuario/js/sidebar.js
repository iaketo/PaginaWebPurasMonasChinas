$(document).ready(function () {
  $(document).ready(function () {
    const mostrarCuentaBtn = document.getElementById("mostrarCuentaBtnUsuario");
    const actualizarSesionBtn = document.getElementById(
      "actualizarSesionBtnUsuario"
    );
    const eliminarCuentaBtn = document.getElementById(
      "eliminarCuentaBtnUsuario"
    );

    const modal = document.getElementById("modal");
    const updateModal = document.getElementById("updateModal");
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const successDeleteModal = document.getElementById("successDeleteModal");

    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeUpdateModalBtn = document.getElementById("closeUpdateModalBtn");
    const closeConfirmDeleteModalBtn = document.getElementById(
      "closeConfirmDeleteModalBtn"
    );
    const closeSuccessDeleteModalBtn = document.getElementById(
      "closeSuccessDeleteModalBtn"
    );

    const saveUpdateBtn = document.getElementById("saveUpdateBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    var id1 = localStorage.getItem("globalId");
    var user = localStorage.getItem("globalusuario");
    var email = localStorage.getItem("globalcorreo");
    var contra = localStorage.getItem("globalcontra");

    // Simular datos de usuario
    const usuarioDatos = {
      id: id1,
      usuario: user,
      email: email,
      password: contra,
    };

    // Función para mostrar la ventana modal de detalles de cuenta
    function mostrarModal(datos) {
      const modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
      <p><strong>ID:</strong> ${datos.id}</p>
      <p><strong>Usuario:</strong> ${datos.usuario}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Contraseña:</strong> ${datos.password}</p>
    `;
      modal.style.display = "block";
    }

    // Función para mostrar la ventana modal de actualización de cuenta
    function mostrarUpdateModal(datos) {
      document.getElementById("updateUsuario").value = datos.usuario;
      document.getElementById("updateEmail").value = datos.email;
      document.getElementById("updatePassword").value = datos.password;
      updateModal.style.display = "block";
    }

    // Función para mostrar la ventana modal de confirmación de eliminación
    function mostrarConfirmDeleteModal() {
      confirmDeleteModal.style.display = "block";
    }

    // Función para mostrar la ventana modal de éxito en eliminación
    function mostrarSuccessDeleteModal() {
      successDeleteModal.style.display = "block";
    }

    // Función para mostrar la ventana modal de actualización de cuenta
    function mostrarUpdateModal(datos) {
      document.getElementById("updateUsuario").value = datos.usuario;
      document.getElementById("updateEmail").value = datos.email;
      document.getElementById("updatePassword").value = datos.password;
      updateModal.style.display = "block";
    }

    // Event listeners para abrir los modales
    mostrarCuentaBtn.addEventListener("click", function () {
      mostrarModal(usuarioDatos);
    });

    actualizarSesionBtn.addEventListener("click", function () {
      mostrarUpdateModal(usuarioDatos);
    });

    eliminarCuentaBtn.addEventListener("click", function () {
      mostrarConfirmDeleteModal();
    });

    // Event listeners para cerrar los modales
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    closeUpdateModalBtn.addEventListener("click", function () {
      updateModal.style.display = "none";
    });

    closeConfirmDeleteModalBtn.addEventListener("click", function () {
      confirmDeleteModal.style.display = "none";
    });

    closeSuccessDeleteModalBtn.addEventListener("click", function () {
      successDeleteModal.style.display = "none";
    });

    // Event listener para guardar los cambios de actualización
    saveUpdateBtn.addEventListener("click", function () {
      // Obtener los datos del modal
      var userIdToUpdate = localStorage.getItem("globalId");
      var newUsername = $("#updateUsuario").val();
      var newEmail = $("#updateEmail").val();
      var newPassword = $("#updatePassword").val();

      // Verificar si el nuevo correo electrónico contiene alguna de las palabras clave prohibidas
      if (
        newEmail.toLowerCase().indexOf("vip.com") !== -1 ||
        newEmail.toLowerCase().indexOf("admin.com") !== -1 ||
        newEmail.toLowerCase().indexOf("jefe.com") !== -1
      ) {
        // Mostrar error en la consola
        console.log({
          error: "error papito",
          message: "No intentes estafarnos.",
        });
        // Mostrar alerta al usuario
        alert("No tienes los parámetros para actualizar el tipo de usuario...");
        // No se actualizan los datos, así que no mostramos el mensaje de éxito
        return;
      }

      // Si el correo electrónico no contiene palabras clave prohibidas, continuar con la actualización
      $.ajax({
        url: "http://localhost:9010/web/actualizar-usuario/",
        method: "POST",
        data: {
          userId: userIdToUpdate,
          newUsername: newUsername,
          newEmail: newEmail,
          newPassword: newPassword,
        },
        success: function (response) {
          if (response.status === "success") {
            // Mostrar mensaje de éxito
            alert("Datos actualizados!");
            alert("Vuelva a iniciar sesion para ver sus datos actualizados. ");
            // Cerrar el modal de actualización
            updateModal.style.display = "none";
          } else {
            // Mostrar mensaje de error en la consola
            console.log({
              icon: "error",
              title: "Error al actualizar usuario",
              text: response.message,
            });
            // Mostrar alerta al usuario
            alert(
              "Datos no actualizados. Error al actualizar usuario: " +
                response.message
            );
          }
        },
        error: function (xhr, errmsg, err) {
          console.log(xhr.status + ": Error al actualizar usuario");
        },
      });
    });

    // Event listener para confirmar la eliminación de la cuenta
    confirmDeleteBtn.addEventListener("click", function () {
      confirmDeleteModal.style.display = "none";
      mostrarSuccessDeleteModal();
    });

    // Event listener para cancelar la eliminación de la cuenta
    cancelDeleteBtn.addEventListener("click", function () {
      confirmDeleteModal.style.display = "none";
    });

    // Cerrar los modales si el usuario hace clic fuera de ellos
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
      if (event.target == updateModal) {
        updateModal.style.display = "none";
      }
      if (event.target == confirmDeleteModal) {
        confirmDeleteModal.style.display = "none";
      }
      if (event.target == successDeleteModal) {
        successDeleteModal.style.display = "none";
      }
    });
  });
});
$("#cerrarSesionBtnUsuario").on("click", function () {
  localStorage.removeItem("globalProductos");
  localStorage.removeItem("savedCards");
  localStorage.removeItem("globalId");
  localStorage.removeItem("globalusuario");
  localStorage.removeItem("globalcorreo");
  localStorage.removeItem("globalcontra");
});

$(document).ready(function () {
  $("#saveUpdateBtn").click(function () {
    // Obtener los datos del modal
    var userIdToUpdate = localStorage.getItem("globalId");
    var newUsername = $("#updateUsuario").val();
    var newEmail = $("#updateEmail").val();
    var newPassword = $("#updatePassword").val();

    // Verificar si el nuevo correo electrónico contiene alguna de las palabras clave prohibidas
    if (
      newEmail.indexOf("VIP.com") !== -1 ||
      newEmail.indexOf("ADMIN.com") !== -1 ||
      newEmail.indexOf("JEFE.com") !== -1
    ) {
      // Mostrar error en la consola
      console.log({
        error: "error papito",
        message: "No intentes estafarnos papito.",
      });
      // Mostrar alerta al usuario
      alert("No intentes estafarnos papito.");
      // Salir de la función para evitar que se guarden los cambios
      return;
    }

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
        if (
          response.status === "success" &&
          !newEmail.includes("VIP.com") &&
          !newEmail.includes("ADMIN.com") &&
          !newEmail.includes("JEFE.com")
        ) {
          console.log({
            icon: "success",
            title: "¡Usuario actualizado exitosamente!",
            showConfirmButton: false,
            timer: 1500,
          });
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
  });
});

$("#confirmDeleteBtn").click(function () {
  var userId = localStorage.getItem("globalId");
  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    $.ajax({
      url: "http://localhost:9010/web/eliminar-usuario/",
      method: "POST",
      data: { userId: userId },
      success: function (response) {
        if (response.status === "success") {
          console.log({
            icon: "success",
            title: "¡Usuario eliminado exitosamente!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log({
            icon: "error",
            title: "Error al eliminar usuario",
            text: response.message,
          });
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": Error al eliminar usuario");
      },
    });
  }
});
