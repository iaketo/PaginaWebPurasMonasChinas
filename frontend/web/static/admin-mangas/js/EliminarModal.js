document.addEventListener("DOMContentLoaded", function () {
  const modalEliminarManga = document.getElementById("ModalEliminarManga");
  const eliminarMangaBtn = document.getElementById("EliminarManga");
  const closeModalEliminar = modalEliminarManga.querySelector(".close");
  const cancelarEliminarBtn = modalEliminarManga.querySelector(".cancelar");
  const formEliminarManga = document.getElementById("FormularioEliminarManga");
  const idMangaInput = document.getElementById("idManga");
  const mangaId = null; // reemplaza con el ID del manga que deseas verificar
  const url = "http://localhost:9010/web/manga-existe/";
  const data = { id: mangaId };
  // Array para almacenar los IDs de mangas eliminados
  const mangasEliminados =
    JSON.parse(localStorage.getItem("mangasEliminados")) || [];

  // Ocultar mangas eliminados al cargar la página
  document.querySelectorAll(".manga-item").forEach((mangaElement) => {
    const idManga = mangaElement.getAttribute("id");
    if (mangasEliminados.includes(idManga)) {
      mangaElement.remove();
    }
  });

  // Mostrar modal al hacer clic en "Eliminar Manga"
  eliminarMangaBtn.addEventListener("click", function () {
    const mangaId = this.getAttribute("data-manga-id");
    idMangaInput.value = mangaId;
    modalEliminarManga.style.display = "block";
    // Llenar campos del formulario con información del manga a eliminar si es necesario
  });

  // Cerrar modal al hacer clic en la X
  closeModalEliminar.addEventListener("click", function () {
    modalEliminarManga.style.display = "none";
    resetFormEliminar(); // Opcional: resetear el formulario al cerrar
  });

  // Cerrar modal al hacer clic en "Cancelar"
  cancelarEliminarBtn.addEventListener("click", function () {
    modalEliminarManga.style.display = "none";
    resetFormEliminar(); // Opcional: resetear el formulario al cerrar
  });

  // Función para resetear el formulario de eliminar
  function resetFormEliminar() {
    formEliminarManga.reset();
  }
  // Función para eliminar el manga de la grilla visualmente
  function eliminarMangaVisualmente(idManga) {
    const mangaElement = document.getElementById(idManga);
    if (mangaElement) {
      mangaElement.remove();
      mangasEliminados.push(idManga); // Agregar el ID del manga eliminado al array
      localStorage.setItem(
        "mangasEliminados",
        JSON.stringify(mangasEliminados)
      );
    }
  }

  // Agregar evento al formulario para eliminar el manga
  formEliminarManga.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Verificar si el campo ID está rellenado
    const idManga = document.getElementById("idManga").value.trim();

    if (idManga === "") {
      alert("Por favor, ingrese el ID del manga para eliminar.");
      return;
    }

    // Obtener el token CSRF
    const csrftoken = document.querySelector(
      "[name=csrfmiddlewaretoken]"
    ).value;

    // Enviar la solicitud AJAX para eliminar el manga
    fetch("http://localhost:9010/web/eliminar-manga/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrftoken,
      },
      body: new URLSearchParams({
        idManga: idManga,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 405) {
            throw new Error(
              "Método no permitido (405): Debes utilizar una solicitud POST"
            );
          } else {
            throw new Error("La respuesta de la red no fue exitosa");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Manejo de la respuesta del servidor aquí

        // Nuevo código para eliminar el elemento del manga de la grilla visualmente
        if (data.success) {
          eliminarMangaVisualmente(idManga);
          alert("Manga eliminado correctamente!");
        } else {
          alert("Error al eliminar manga: ", data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud fetch:", error);
        // Manejo de errores aquí
      });
  });
  // Eliminar el manga de la grilla visualmente al cargar la página
  eliminarMangaVisualmente(mangaId);
});