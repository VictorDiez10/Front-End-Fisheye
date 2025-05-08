import { displayModal } from "../utils/contactForm.js"

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


    getUserInfo() {
        const card = document.createElement("article");
        card.className = "photograph-card";
        card.innerHTML = ` 
        <div class="card-content">
                <h1 class="content-title">${this._photographer.name}</h1>
                <p class="content-country">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="content-citation">${this._photographer.tagline}</p>
            </div>
            <button class="contact_button">Contactez-moi</button>
            <img src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}" class="photographer-picture" role="img">
            <div class="content-price-likes">
                <div class="content-likes">
                    <span id="total-likes">0</span>
                    <i class="fa-solid fa-heart"></i>
                </div>
                <div class="content-price">${this._photographer.price} € /jour</div>
            </div>
        `

        const buttonOpener = card.querySelector('.contact_button');
    buttonOpener.addEventListener('click', () => {
        displayModal();
    });
        return card
    }
}