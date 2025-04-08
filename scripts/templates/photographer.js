export class photographerTemplate {

    /**
     * 
     * @param {Object} photographer
     */

    constructor(photographer) {
        this._photographer = photographer;
    }

    getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.href = `photographer.html?id=${this._photographer.id}`;
        link.setAttribute('role', 'link');
        link.setAttribute('aria-label', `Voir le profil du photographe ${this._photographer.name}`);
        
        link.innerHTML = `
            <div class="portrait">
                <img src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
            </div>
            <h2>${this._photographer.name}</h2>
        <div class="info">
            <p class="city">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="tagline">${this._photographer.tagline}</p>
            <p class="price">${this._photographer.price} €/jour</p>
        `
        
        article.appendChild(link)
        

        return article
    }
}