import Recipe from "./recipe.js";

class list {
    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    hydrate(recipes) {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe)
        })

        this.filtered = this.all;
    }

    display(recipes) {
        document.querySelector("#receipts__error").style.display = "none";

        let html = '';
        recipes.forEach(recipe => {
            html += recipe.render()
        })

        document.getElementById("list__receipts").innerHTML = html

        if (recipes.length === 0) {
            console.log('test')
            document.querySelector("#receipts__error").style.display = "block";
        }
    }

    addFilter(filter) {
        this.filters.push(filter);
        filter.build()
    }

    filter() {
        this.filtered = this.all;
        let search = document.getElementById('searchbar__form__input').value.toLowerCase();

        if (search.length > 3) {
            console.group(search)
            console.time()
            this.filtered = this.searchAlt(search)
            console.timeEnd()
            console.groupEnd(search)
        }

        this.filters.forEach(filter => {
            // console.log(filter);
            this.filtered = filter.filter(this.filtered);
            // console.log(filter.name ,this.filtered);
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

    listenForSearch() {
        document.getElementById('searchbar__form__input').addEventListener('input', (e) => {
            this.filter()

        })
    }

    search(search) {
        return this.filtered.filter((recipe) => {
            return (
                recipe.name.toLowerCase().includes(search) ||
                recipe.description.toLowerCase().includes(search) ||
                recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(search))
            )
        })

    }

    searchAlt(search) {

        let final = [];

        for (let i = 0; i < this.filtered.length; i++) {
            // console.log(i);
            let recipe = this.filtered[i];
            if (this.match(recipe, search)) {
                final.push(recipe);
            }
        }

        // console.log(final);
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