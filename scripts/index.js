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

//-- Fonction de recherche du dropdown ingredient :
const inputIngredients = document.querySelector(".filter__custom.ingredient #ingredient");
inputIngredients.addEventListener('input', filterIngredient);

function filterIngredient() {
    console.log("test")
    const filterIngredients = inputIngredients.value.toLowerCase();
    let allLiIngredients = document.querySelectorAll(".filter__custom.ingredient .filter__custom__item");
    allLiIngredients = Array.from(allLiIngredients); // conversion de la NodeList en tableau

    allLiIngredients.forEach((liIngredient) => {
        let text = liIngredient.textContent;
        if (text.toLowerCase().includes(filterIngredients)) {
            liIngredient.style.display = "";
        } else {
            liIngredient.style.display = "none";
        }
    });
}

//-- Fonction de recherche du dropdown appliance :
const inputAppliances = document.querySelector(".filter__custom.appareils #appareils");
inputAppliances.addEventListener('input', filterAppliance);

function filterAppliance() {
    const filterAppliance = inputAppliances.value.toLowerCase();
    let allLiAppliances = document.querySelectorAll(".filter__custom.appareils .filter__custom__item");
    allLiAppliances = Array.from(allLiAppliances); // conversion de la NodeList en tableau

    allLiAppliances.forEach((liIngredient) => {
        let text = liIngredient.textContent;
        if (text.toLowerCase().includes(filterAppliance)) {
            liIngredient.style.display = "";
        } else {
            liIngredient.style.display = "none";
        }
    });
}

//-- Fonction de recherche du dropdown ustensils :
const inputUstensils = document.querySelector(".filter__custom.ustensils #ustensils");
inputUstensils.addEventListener('input', filterUstensil);

function filterUstensil() {
    const filterUstensil = inputUstensils.value.toLowerCase();
    let allLiUstensils = document.querySelectorAll(".filter__custom.ustensils .filter__custom__item");
    allLiUstensils = Array.from(allLiUstensils); // conversion de la NodeList en tableau

    allLiUstensils.forEach((liUstensil) => {
        let text = liUstensil.textContent;
        if (text.toLowerCase().includes(filterUstensil)) {
            liUstensil.style.display = "";
        } else {
            liUstensil.style.display = "none";
        }
    });
}


// Fonctionnalité de la barre de recherche principale qui affiche les recettes correspondantes et qui met à jour automtiquement les listes des 3 dropdonws (ingrédients, appareils et ustensiles)

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

    const updateIngredients = getIngredients(filteredRecipes);
    const ingredientsList = createIngredientsList(updateIngredients);
    ingredientsListContainer.innerHTML = ingredientsList;

    // Fonctionnalité de la barre de recherche principale à partir de 3 caractères
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

        // Ajouter un écouteur d'événement pour fermer la dropdown si l'utilisateur clique n'importe où sur la page en dehors de la dropdown.
        const closeDropdownOnOutsideClick = (event) => {
            if (!event.target.closest(selector)) {
                dropdownButton.classList.remove("show-dropdown");
                dropdownInputs.forEach(input => {
                    input.style.display = "none";
                });
                document.removeEventListener("click", closeDropdownOnOutsideClick);
            }
        };
        if (dropdownButton.classList.contains("show-dropdown")) {
            document.addEventListener("click", closeDropdownOnOutsideClick);
        }
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
// Ajout du tag dans la section tags lors du clic sur un ingrédient/appareil/ustensile

const ingredientElementList = document.querySelectorAll('.ingredient .filter__custom__item');
const applianceElementList = document.querySelectorAll('.appareils .filter__custom__item');
const ustensilsElementList = document.querySelectorAll('.ustensils .filter__custom__item');
const listOfTags = document.querySelector('.tags__list');

//------------------------------------------------------------------

function addTag(text, className) {
    // Création de l'élément li
    const tag = document.createElement('li');
    tag.classList.add('tags__list__item', className);

    // Création de l'élément span avec le texte
    const tagText = document.createElement('span');
    tagText.textContent = text;

    // Création de l'élément button pour supprimer le tag
    const tagDeleteButton = document.createElement('button');
    tagDeleteButton.classList.add('tags__list__item__delete');
    tagDeleteButton.innerHTML = '<i class="fa fa-times-circle-o" aria-hidden="true"></i>';

    // Ajout d'un événement de clic pour supprimer le tag
    tagDeleteButton.addEventListener('click', () => {
        tag.remove();
    });

    // Ajout des éléments span et button dans le li
    tag.appendChild(tagText);
    tag.appendChild(tagDeleteButton);

    // Ajout du li dans la section tags
    listOfTags.appendChild(tag);
}

//------------------------------------------------------------------

// Ajout d'un événement de clic sur chaque élément de la liste d'ingrédients
ingredientElementList.forEach(element => {
    element.addEventListener("click", () => {
        addTag(element.textContent, "ingredient");
        filterList();
    });
});

// Ajout d'un événement de clic sur chaque élément de la liste d'appareils
applianceElementList.forEach(element => {
    element.addEventListener("click", () => {
        addTag(element.textContent, "appareils");
    });
});

// Ajout d'un événement de clic sur chaque élément de la liste d'ustensiles
ustensilsElementList.forEach(element => {
    element.addEventListener("click", () => {
        addTag(element.textContent, "ustensils");
    });
});