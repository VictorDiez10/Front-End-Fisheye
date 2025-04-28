// Sélection des éléments
const galleryItems = document.getElementsByClassName("card");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");

// Ajout des classes
lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");

// Construction de la lightbox
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
lightBoxContainer.appendChild(lightBoxContent);
document.body.appendChild(lightBoxContainer);


// Cacher la lightbox par défaut
lightBoxContainer.style.display = "none";

// Variable pour suivre l'index actuel
let index = 0;

// Afficher l'image dans la lightbox
function showLightBox(n) {
    // Gérer les limites de l'index
    if (n >= galleryItems.length) {
        index = 0;
    } else if (n < 0) {
        index = galleryItems.length - 1;
    } else {
        index = n;
    }

    // Récupérer l'URL de l'image à partir de l'élément .card
    const imageElement = galleryItems[index].querySelector("img");
    if (imageElement) {
        const imageLocation = imageElement.getAttribute("src");
        lightBoxImg.setAttribute("src", imageLocation);
    } else {
        console.error("Aucune image trouvée dans galleryItems[index]");
    }
}

// Ouvrir la lightbox avec l'image cliquée
export function currentImage(event) {
    lightBoxContainer.style.display = "block";
    const imageIndex = parseInt(event.currentTarget.getAttribute("data-index"));
    showLightBox(imageIndex);
}


// Ajouter des écouteurs d'événements aux éléments de la galerie
for (let i = 0; i < galleryItems.length; i++) {
    console.log(galleryItems[i])
    galleryItems[i].addEventListener("click", currentImage);
}

// Naviguer entre les images
function sliderImage(n) {
    showLightBox(index + n);
}

function prevImage() {
    sliderImage(-1);
}

function nextImage() {
    sliderImage(1);
}

// Fermer la lightbox en cliquant à l'extérieur
function closeLightBox(event) {
    if (event.target === lightBoxContainer) {
        lightBoxContainer.style.display = "none";
    }
}

// Ajouter des écouteurs d'événements pour la navigation et la fermeture
lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);
lightBoxContainer.addEventListener("click", closeLightBox);