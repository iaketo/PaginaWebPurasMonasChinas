globalProductos = null;

var cartTable = document.getElementById('cart-items');
function getMangaData(mangaId) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:9010/web/cargar-mangas/', // URL de la función que devuelve los datos del manga
    data: {
      id_manga: mangaId
    },
    success: function (response) {
      console.log(response.manga)

      
    },
    error: function (xhr, status, error) {
      console.log('Error al obtener los datos del manga:', error);
    }
  });
}

// Agregar evento de clic a los divs con la clase manga-item
document.addEventListener('DOMContentLoaded', function () {
  var mangaItems = document.querySelectorAll('.manga-item');
  mangaItems.forEach(function (mangaItem) {
    mangaItem.addEventListener('click', function () {
      var mangaId = mangaItem.id;
      getMangaData(mangaId);
    });
  });
});


const payButton = document.querySelector('.modal-footer button.btn-primary');
payButton.addEventListener('click', (e) => {
  e.preventDefault();
  const cartRows = document.querySelectorAll('#cart-items tr');


  if (cartRows.length === 0) {
    showMessage('El carrito está vacío. Por favor, agregue algún producto antes de proceder al pago.');
  } else {
    console.log('Filas del carrito:');
    cartRows.forEach((row) => {
      console.log(`ID: ${row.cells[0].textContent}, Nombre: ${row.cells[1].textContent}, Precio: ${row.cells[2].textContent}`);
    });
    // Convertir el array de filas en un array de objetos
    const cartRowsArray = Array.from(cartRows);
    const cartProductsArray = cartRowsArray.map(row => {
      const id = row.cells[0].textContent;
      const name = row.cells[1].textContent;
      const price = row.cells[2].textContent;
      return { id, name, price };
    });

    // Convertir el array de objetos en una cadena JSON
    const cartProductsJson = JSON.stringify(cartProductsArray);

    // Guardar la cadena JSON en el localStorage
    localStorage.setItem("globalProductos", cartProductsJson);
    showMessage('Redirigiendo al pago...');
    setTimeout(() => {
      window.location.href = 'http://localhost:9020/web/crudpago/';
    }, 2000); // Redirigir después de 2 segundos
  }
});

function showMessage(message) {
  const notificationContainer = document.getElementById('notification-container');
  const notificationMessage = document.getElementById('notification-message');

  notificationMessage.textContent = message;
  notificationContainer.style.display = 'block';

  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 2000); // Ocultar notificación después de 2 segundos
}
