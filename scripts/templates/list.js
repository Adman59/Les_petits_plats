import Recipe from "./recipe.js";

class list {
    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    // Pour chaque recette cette fonction créée un nouvel objet "recipe" et ajoute cet objet dans la liste "all"

    hydrate(recipes) {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe)
        })

        this.filtered = this.all;
    }

    // Permet d'injecter les recettes dans la section list__receipts grace a la fonction createRecipeCard dans le fichier recipe.js

    display(recipes) {
        document.querySelector("#receipts__error").style.display = "none";

        let html = '';
        recipes.forEach(recipe => {
            html += recipe.createRecipeCard();
        })

        document.getElementById("list__receipts").innerHTML = html;

        if (recipes.length === 0) {
            document.querySelector("#receipts__error").style.display = "block";
        }
    }

    addFilter(filter) {
        this.filters.push(filter);
        filter.build();
    }

    filter() {
        this.filtered = this.all;
        let search = document.getElementById('searchbar__form__input').value.toLowerCase();

        if (search.length >= 3) {
            console.group(search);
            console.time();
            this.filtered = this.searchAlt(search); //
            console.timeEnd();
            console.groupEnd(search);
        }

        this.filters.forEach(filter => {
            this.filtered = filter.filter(this.filtered);
        })
        this.display(this.filtered);

        this.filters.forEach(filter => {
            filter.collect(this.filtered);
            filter.display();
            filter.showSelection();
            filter.listenForTagSelection();
            filter.listenForTagUnselect();
        })
    }

    // Applique la fonction filter lorsque l'on effectue une recherche dans l'input principal
    listenForSearch() {
        document.getElementById('searchbar__form__input').addEventListener('input', (e) => {
            this.filter();
        })
    }

    // Méthode 2  pour la recherche principale avec la boucle for pour itérer sur les recettes filtrées
    searchAlt(search) {

        let final = [];

        for (let i = 0; i < this.filtered.length; i++) {
            // console.log(i);
            let recipe = this.filtered[i];
            if (this.match(recipe, search)) {
                final.push(recipe);
            }
        }

        return final;
    }

    match(recipe, search) {
        if (recipe.name.toLowerCase().includes(search)) {
            return true;
        }

        if (recipe.description.toLowerCase().includes(search)) {
            return true;
        }

        // console.log(recipe.ingredients);
        for (let j = 0; j < recipe.ingredients.length; j++) {
            let ingredient = recipe.ingredients[j].ingredient.toLowerCase();
            // console.log(ingredient, search, ingredient.includes(search));
            if (ingredient.includes(search)) {
                return true;
            }
        }
        return false;
    }
}

export default list;