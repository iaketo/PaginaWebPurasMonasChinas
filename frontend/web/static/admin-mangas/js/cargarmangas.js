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
