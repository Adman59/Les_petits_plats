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

const buttonFilterIngredients = document.querySelector(".ingredient");

console.log(buttonFilterIngredients);

buttonFilterIngredients.addEventListener("click", (e) => {
    document.querySelector(".filter__custom").classList.toggle('show-dropdown');
})


//----------------------------------------------------------------
// Ajout de la liste de tous les ingrédients dans l'input ingrédients

const inputIngredient = document.querySelector(".filter__custom__list");


const listOfAllIngredients = recipes.map((recipe) => {
    const recipeCard = new RecipesCard(recipe)
    return recipeCard.createListOfIngredients()
})

const listOfUniqueIngredients = [...new Set(listOfAllIngredients)]

inputIngredient.innerHTML = listOfUniqueIngredients.join("");


//----------------------------------------------------------------
// Ajout de la liste de tous les appareils dans l'input appareils