class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;


    }

    createRecipeCard() {
        return `
        <li class="card" id="${this.id}">
            <div class="card__image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3JMOUovXVGWD3caybYxT3iNM0thIwRvSHA&usqp=CAU" alt="photo de la recette">
            </div>
            <div class="card__body">
                <div class="card__body__hero">
                    <h2 class="card__body__hero__title">${this.name}</h2>
                    <div class="card__body__hero__duration">
                        <i class="far fa-clock" id="ingredient-filter-icon"></i>
                        <span>${this.time}</span>
                    </div>
                </div>
                <div class="card__body__content">
                    ${this.renderIngredients(this.ingredients)} 
                    <p class="card__body__content__description">${this.description}</p>
                </div>
            </div>
        </li>`;
    }

    renderIngredients(ingredients) {
        let insertDOM = '<ul class="card__body__content__ingredients">'

        ingredients.forEach((ingredient) => {
            let unit = ingredient.unit ?? '';

            insertDOM += `<li class="filter__custom__item"><strong>${ingredient.ingredient}:</strong> <span class="card__body__content__ingredients__quantity">${ingredient.quantity} ${unit}</span></li>`;
        });

        insertDOM += '</ul>'

        return insertDOM;
    }

}

export default Recipe;