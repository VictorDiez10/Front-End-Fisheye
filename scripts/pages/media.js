import { MediaApi, PhotographerApi } from "../api/api.js"
import { MediaModel } from "../models/mediaModel.js"
// import { MediaTemplate } from "../templates/mediaTemplate.js";
import { photographerModel } from "../models/photographerModel.js";
import { photographerTemplate } from "../templates/photographer.js";
import { MediaFactory } from "../factories/mediaFactory.js";
import { currentImage } from "./lightBox.js";


function updateTotalLikes(mediaList) {
    const totalLikes = mediaList.reduce((sum, media) => sum + media.likes, 0);
    document.getElementById('total-likes').textContent = totalLikes;
}

function insertSortDropdown() {
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'sort-wrapper';
    dropdownWrapper.innerHTML = `
        <label for="sort-select" class="sort-label">Trier par</label>
        <select id="sort-select" aria-label="Trier les médias" class="sort-select">
            <option value="popularite">Popularité</option>
            <option value="date">Date</option>
            <option value="titre">Titre</option>
        </select>
    `;

    const header = document.querySelector('.photograph-header');
    header.insertAdjacentElement('afterend', dropdownWrapper);
}

function setupSorting(mediaList, photographer) {
    const select = document.getElementById('sort-select');
    const mediaWrapper = document.querySelector(".media_section");

    const sortAndDisplay = () => {
        const value = select.value;
        let sorted = [...mediaList];

        switch (value) {
            case 'popularite':
                sorted.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'titre':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        mediaWrapper.innerHTML = '';
        displayMedia(sorted, photographer);
    };

    select.addEventListener('change', sortAndDisplay);
    sortAndDisplay();
}


export class mediaPhotographer {
    constructor() {
        this.$mediaWrapper = document.querySelector(".media_section")
        this.mediaApi = new MediaApi("data/photographers.json")
        this.photographerApi = new PhotographerApi("data/photographers.json")
        this.$photographerWrapper = document.querySelector(".photograph-header")
    }

    async fetchMedia() {
        try {
            const params = window.location.search;
            const searchParams = new URLSearchParams(params) 
            const photographerID = searchParams.get("id")
            const photographerIDNumber = +photographerID

            const photographersData = await this.photographerApi.getPhotographers();
            const photographer = photographersData.find(p => p.id === photographerIDNumber);
            if(photographer) {

                const photographerModelInstance = new photographerModel(photographer);
            const photographerTemplateInstance = new photographerTemplate(photographerModelInstance);
            this.$photographerWrapper.appendChild(photographerTemplateInstance.getUserInfo());
            insertSortDropdown();


                const mediaData = await this.mediaApi.getMedia();
                if (!Array.isArray(mediaData)) {
                    throw new TypeError('Expected an array of media');
                }

                const photographerMedia = mediaData.filter(media => media.photographerId === photographerIDNumber)
                displayMedia(photographerMedia, photographer);
                setupSorting(photographerMedia, photographer);
                updateTotalLikes(photographerMedia);
                
        }} catch (error) {
            console.error("Une erreur est apparu", error)
        }
    }

}


function displayMedia(photographerMedia, photographer) {
    
    const mediaWrapper = document.querySelector(".media_section");
    photographerMedia
    .map(data => new MediaModel(data))
    .forEach((media, index) => {
        const mediaCard = MediaFactory.createMediaCard(media, photographer.name);
        mediaCard.photographerName = photographer.name.split(" ")[0];
        const mediaElement = mediaCard.createMediaCard();
        console.log(mediaElement)
        mediaElement.querySelector('.card').setAttribute('data-index', index);
        mediaElement.querySelector('.card').addEventListener("click", (event)=> {
            currentImage(event)
        });
        const cardElement = mediaElement.querySelector('.card');
        cardElement.setAttribute('tabindex', '0'); 
        cardElement.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        currentImage({ currentTarget: cardElement }); 
    }
});

        const likeIcon = mediaElement.querySelector('.like-icon');

        const toggleLike = (event) => {
            const likeWrapper = event.currentTarget.closest('.likes');
            const likeCount = likeWrapper.querySelector('.likes-count');
            const liked = likeWrapper.getAttribute('data-liked') === 'true';

            let currentLikes = parseInt(likeCount.textContent);
            const totalLikesEl = document.querySelector('#total-likes');

            if (!liked) {
                likeCount.textContent = currentLikes + 1;
                totalLikesEl.textContent = parseInt(totalLikesEl.textContent) + 1;
                likeWrapper.setAttribute('data-liked', 'true');
            } else {
                likeCount.textContent = currentLikes - 1;
                totalLikesEl.textContent = parseInt(totalLikesEl.textContent) - 1;
                likeWrapper.setAttribute('data-liked', 'false');
            }
        };

likeIcon.addEventListener('click', toggleLike);

likeIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault(); 
        toggleLike(e);
    }
});
        mediaWrapper.appendChild(mediaElement);
    });
}

const app = new mediaPhotographer();
app.fetchMedia();