document.addEventListener("DOMContentLoaded", function () {
  const modalAgregarManga = document.getElementById("ModalAgregarManga");
  const agregarMangaBtn = document.getElementById("AgregarManga");
  const closeModal = modalAgregarManga.querySelector(".close");
  const cancelarBtn = modalAgregarManga.querySelector(".cancelar");
  const formAgregarManga = document.getElementById("FormularioAgregarManga");
  const previewImage = document.getElementById("preview");
  const imagenInput = document.getElementById("imagen");

  // Mostrar modal al hacer clic en "Agregar Manga"
  agregarMangaBtn.addEventListener("click", function () {
    modalAgregarManga.style.display = "block";
  });

  // Cerrar modal al hacer clic en la X
  closeModal.addEventListener("click", function () {
    modalAgregarManga.style.display = "none";
    resetForm(); // Opcional: resetear el formulario al cerrar
  });

  // Cerrar modal al hacer clic en "Cancelar"
  cancelarBtn.addEventListener("click", function () {
    modalAgregarManga.style.display = "none";
    resetForm(); // Opcional: resetear el formulario al cerrar
  });

  // Mostrar vista previa de la imagen seleccionada
  imagenInput.addEventListener("change", function () {
    const file = imagenInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block"; // Mostrar la imagen
      };
      reader.readAsDataURL(file);
    }
  });

  // Resetear el formulario
  function resetForm() {
    formAgregarManga.reset();
    previewImage.src = "#";
    previewImage.style.display = "none";
  }

  // Enviar formulario (aquí puedes agregar lógica adicional para guardar datos)
  formAgregarManga.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar envío del formulario
    // Aquí puedes manejar la lógica para guardar los datos, incluyendo la imagen
    modalAgregarManga.style.display = "none"; // Cerrar modal después de guardar
    resetForm(); // Opcional: resetear el formulario después de guardar
  });
});
