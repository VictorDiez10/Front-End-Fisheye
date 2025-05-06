// Sélection des éléments
const galleryItems = document.getElementsByClassName("card");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");
const lightBoxVideo = document.createElement("video");
const sourceVideo = document.createElement("source");
const lightBoxClose = document.createElement("button"); // ligne 7


console.log(galleryItems)

// Ajout des classes
lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");
lightBoxClose.classList.add("lightbox-close");
lightBoxClose.setAttribute("aria-label", "Fermer la lightbox");
lightBoxClose.innerHTML = "&times;";

// Construction de la lightbox
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxClose); // ligne 19
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
lightBoxContainer.appendChild(lightBoxContent);
lightBoxVideo.appendChild(sourceVideo);
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
    console.log(imageElement)
    if (imageElement) {
        if(lightBoxContent.querySelector("video")) {
            lightBoxContent.replaceChild(lightBoxImg, lightBoxVideo);
        }
        const imageLocation = imageElement.getAttribute("src");
        lightBoxImg.setAttribute("src", imageLocation);
        lightBoxImg.setAttribute("src", imageLocation);
        lightBoxImg.setAttribute("tabindex", "0"); // ligne 47
    } else {
        const videoElement = galleryItems[index].querySelector("video source") 
        if (lightBoxContent.querySelector("img")) {
            lightBoxContent.replaceChild(lightBoxVideo, lightBoxImg);
        } else {
            lightBoxContent.appendChild(lightBoxVideo)
        }
        sourceVideo.setAttribute("src", videoElement.getAttribute("src"))
        sourceVideo.setAttribute("src", videoElement.getAttribute("src")); // ligne 54
    lightBoxVideo.setAttribute("controls", ""); // ligne 55
    lightBoxVideo.setAttribute("tabindex", "0"); // ligne 56

    }
}

// Ouvrir la lightbox avec l'image cliquée
export function currentImage(event) {
    lightBoxContainer.style.display = "block";
    const imageIndex = parseInt(event.currentTarget.getAttribute("data-index"));
    console.log(imageIndex)
    showLightBox(imageIndex);
}


// Ajouter des écouteurs d'événements aux éléments de la galerie
for (let i = 0; i < galleryItems.length; i++) {
    console.log(galleryItems[i])
    galleryItems[i].addEventListener("click", currentImage);
}

lightBoxClose.addEventListener("click", () => { // ligne 84
    lightBoxContainer.style.display = "none";
});


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