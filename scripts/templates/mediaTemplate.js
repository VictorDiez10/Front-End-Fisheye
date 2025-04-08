export class MediaTemplate {
    /**
       * Create a MediaCard instance.
       * @param {Object} media - The media data.
       */
    constructor(media, photographerName) {
        this.media = media;
        this.photographerName = photographerName.split(" ")[0]
    }


    createMediaCard() {
        console.log(this.media.image)
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
                <img src="./assets/images/${this.photographerName}/${this.media.image}" alt="${this.media.title}" class="card-img"  role="img">
                <video>
                <source src="./assets/images/${this.photographerName}/${this.media.video}" type="video/mp4" />
                </video>
                <div class="card-body">
                    <span class="card-title">${this.media.title}</span>
                    <div class="card-likes">
                        <span class="likes">${this.media.likes} likes</span>
                    
                    </div>
                </div>
            `;
        return card;
    }
}
