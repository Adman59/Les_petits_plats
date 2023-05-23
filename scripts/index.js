import { recipes } from "../../data/recipes.js";
import List from "./templates/list.js";
import IngredientFilter from "./templates/ingredientFilter.js";
import ApplianceFilter from "./templates/applianceFilter.js";
import UstensilFilter from "./templates/ustensilFilter.js";

const list = new List();
list.hydrate(recipes);
list.display(list.all);
list.listenForSearch();
list.search();
// console.log(list.all);

list.addFilter(new IngredientFilter(list))
list.addFilter(new ApplianceFilter(list))
list.addFilter(new UstensilFilter(list))
console.log(list.filters)

// let ingFilter = new IngFilter(list);
// ingFilter.build();
// ingFilter.collect();
// ingFilter.display();
// ingFilter.listenForTagSelection();
// ingFilter.listenForInput();


// let applianceFilter = new ApplianceFilter(list);
// applianceFilter.build();
// applianceFilter.display();
// applianceFilter.listenForTagSelection();
// applianceFilter.listenForInput();
