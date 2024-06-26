document.addEventListener("DOMContentLoaded", function () {
	var sidebarOpen = false; // Estado inicial del sidebar
  
	// Función para abrir y cerrar el sidebar
	function toggleSidebar() {
	  var sidebar = document.getElementById("sidebar");
	  if (!sidebarOpen) {
		// Si el sidebar está cerrado, ábrelo
		sidebar.style.right = "0";
		sidebarOpen = true;
	  } else {
		// Si el sidebar está abierto, ciérralo
		sidebar.style.right = "-250px";
		sidebarOpen = false;
	  }
	}
  
	// Asigna la función toggleSidebar al botón de abrir/cerrar el sidebar
	document
	  .getElementById("openSidebarBtn")
	  .addEventListener("click", toggleSidebar);
  
	// Cierra el sidebar si se hace clic fuera de él
	document.addEventListener("click", function (event) {
	  var sidebar = document.getElementById("sidebar");
	  var sidebarBtn = document.getElementById("openSidebarBtn");
	  if (
		sidebarOpen &&
		!sidebar.contains(event.target) &&
		event.target !== sidebarBtn
	  ) {
		sidebar.style.right = "-250px";
		sidebarOpen = false;
	  }
	});
  });
  