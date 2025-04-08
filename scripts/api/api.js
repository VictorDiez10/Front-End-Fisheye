export class Api {
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        this._url = url;
    }

    async get() {
            return fetch(this._url)
            .then(response => response.json())
            .catch(error => {
                console.log('an error occurs', error);
                return null;
            });
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