export class Api {
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        this._url = url;
    }

async get() {
    try {
        const response = await fetch(this._url);
        return await response.json();
    } catch (error) {
        console.log("An error occurred", error);
        return null;
    }
}

    
}


export class PhotographerApi extends Api {
        /**
         * 
         * @param {string} url 
         */
        constructor(url) {
            super(url);
        }
    
        async getPhotographers() {
        const data = await this.get();
        return data ? data.photographers : [];
        }
    }


export class MediaApi extends Api {
            /**
             * 
             * @param {string} url -
             */
            constructor(url) {
            super(url);
            }
        
            async getMedia() {
            const data = await this.get();
            return data ? data.media : [];
            }
        }