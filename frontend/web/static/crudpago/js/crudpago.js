console.log("cargado");

// Obtener elementos del DOM
const addCardForm = document.querySelector('.add-card-section form');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal-close');
const editForm = document.getElementById('edit-form');
const cardsBody = document.getElementById('cards-body');
const saveMessage = document.getElementById('save-message');
const productList = document.getElementById('product-list');
const totalAmount = document.getElementById('total-amount');
const payButton = document.getElementById('pay-button');

// Cargar productos del carrito desde localStorage
function loadCartProducts() {
    const cartProductsJson = localStorage.getItem('globalProductos');
    const cartProductsArray = cartProductsJson ? JSON.parse(cartProductsJson) : [];

    productList.innerHTML = ''; // Limpiar la lista de productos
    let total = 0;

    cartProductsArray.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${parseFloat(product.price).toFixed(2)}`;
        productList.appendChild(listItem);
        total += parseFloat(product.price);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Cargar tarjetas de pago guardadas desde localStorage
function loadCards() {
    const cardsJson = localStorage.getItem('savedCards');
    const cardsArray = cardsJson ? JSON.parse(cardsJson) : [];
    
    cardsBody.innerHTML = ''; // Limpiar la tabla antes de agregar las tarjetas
    
    cardsArray.forEach((card, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>**** **** **** ${card.card_number.slice(-4)}</td>
            <td>${card.expiration_date}</td>
            <td>***</td>
            <td>
                <button class="btn-edit" data-index="${index}">Editar</button>
                <button class="btn-delete" data-index="${index}">Eliminar</button>
            </td>
        `;
        cardsBody.appendChild(row);
    });

    togglePayButton(); // Mostrar u ocultar el botón de pagar
}

// Guardar una nueva tarjeta
function addCard(event) {
    event.preventDefault();
    const cardNumber = addCardForm.card_number.value;
    const expirationDate = addCardForm.expiration_date.value;
    const cvv = addCardForm.cvv.value;

    const newCard = {
        card_number: cardNumber,
        expiration_date: expirationDate,
        cvv: cvv
    };

    let cardsArray = JSON.parse(localStorage.getItem('savedCards')) || [];
    cardsArray.push(newCard);
    localStorage.setItem('savedCards', JSON.stringify(cardsArray));

    addCardForm.reset();
    loadCards();
    togglePayButton(); // Mostrar el botón de pagar
}

// Eliminar una tarjeta
function deleteCard(index) {
    let cardsArray = JSON.parse(localStorage.getItem('savedCards')) || [];
    cardsArray.splice(index, 1);
    localStorage.setItem('savedCards', JSON.stringify(cardsArray));
    loadCards();
    togglePayButton(); // Mostrar u ocultar el botón de pagar
}

// Mostrar el modal para editar una tarjeta
function showEditModal(index) {
    let cardsArray = JSON.parse(localStorage.getItem('savedCards')) || [];
    const card = cardsArray[index];
    document.getElementById('edit_card_number').value = card.card_number;
    document.getElementById('edit_expiration_date').value = card.expiration_date;
    document.getElementById('edit_cvv').value = card.cvv;
    editForm.dataset.index = index;
    modal.style.display = 'block';
}

// Guardar los cambios de la tarjeta editada
function saveEditCard(event) {
    event.preventDefault();
    const index = editForm.dataset.index;
    let cardsArray = JSON.parse(localStorage.getItem('savedCards')) || [];
    cardsArray[index] = {
        card_number: editForm.edit_card_number.value,
        expiration_date: editForm.edit_expiration_date.value,
        cvv: editForm.edit_cvv.value
    };
    localStorage.setItem('savedCards', JSON.stringify(cardsArray));

    saveMessage.style.display = 'block';
    saveMessage.classList.add('show-message');
    setTimeout(() => {
        saveMessage.style.display = 'none';
        hideModal();
        loadCards();
    }, 3000);
}

// Función para mostrar u ocultar el botón de pagar
function togglePayButton() {
    const cardsArray = JSON.parse(localStorage.getItem('savedCards')) || [];
    if (cardsArray.length > 0) {
        payButton.style.display = 'block';
    } else {
        payButton.style.display = 'none';
    }
}

// Evento para agregar una nueva tarjeta
addCardForm.addEventListener('submit', addCard);

// Evento para guardar cambios al editar
editForm.addEventListener('submit', saveEditCard);

// Delegación de eventos para editar y eliminar tarjetas
cardsBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-edit')) {
        const index = event.target.dataset.index;
        showEditModal(index);
    } else if (event.target.classList.contains('btn-delete')) {
        const index = event.target.dataset.index;
        deleteCard(index);
    }
});

// Cargar tarjetas y productos al iniciar
loadCards();
loadCartProducts();

// Funciones para manejar el modal
function hideModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', hideModal);

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        hideModal();
    }
});
// Obtener el botón de pagar

// Función para redirigir al usuario a la URL deseada
function redirectToURL() {
    // URL a la que deseas redirigir al usuario
    const url = "https://youtu.be/gOwuSqeb4Uc?t=40";
    // Redirigir al usuario a la URL
    window.location.href = url;
}

// Agregar un event listener para el botón de pagar
payButton.addEventListener('click', redirectToURL);
