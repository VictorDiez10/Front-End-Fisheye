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
        throw new Error('Method createMediaCard() must be implemented');
    }
}

export class ImageMediaCard extends MediaTemplate {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card-all';
        card.innerHTML = `
                <div class="card" data-index="">
                    <img src="./assets/images/${this.photographerName}/${this.media.image}" alt="${this.media.title}" class="card-img"  role="img">
                </div>
                <div class="card-body">
                    <span class="card-title">${this.media.title}</span>
                    <div class="card-likes">
                        <span class="likes" data-liked="false">
                                <span class="likes-count">${this.media.likes}</span>
                            <i class="fa-solid fa-heart like-icon" role="button" aria-label="Liker ce média" tabindex="0"></i>
                        </span>
                    </div>
                </div>
            `;
        return card;
    }
}

export class VideoMediaCard extends MediaTemplate {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card-all';
        card.innerHTML = `
            <div class="card" data-index="">
                <video controls class="card-video" tabindex="0" aria-label="${this.media.title}">
                    <source src="./assets/images/${this.photographerName}/${this.media.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
                <div class="card-body">
                    <span class="card-title">${this.media.title}</span>
                    <div class="card-likes">
                        <span class="likes" data-liked="false">
                                <span class="likes-count">${this.media.likes}</span>
                            <i class="fa-solid fa-heart like-icon" role="button" aria-label="Liker ce média" tabindex="0"></i>
                        </span>
                    </div>
                </div>
            `;
        return card;
    }
}
