// Sélection des éléments
const galleryItems = document.getElementsByClassName("card");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");
const lightBoxVideo = document.createElement("video");
const sourceVideo = document.createElement("source");
const lightBoxDiv = document.createElement("div");
const lightBoxClose = document.createElement("button");

// Ajout des classes
lightBoxContainer.classList.add("lightbox");
lightBoxContainer.setAttribute("role", "dialog");
lightBoxContainer.setAttribute("aria-label", "Galerie d’images et vidéos");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");
lightBoxDiv.classList.add("lightbox-img");
lightBoxClose.classList.add("lightbox-close");
lightBoxClose.setAttribute("aria-label", "Fermer la lightbox");
lightBoxClose.setAttribute("tabindex", "0");
lightBoxClose.innerHTML = "&times;";
lightBoxVideo.setAttribute("controls", true);
lightBoxImg.setAttribute("alt", "Lighbox-vide")

// Construction de la lightbox
lightBoxDiv.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxDiv);
lightBoxContent.appendChild(lightBoxClose);
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

    // Récupérer l'élément de la galerie
    const galleryItem = galleryItems[index];
    const imageElement = galleryItem.querySelector("img");
    const titleImageElement = galleryItem.querySelector("img"); // Adapter si nécessaire

    // Récupérer le texte descriptif
    
    

    if (imageElement) {
        if (lightBoxDiv.contains(lightBoxVideo)) {
            lightBoxDiv.replaceChild(lightBoxImg, lightBoxVideo);
        }

        const mediaImageAlt = titleImageElement.getAttribute("alt");
        const imageLocation = imageElement.getAttribute("src");
        lightBoxImg.setAttribute("src", imageLocation);
        lightBoxImg.setAttribute("alt", mediaImageAlt); // ✅ Ajout de l'alt
    } else {
        const videoElement = galleryItem.querySelector("video source");
        const mediaVideoAlt = videoElement.getAttribute("alt");

        if (lightBoxDiv.contains(lightBoxImg)) {
            lightBoxDiv.replaceChild(lightBoxVideo, lightBoxImg);
        } else if (!lightBoxDiv.contains(lightBoxVideo)) {
            lightBoxDiv.appendChild(lightBoxVideo);
        }

        const videoSrc = videoElement.getAttribute("src");
        sourceVideo.setAttribute("src", videoSrc);
        lightBoxVideo.setAttribute("aria-label", mediaVideoAlt); // ✅ Ajout de l'aria-label

        lightBoxVideo.load(); // Important pour mettre à jour la source
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

document.addEventListener("keydown", (e) => {
    if (lightBoxContainer.style.display !== "block") return;

    switch (e.key) {
        case "Escape":
            lightBoxContainer.style.display = "none";
            if (!lightBoxVideo.paused) lightBoxVideo.pause();
            break;
        case "ArrowRight":
            nextImage();
            break;
        case "ArrowLeft":
            prevImage();
            break;
        default:
            break;
    }
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
lightBoxClose.addEventListener("click", () => {
    lightBoxContainer.style.display = "none";

    // Stoppe la vidéo si nécessaire
    if (!lightBoxVideo.paused) {
        lightBoxVideo.pause();
    }
});

// Ajouter des écouteurs d'événements pour la navigation et la fermeture
lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);