import { recipes } from '../data/recipes.js';
import { RecipesCard } from '../scripts/templates/cardRecipe.js';

console.log(recipes);
console.log(RecipesCard);


const listOfReceipts = document.querySelector('.list__receipts');

console.log(listOfReceipts);

const recipesDomElements = recipes.map((recipe) => {
    const recipeCard = new RecipesCard(recipe)
    return recipeCard.createCard()
})

listOfReceipts.innerHTML = recipesDomElements.join("");

//----------------------------------------------------------------
// Fonctionnalité de la barre de recherche principale avec Filter :

const searchInput = document.querySelector("#searchbar__form__input");

searchInput.addEventListener("input", filterList);

function filterList() {
    const filter = searchInput.value.toLowerCase();
    const allRecipeCard = document.querySelectorAll(".card");

    if (filter.length >= 3) {
        allRecipeCard.forEach((card) => {
            let text = card.textContent;
            if (text.toLowerCase().includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    } else {
        allRecipeCard.forEach((card) => {
            card.style.display = "";
        });
    }
}

//----------------------------------------------------------------
// gestion du click sur les filtres

const addToggleDropdownListener = (selector) => {
    const dropdownButton = document.querySelector(selector);
    dropdownButton.addEventListener("click", () => {
        dropdownButton.classList.toggle("show-dropdown");
    });
};

addToggleDropdownListener(".ingredient");
addToggleDropdownListener(".appareils");
addToggleDropdownListener(".ustensils");


//----------------------------------------------------------------
// Ajout de la liste de tous les ingrédients dans l'input ingrédients

const inputIngredient = document.querySelector(".filter__custom__list");


// Extraire tous les ingrédients de toutes les recettes
const allIngredients = recipes.flatMap((recette) => {
    return recette.ingredients.map((ingredient) => {
        if (typeof ingredient === 'object') {
            return ingredient.ingredient.toLowerCase();
        } else {
            return ingredient.toLowerCase();
        }
    });
});
// Éliminer les doublons en créant un Set (qui ne permet pas les doublons) puis en le convertissant en tableau
const uniqueIngredients = Array.from(new Set(allIngredients));

// Afficher les ingrédients dans la liste déroulante
inputIngredient.innerHTML = uniqueIngredients.map((ingredient) => `<li class="filter__custom__list__item">${ingredient}</li>`).join('');


//----------------------------------------------------------------
// Ajout de la liste de tous les appareils dans l'input appareils


const inputAppareils = document.querySelector(".appareils .filter__custom__list");

console.log(inputAppareils);

// Extraire tous les appareils de toutes les recettes sans doublons
const allAppliances = [...new Set(recipes.flatMap((recette) => {
    if (typeof recette.appliance === 'string') {
        return [recette.appliance.toLowerCase()];
    } else {
        return recette.appliance.map((appliance) => {
            if (typeof appliance === 'string') {
                return appliance.toLowerCase();
            }
        });
    }
}).filter(Boolean))];

console.log(allAppliances);

// Afficher les appareils dans la liste déroulante
inputAppareils.innerHTML = allAppliances.map((appliance) => `<li class="filter__custom__list__item">${appliance}</li>`).join('');



//----------------------------------------------------------------
// Ajout de la liste de tous les ustensiles dans l'input ustensils


const inputUstensils = document.querySelector(".ustensils .filter__custom__list");

console.log(inputUstensils);

// Extraire tous les ustensiles de toutes les recettes
// Extraire tous les ustensiles de toutes les recettes
const allUstensils = recipes.flatMap((recette) => {
    if (typeof recette.ustensils === 'string') {
        return [recette.ustensils.toLowerCase()];
    } else {
        return recette.ustensils.map((ustensil) => {
            if (typeof ustensil === 'string') {
                return ustensil.toLowerCase();
            }
        });
    }
}).filter((ustensil, index, self) => {
    return index === self.indexOf(ustensil);
});

// Afficher les ustensiles dans la liste déroulante
inputUstensils.innerHTML = allUstensils.map((ustensil) => `<li class="filter__custom__list__item">${ustensil}</li>`).join('');

