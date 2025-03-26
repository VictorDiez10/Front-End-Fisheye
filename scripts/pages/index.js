
    
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        try {
            const response = await fetch('/data/photographers.json')

            if (!response.ok) {
                throw new Error('La requête à echoué avec un statut'+ response.status)
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Une erreur s'est produite")
        }
        
        // et bien retourner le tableau photographers seulement une fois récupéré
    
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
