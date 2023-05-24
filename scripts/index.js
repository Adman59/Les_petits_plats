import { recipes } from "../../data/recipes.js";
import List from "./templates/list.js";
import IngredientFilter from "./templates/ingredientFilter.js";
import ApplianceFilter from "./templates/applianceFilter.js";
import UstensilFilter from "./templates/ustensilFilter.js";

const list = new List();
list.hydrate(recipes);
list.display(list.all);
list.listenForSearch();
// list.search(); // Si méthode 1 (branche algorytme-1)
list.searchAlt(); // Si méthode 2 (branche algorytme-2)

list.addFilter(new IngredientFilter(list));
list.addFilter(new ApplianceFilter(list));
list.addFilter(new UstensilFilter(list));
console.log(list.filters);
