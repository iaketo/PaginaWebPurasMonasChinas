document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menu-btn");
  var closeBtn = document.getElementById("close-btn");
  var sidebar = document.getElementById("sidebar");

  menuBtn.addEventListener("click", function () {
    sidebar.style.right = "0px";
    menuBtn.style.display = "none"; // Oculta el botón de menú al abrir el sidebar
  });

  closeBtn.addEventListener("click", function () {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    sidebar.style.right = "-250px";
    menuBtn.style.display = "block"; // Vuelve a mostrar el botón de menú al cerrar el sidebar
  });
});

const cerrarSesion = document.getElementById('cerrar-sesion');
cerrarSesion.addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem("globalProductos");
  localStorage.removeItem("savedCards");
  localStorage.removeItem("globalId");
  localStorage.removeItem("globalusuario");
  localStorage.removeItem("globalcorreo");
  localStorage.removeItem("globalcontra");
  window.location.href = "http://localhost:9020/web/inicio_sesion/";
});