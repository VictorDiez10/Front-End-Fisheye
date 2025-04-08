import { MediaApi, PhotographerApi } from "../api/api.js"
import { MediaModel } from "../models/mediaModel.js"
// import { MediaTemplate } from "../templates/mediaTemplate.js";
import { photographerModel } from "../models/photographerModel.js";
import { photographerTemplate } from "../templates/photographer.js";
import { MediaFactory } from "../factories/mediaFactory.js";

export class mediaPhotographer {
    constructor() {
        this.$mediaWrapper = document.querySelector(".media_section")
        this.mediaApi = new MediaApi("data/photographers.json")
        this.photographerApi = new PhotographerApi("data/photographers.json")
        this.$photographerWrapper = document.querySelector(".photograph-header")
    }

    async mediaDisplay() {
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

                const mediaData = await this.mediaApi.getMedia();
                if (!Array.isArray(mediaData)) {
                    throw new TypeError('Expected an array of media');
                }

                const photographerMedia = mediaData.filter(media => media.photographerId === photographerIDNumber)
        
                photographerMedia
                .map(data => new MediaModel(data))
                .map(media => {
                    const mediaCard = MediaFactory.createMediaCard(media, photographer.name);
                    mediaCard.photographerName = photographer.name.split(" ")[0];
                    return mediaCard;
                })
                .forEach(template => {
                    this.$mediaWrapper.appendChild(template.createMediaCard())
                });
        }} catch (error) {
            console.error("Une erreur est apparu", error)
        }
    }

        

        
}

const app = new mediaPhotographer();
app.mediaDisplay();