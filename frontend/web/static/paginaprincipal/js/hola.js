$(document).ready(function () {
    // Verificar si hay un nombre de usuario almacenado en el almacenamiento de sesión del navegador
    var username = localStorage.getItem("globalusuario");
    $("#user-info").text("Bienvenido, " + username);
  });