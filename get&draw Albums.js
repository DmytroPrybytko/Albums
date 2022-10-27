let dataService = {
    url: 'https://jsonplaceholder.typicode.com/photos',

    get getAlbums() {
       return fetch(this.url)
            .then(response => response.json())
    }
}

/* class Album {
    constructor(data) {
        this.title, this.url, this.thumbnailUrl, this.id = data;
    }
} */

class ViewAlbum {
    constructor (album) {
        this.album = album
        this.div = null;
    }

    createDiv(domElement) {
        this.div = document.createElement('div');

        this.div.classList.add('album');
        this.div.innerHTML += `<img src="${this.album.thumbnailUrl}" alt="" data-full-image="${this.album.url}">`;
        this.div.innerHTML += `<p><b>id: </b>${this.album.id}</p>`;
        this.div.innerHTML += `<p><b>Title: </b>${this.album.title}</p>`;
        this.div.dataset.id = this.album.id;
        
        domElement.append(this.div);
    }
}

class AlbumListView {
    domElement;
    dataAlbums;

    constructor (domElement) {
        this.domElement = domElement;
        this.dataAlbums = dataService;
    }

    #drawList(albumElements) {
        this.domElement.innerHTML = '';
        albumElements.forEach(album => {
            album.createDiv(this.domElement);
        })
        this.fullImageRender();
    }

    renderAll() {
        let albumElements = [];
        this.dataAlbums.getAlbums.then(albums => {
            albums.forEach(album =>
                 albumElements.push(new ViewAlbum(album)));
            this.#drawList(albumElements)
        })
    }

    fullImageRender() {
        let id;
        this.domElement.addEventListener('click', (e) => {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                        width=600,height=600,left=100,top=100`;
            let fullImageUrl = e.target.dataset.fullImage;

            open(fullImageUrl, 'Full-size image', params)
           
            //console.log(e.target.dataset.id);
        })
    }
}

let albumPlaceholder = document.querySelector('#albumsPlaceHolder')

let albumListView = new AlbumListView(albumPlaceholder);

window.addEventListener("load", function () {
    albumListView.renderAll();
});







