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
    return ingredients.sort();
}

function createIngredientsList(ingredients) {
    return ingredients
        .map((ingredient) => {
            return `<li class="filter__custom__item">${ingredient}</li>`;
        })
        .join("");
}

//-----------------------------------------------------------------


function getUstensils() {
    const ustensiles = [];

    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (!ustensiles.includes(ustensil.toLowerCase())) {
                ustensiles.push(ustensil.toLowerCase());
            }
        });
    });

    return ustensiles.sort();
}

function createUstensilsList(ustensils) {
    return ustensils
        .map((ustensil) => {
            return `<li class="filter__custom__item">${ustensil}</li>`;
        })
        .join("");
}


//----------------------------------------------------------------
// Fonctionnalité de la barre de recherche principale avec Filter qui met à jour la liste des dropdown :


const searchInput = document.querySelector("#searchbar__form__input");
const ingredientsListContainer = document.querySelector(".ingredient .filter__custom__list");
const ustensilsListContainer = document.querySelector(".ustensils .filter__custom__list");


searchInput.addEventListener("input", filterList);

const ingredients = getIngredients(recipes);
const ingredientsList = createIngredientsList(ingredients);
ingredientsListContainer.innerHTML = ingredientsList;

const ustensils = getUstensils(recipes);
const ustensilsList = createUstensilsList(ustensils);
ustensilsListContainer.innerHTML = ustensilsList;

function filterList() {
    const filter = searchInput.value.toLowerCase();
    const recipesDomElements = Array.from(document.querySelectorAll(".card"));
    let filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(filter) ||
        recipe.description.toLowerCase().includes(filter)
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

        const ingredients = getIngredients(filteredRecipes);
        const ingredientsList = createIngredientsList(ingredients);
        ingredientsListContainer.innerHTML = ingredientsList;

        const ustensils = getUstensils(filteredRecipes);
        const ustensilsList = createUstensilsList(ustensils);
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
    dropdownButton.addEventListener("click", () => {
        dropdownButton.classList.toggle("show-dropdown");
    });
};

addToggleDropdownListener(".ingredient");
addToggleDropdownListener(".appareils");
addToggleDropdownListener(".ustensils");