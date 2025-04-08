import { photographerModel } from '../models/photographerModel.js'  
import { photographerTemplate } from '../templates/photographer.js'
import { PhotographerApi } from '../api/api.js';

    class App {
        constructor() {
            this.$photographerWrapper = document.querySelector(".photographer_section")
            this.photographerApi = new PhotographerApi("data/photographers.json")
        }

        async displayData() {
            const photographersData = await this.photographerApi.getPhotographers();

            if (!Array.isArray(photographersData)) {
                throw new TypeError('Expected an array of photographers');
            }
    
            photographersData
            .map(data => new photographerModel(data))
            .map(photographer => new photographerTemplate(photographer))
            .forEach(template => {
                this.$photographerWrapper.appendChild(template.getUserCardDOM());
            });
        } catch(error) {
            console.error("Une erreur est apparu", error)
        }
    }

    const app = new App();
    app.displayData();
