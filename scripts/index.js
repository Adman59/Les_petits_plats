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


//-----------------------------------------------------------------

function getIngredients(recipes) {
    const ingredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
                ingredients.push(ingredient.ingredient.toLowerCase());
            }
        });
    });


    // On retourne la liste des ingrédients dans l'ordre alphabétique
    return ingredients.sort();
}

// fonction qui va ajouter un li ingrédient dans l'ul du filter__custom correspondant
function createIngredientsList(ingredients) {
    return ingredients
        .map((ingredient) => {
            return `<li class="filter__custom__item">${ingredient}</li>`;
        })
        .join("");
}


//-----------------------------------------------------------------

function getAppliances(recipes) {
    const appareils = [];
    recipes.forEach((recipe) => {
        if (!appareils.includes(recipe.appliance.toLowerCase())) {
            appareils.push(recipe.appliance.toLowerCase());
        }
    });

    // On retourne la liste des appareils dans l'ordre alphabétique
    return appareils.sort();
}

// fonction qui va ajouter un li appareil dans l'ul du filter__custom correspondant
function createAppliancesList(appliance) {
    return appliance
        .map((appliance) => {
            return `<li class="filter__custom__item">${appliance}</li>`;
        })
        .join("");
}

//-----------------------------------------------------------------


function getUstensils(recipes) {
    const ustensils = [];

    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (!ustensils.includes(ustensil.toLowerCase())) {
                ustensils.push(ustensil.toLowerCase());
            }
        });
    });

    // On retourne la liste des ustensiles dans l'ordre alphabétique
    return ustensils.sort();

}

// fonction qui va ajouter un li ustensile dans l'ul du filter__custom correspondant
function createUstensilsList(ustensils) {
    return ustensils
        .map((ustensil) => {
            return `<li class="filter__custom__item">${ustensil}</li>`;
        })
        .join("");
}


//----------------------------------------------------------------

const searchInput = document.querySelector("#searchbar__form__input");
const ingredientsListContainer = document.querySelector(".ingredient .filter__custom__list");
const ustensilsListContainer = document.querySelector(".ustensils .filter__custom__list");
const appliancesListContainer = document.querySelector(".appareils .filter__custom__list");

searchInput.addEventListener("input", filterList);

//----------------------------------------------------------------


// On ajoute les listes des ingrédients, appareils et ustensiles dans les ul correspondants
function updateFilters() {
    const ingredients = getIngredients(recipes);
    const ingredientsList = createIngredientsList(ingredients);
    ingredientsListContainer.innerHTML = ingredientsList;

    const appliances = getAppliances(recipes);
    const appliancesList = createAppliancesList(appliances);
    appliancesListContainer.innerHTML = appliancesList;

    const ustensils = getUstensils(recipes);
    let filteredUstensils = ustensils.filter((ustensil) => {
        return ustensil.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    const ustensilsList = createUstensilsList(filteredUstensils);
    ustensilsListContainer.innerHTML = ustensilsList;
};

updateFilters();


//----------------------------------------------------------------


// Fonctionnalité de la barre de recherche principale qui affiche les recettes correspondantes et qui met à jour automtiquement les listes des 3 dropdows (ingrédients, appareils et ustensiles)

function filterList() {
    const filter = searchInput.value.toLowerCase();
    const recipesDomElements = Array.from(document.querySelectorAll(".card"));

    // Recettes triées
    let filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(filter) ||
        recipe.description.toLowerCase().includes(filter) ||
        recipe.appliance.toLowerCase().includes(filter) ||
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(filter)) ||
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(filter))
    );

    if (filter.length >= 3) {
        recipesDomElements.forEach((card) => {
            let text = card.textContent;
            if (text.toLowerCase().includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });

        const updateIngredients = getIngredients(filteredRecipes);
        const ingredientsList = createIngredientsList(updateIngredients);
        ingredientsListContainer.innerHTML = ingredientsList;

        const updateAppliances = getAppliances(filteredRecipes);
        const appliancesList = createAppliancesList(updateAppliances);
        appliancesListContainer.innerHTML = appliancesList;

        const updateUstensils = getUstensils(filteredRecipes);
        const ustensilsList = createUstensilsList(updateUstensils);
        ustensilsListContainer.innerHTML = ustensilsList;


    } else {
        recipesDomElements.forEach((card) => {
            card.style.display = "";
        });
        const ingredients = getIngredients(recipes);
        const ingredientsList = createIngredientsList(ingredients);
        ingredientsListContainer.innerHTML = ingredientsList;

        const ustensils = getUstensils(recipes);
        const ustensilsList = createUstensilsList(ustensils);
        ustensilsListContainer.innerHTML = ustensilsList;
    }
}



//----------------------------------------------------------------
// gestion du click sur les filtres

const addToggleDropdownListener = (selector) => {
    const dropdownButton = document.querySelector(selector);
    const dropdownInputs = document.querySelectorAll(selector + " input");
    dropdownButton.addEventListener("click", () => {
        dropdownButton.classList.toggle("show-dropdown");
        dropdownInputs.forEach(input => {
            input.style.display = dropdownButton.classList.contains("show-dropdown") ? "block" : "none";
        });
    });
    dropdownInputs.forEach(input => {
        input.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
};

addToggleDropdownListener(".ingredient");
addToggleDropdownListener(".appareils");
addToggleDropdownListener(".ustensils");


//----------------------------------------------------------------
// Moteur de recherche dans le dropdown Ingredients

const inputIngredients = document.querySelector(".filter__custom input");

inputIngredients.addEventListener('input', filterIngredient);

function filterIngredient() {
    const filterIngredients = inputIngredients.value.toLowerCase();

    // si une valeur rentrée dans le champ input correspond avec un ingrédient dans la liste


    // alors tu m'affiches les ingrédients correspondants

    // sinon tu ne m'affiches rien


};