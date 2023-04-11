import { recipes } from '../data/recipes.js';
import { RecipesCard } from '../scripts/templates/cardRecipe.js';

console.log(recipes);
console.log(RecipesCard);

console.table(recipes);

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

    allRecipeCard.forEach((card) => {
        let text = card.textContent;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    })
}