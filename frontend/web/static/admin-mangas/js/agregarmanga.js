const form = document.getElementById('FormularioAgregarManga');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios.post('http://localhost:9010/web/mangas/', formData)
        .then(response => {
            console.log(response.data);
            alert('Manga creado con éxito!');
            // Recargar la página después de 1 segundo (opcional)
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(error => {
            console.error(error);
            alert('Precio exagerado, sea cuidadoso administrador...');
        });
});
