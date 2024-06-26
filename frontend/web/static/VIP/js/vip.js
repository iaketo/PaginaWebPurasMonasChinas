// En el otro script que necesita acceder al valor de globalId
$(document).ready(function () {
  // Variables para elementos del DOM
  const mostrarCuentaBtn = $("#MostrarCuentaBtn");
  const actualizarSesionBtn = $("#actualizarSesionBtn");
  const eliminarCuentaBtn = $("#eliminarCuentaBtn");
  const modal = $("#modal");
  const closeModalBtn = $("#closeModalBtn");
  const crudPanel1 = $(".crud-panel1");
  const crudPanel2 = $(".crud-panel2");
  const crudCloseBtn1 = $(".crud-panel1 .crud-close-btn");
  const crudCloseBtn2 = $(".crud-panel2 .crud-close-btn");
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
  $("#VIPBtn").on("click", function () {
    // Redireccionar al usuario a la página deseada
    window.location.href = "http://localhost:9020/web/Mangas/";
    //aqui pondremos el id de la sesion, recordemos que el id de la sesion es definido en el login principal,
    //luego este quedara guardado en el script.js el cual es el principal
  });
  $("#cerrarSesionBtn").on("click", function () {
    localStorage.removeItem("globalProductos");
    localStorage.removeItem("savedCards");
    localStorage.removeItem("globalId");
    localStorage.removeItem("globalusuario");
    localStorage.removeItem("globalcorreo");
    localStorage.removeItem("globalcontra");
  });

  // Función para mostrar la ventana modal
  function mostrarModal(datos) {
    $("#modal-body").html(`
      <p><strong>ID:</strong> ${datos.id}</p>
      <p><strong>Usuario:</strong> ${datos.usuario}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Contraseña:</strong> ${datos.password}</p>
    `);
    modal.css("display", "block");
  }

  // Event listener para mostrar los datos del usuario en la ventana modal
  mostrarCuentaBtn.on("click", function () {
    mostrarModal(usuarioDatos);
  });

  // Event listener para cerrar la ventana modal
  closeModalBtn.on("click", function () {
    modal.css("display", "none");
  });

  // Event listener para abrir el panel CRUD 1
  actualizarSesionBtn.on("click", function () {
    crudPanel1.removeClass("hidden");
    crudPanel2.addClass("hidden");
  });

  // Event listener para abrir el panel CRUD 2
  eliminarCuentaBtn.on("click", function () {
    crudPanel2.removeClass("hidden");
    crudPanel1.addClass("hidden");
  });

  // Event listener para cerrar el panel CRUD 1
  crudCloseBtn1.on("click", function () {
    crudPanel1.addClass("hidden");
  });

  // Event listener para cerrar el panel CRUD 2
  crudCloseBtn2.on("click", function () {
    crudPanel2.addClass("hidden");
  });

  // Event listener para abrir y cerrar el sidebar
  $("#openSidebarBtn").on("click", function () {
    const sidebar = $("#sidebar");
    const sidebarOpen = sidebar.css("right") === "0px";
    sidebar.css("right", sidebarOpen ? "-250px" : "0");
  });

  // Cierra el sidebar si se hace clic fuera de él
  $(document).on("click", function (event) {
    const sidebar = $("#sidebar");
    const sidebarBtn = $("#openSidebarBtn");
    const sidebarOpen = sidebar.css("right") === "0px";
    if (
      sidebarOpen &&
      !sidebar.is(event.target) &&
      !sidebarBtn.is(event.target) &&
      sidebar.has(event.target).length === 0
    ) {
      sidebar.css("right", "-250px");
    }
  });
});
$(document).ready(function () {
  $("#potito").click(function () {
    // Obtener los datos del modal
    var userIdToUpdate = localStorage.getItem("globalId");
    var newUsername = $("#username1").val();
    var newEmail = $("#email1").val();
    var newPassword = $("#contra1").val();

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
          window.alert("Usuario actualizado exitosamente...");
          window.alert(
            "Vuelva a iniciar sesion para ver el usuario actualizado..."
          );
          console.log({
            icon: "success",
            title: "¡Usuario actualizado exitosamente!",
            showConfirmButton: false,
            timer: 1500,
          });

          $("#modalActualizarUsuario").modal("hide"); // Ocultar el modal después de la actualización
        } else {
          console.log({
            icon: "error",
            title: "Error al actualizar usuario",
            text: response.message,
          });
          window.alert("Usuario no actualizado...");
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": Error al actualizar usuario");
        window.alert("xd");
      },
    });
  });
});

$("#DeleteProfileForm2").on("click", ".crud-btn", function (e) {
  e.preventDefault();
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
          window.alert("¡Usuario eliminado exitosamente!");
        } else {
          console.log({
            icon: "error",
            title: "Error al eliminar usuario",
            text: response.message,
          });
          window.alert("Error al eliminar usuario");
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": Error al eliminar usuario");
      },
    });
  }
});
