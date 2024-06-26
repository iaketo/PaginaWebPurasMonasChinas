// Abrir el modal cuando se hace clic en el enlace
document.querySelector('.vip-button').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'block';
  });
  
  // Cerrar el modal cuando se hace clic en el botón de cierre (x)
  document.getElementById('btn secondary').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
  });
  
  // Cerrar el modal cuando se hace clic fuera del contenido
  window.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
  