export class RecipesCard {
  constructor(recipe) {
    this.name = recipe.name;
    this.time = recipe.time;
    this.ingredients = recipe.ingredients;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
  }

  createIngredientsList() {
    const listOfIngredients = this.ingredients.map((ingredient) => {
      // Si quantity et unit sont undefined, retourne une balise <li> contenant uniquement la propriété ingredient :

      if (ingredient.quantity === undefined && ingredient.unit === undefined) {
        return `<li>${ingredient.ingredient}</li>`
      }

      // Si unit est undefined mais que quantity est défini, retourne une balise <li> contenant la propriété ingredient et la propriété quantity, enveloppée dans une balise span avec la classe card__body__content__ingredients__quantity :

      if (ingredient.unit === undefined) {
        return `<li>${ingredient.ingredient}: <span class="card__body__content__ingredients__quantity">${ingredient.quantity}</span></li>`
      }

      // Si unit et quantity sont tous deux définis, retourne une balise <li> contenant la propriété ingredient, la propriété quantity et la propriété unit, enveloppées dans une balise span avec la classe card__body__content__ingredients__quantity :

      return `<li>${ingredient.ingredient}: <span class="card__body__content__ingredients__quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`
    })

    return listOfIngredients.join("")
  }

  createCard() {
    return `
        <li class="card">
          <div class="card__image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3JMOUovXVGWD3caybYxT3iNM0thIwRvSHA&usqp=CAU">
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
                <ul class="card__body__content__ingredients">
                ${this.createIngredientsList()}
                </ul>
                <p class="card__body__content__description">${this.description}</p>
            </div>
          </div>
        </li>
        `;
  }

}
