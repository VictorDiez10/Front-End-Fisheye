const modal = document.getElementById("contact_modal");
export function displayModal() {
	lastFocusedElement = document.activeElement;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    const firstInput = modal.querySelector("input, textarea, button, [tabindex]:not([tabindex='-1'])");
    if (firstInput) firstInput.focus();

    document.addEventListener("keydown", trapTabKey);
    document.addEventListener("keydown", handleEscape);
}

export function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    if (lastFocusedElement) lastFocusedElement.focus();

    document.removeEventListener("keydown", trapTabKey);
    document.removeEventListener("keydown", handleEscape);
}

function handleEscape(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

function trapTabKey(e) {
    if (e.key !== "Tab") return;

    const focusableElements = modal.querySelectorAll("input, textarea, button, [tabindex]:not([tabindex='-1'])");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    } else { // Tab
        if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
});

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const textarea = document.getElementById("message");
const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        validate();
    });
  } 

let firstNameChecked;
let lastChecked;
let emailChecked;
let textareaChecked;
let lastFocusedElement;


function validate() {
        if(firstName.value.length < 2 || firstName.value === null || firstName.value === "") {
            setError(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.")
            firstNameChecked = false
        } else {
        setSuccess(firstName)
        firstNameChecked = true
        }
        
        if(lastName.value.length < 2 || lastName.value === null || lastName.value === "") {
            setError(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
            lastChecked = false
        } else {
            setSuccess(lastName)
            lastChecked = true
        }
        
        const isEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
        if (!isEmail.test(email.value) || email.value === null || email.value === "") {
            setError(email, "Entrez une adresse mail valide")
            emailChecked = false
        } else {
            setSuccess(email)
            emailChecked = true
        }

        if(textarea.value.length < 15 || textarea.value === null || textarea.value === "") {
            setError(textarea, "Veuillez entrer 15 caractères ou plus pour le message.")
            textareaChecked = false
        } else {
            setSuccess(textarea)
            textareaChecked = true
        }

        allSuccess()
}

function allSuccess () {

    if(firstNameChecked && lastChecked && emailChecked && textareaChecked) {
        modal.style.display = "none"
    }
}

const setError = (input, message) => {
    const formData = input.parentElement;
    const small = formData.querySelector("small");
    formData.className = "formData error";
    small.innerText = message;
}

  //Fonction pour gérer les succès lors du formulaire

function setSuccess(input) {
    const formData = input.parentElement;
    formData.className = "formData success";
}
