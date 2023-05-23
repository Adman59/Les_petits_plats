import Filter from "./filter.js";

class UstensilFilter extends Filter {
    constructor(list) {
        super(list)
        this.name = 'ustensils';
        this.placeholder = 'ustensile';
    }

    collect(recipes) {
        this.all = [];
        recipes.forEach(recipe => {
            // console.log(recipe);
            recipe.ustensils.forEach((ustensil) => {
                // console.log(ustensil);
                let item = ustensil.toLowerCase();
                if (!this.all.includes(item)) {
                    this.all.push(item);
                }
            })
        })
    }

    // trouver toutes les recettes avec tous les ustensiles séléctionnés
    filter(recipes) {
        if (this.selection.length === 0) {
            return recipes;
        }
        return recipes.filter((recipe) => {
            let listUstensils = recipe.ustensils.map((ustensil) =>
                ustensil.toLowerCase()
            );

            let count = 0;

            this.selection.forEach((ustensilSelect) => {
                if (listUstensils.includes(ustensilSelect.toLowerCase())) {
                    count++;
                }
            });

            if (count == this.selection.length) {
                return true;
            }
            return false;
        });

    }
}

export default UstensilFilter;
