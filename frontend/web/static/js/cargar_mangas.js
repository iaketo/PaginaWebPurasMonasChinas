document.addEventListener('DOMContentLoaded', function() {
  const obtenerMangasURL = 'http://localhost:9010/web/obtener-mangas/';

  axios.get(obtenerMangasURL)
      .then(function(response) {
          const mangas = response.data;
          const mangaGrid = document.querySelector('.manga-grid');
          
          mangas.forEach(manga => {
              const mangaDiv = document.createElement('div');
              mangaDiv.className = manga.imagen_url.endsWith('.jpg') ? 'manga-item extra-manga' : 'manga-item';
              mangaDiv.id = manga.id;

              mangaDiv.innerHTML = `
                  <img src="${manga.imagen_url}" alt="${manga.nombre}" />
                  <div class="overlay">
                      <p class="manga-title">${manga.nombre}</p>
                      <p class="manga-read">Haz clic para agregar al carrito</p>
                  </div>
              `;

              mangaGrid.appendChild(mangaDiv);

              // Agregar evento de clic a cada manga-item
              mangaDiv.addEventListener('click', function() {
                  const mangaId = manga.id;
                  getMangaData(mangaId);
                  // Incrementar contador del carrito
                  incrementCartCounter();
              });
          });
      })
      .catch(function(error) {
          console.error('Error al obtener los mangas:', error);
      });
});

function getMangaData(mangaId) {
  const formData = new FormData();
  formData.append('id_manga', mangaId);

  fetch('http://localhost:9010/web/cargar-mangas/', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.manga);
      // Aquí puedes hacer lo que necesites con los datos del manga
  })
  .catch(error => {
      console.error('Error al cargar los datos del manga:', error);
  });
}

// Obtener el botón del carrito y el modal
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeModal = document.querySelector(".close");

const cartCount = document.getElementById("cartCount");
let notificationCount = 0;
let isFirstClick = true;

// Función para incrementar el contador del carrito
function incrementCartCounter() {
  notificationCount++;
  cartCount.textContent = `+${notificationCount}`;
  if (isFirstClick) {
      cartCount.style.display = "inline-block";
      isFirstClick = false;
  }
}

// Función para mostrar el modal
function showModal() {
  cartModal.style.display = "block";
}

// Función para ocultar el modal
function hideModal() {
  cartModal.style.display = "none";
}

// Agregar evento de click al botón del carrito
cartButton.addEventListener("click", showModal);

// Agregar evento de click al botón de cierre del modal
closeModal.addEventListener("click", hideModal);

// Agregar evento de click fuera del modal para cerrarlo
window.addEventListener("click", (event) => {
  if (event.target === cartModal) {
      hideModal();
  }
});

// Seleccionar el botón "Vaciar carrito"
const clearCartButton = document.querySelector('.modal-footer button.btn-secondary');

// Agregar evento de click al botón "Vaciar carrito"
clearCartButton.addEventListener('click', () => {
  // Verificar si el carrito ya está vacío
  if (notificationCount === 0) {
      // Mostrar un mensaje indicando que no hay nada que eliminar
      const message = document.createElement('p');
      message.textContent = 'El carrito ya está vacío. Agregue algunos productos para poder vaciarlo.';
      window.alert(message.textContent);

      // Eliminar el mensaje después de 3 segundos
      setTimeout(() => {
          message.remove();
      }, 3000);
  } else {
      // Eliminar todos los items del carrito
      notificationCount = 0;
      cartCount.textContent = '';
      cartCount.style.display = 'none';
      isFirstClick = true;

      // Eliminar los items del carrito en la tabla
      const cartTable = document.getElementById('cart-items');
      while (cartTable.rows.length > 0) {
          cartTable.deleteRow(0);
      }

      // Mostrar un mensaje indicando que el carrito está vacío
      const emptyCartMessage = document.createElement('p');
      emptyCartMessage.textContent = 'El carrito está vacío';
      cartTable.appendChild(emptyCartMessage);

      // Eliminar el mensaje después de 3 segundos
      setTimeout(() => {
          emptyCartMessage.remove();
      }, 3000);
  }
});

// Seleccionar el botón "Seguir comprando"
const continueShoppingButton = document.getElementById('btn-continuar');

// Agregar evento de click al botón "Seguir comprando"
continueShoppingButton.addEventListener('click', () => {
  // Cerrar el modal
  hideModal();
});
