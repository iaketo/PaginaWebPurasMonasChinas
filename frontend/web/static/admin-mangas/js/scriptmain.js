 // Función para redireccionar a la página principal VIP
 function redirectToMANGAS() {
    window.location.href = "https://inmanga.com/";
  }
  function redirectToPPage() {
    window.location.href = "http://localhost:9020/web/PagPrincipal/";
  }
  function redirectTocrudVIP() {
    window.location.href = "http://localhost:9020/web/administracion/";
  }
  // Obtener los botones por su ID
  const mangasButton = document.getElementById("mangasButton");
  const vipButton = document.getElementById("vipButton");
  const homeButton = document.getElementById("homeButton");

  // Agregar event listeners para los clics en los botones
  mangasButton.addEventListener("click", redirectToMANGAS);
  cuentaButton.addEventListener("click", redirectTocrudVIP);
  homeButton.addEventListener("click", redirectToPPage);