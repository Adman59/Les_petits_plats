class Filter {
    constructor(list) {
        this.list = list;
        // une fois que touts les ingrédients sont trouvés, on en fait un tableau
        this.all = []
        // tableau avec tous les tags selectionnés
        this.selection = [];
        // tableau avec tous les tags filtrés
        this.filtered = [];
        this.searchTerm = '';

    }

    async build() {
        await this.dropdown();
        this.buildSelection();
        this.collect(this.list.all);
        this.display();
        // this.showSelection();
        this.openDropdown();
        await this.display();
        await this.listenForTagSelection();
        this.listenForInput();
    }

    buildSelection() {
        document.getElementById('tags__list').innerHTML += `<li class="tags__list__item ${this.name}"></li>`;
    }

    openDropdown() {
        const dropdown = document.querySelector(`.filter__custom.${this.name}`);
        const input = dropdown.querySelector("input");

        dropdown.addEventListener("click", (event) => {
            if (event.target !== input) {
                console.log('on ouvre la box');
                dropdown.classList.toggle("show-dropdown");
                dropdown.querySelector(`.filter__custom__search__span.${this.name}`).style.display = "none";
                dropdown.querySelector(`.filter__custom__list.${this.name}`).style.display = "grid";
                dropdown.querySelector(`.filter__custom.${this.name} .hide-search`).style.display = "block";
                this.listenForTagSelection();
            }
        });

        input.addEventListener("click", (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement au conteneur du dropdown
        });

        // Gestionnaire d'événements pour masquer le dropdown lorsque l'utilisateur clique en dehors
        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("show-dropdown");
                dropdown.querySelector(`.filter__custom.${this.name} .hide-search`).style.display = "none";
                dropdown.querySelector(`.filter__custom__list.${this.name}`).style.display = "none";
                dropdown.querySelector(`.filter__custom__search__span.${this.name}`).style.display = "block";
                this.resetSearch();
                this.display();
                input.style.display = "none"; // Masquer l'input lorsque vous quittez le dropdown
                input.value = ""; // Réinitialiser la valeur de l'input
            }
        });
    }

    // Permets d'afficher les ingrédients/appareils/ustensils dans des li dans les dropdowns
    async display() {
        let html = ''
        this.all.forEach(tag => {
            let alReadySelected = this.selection.includes(tag);
            // console.log(tag, alReadySelected);
            html += `
                <li class="filter__custom__item ${this.name} filter__custom__item ${(alReadySelected) ? 'allready-selected' : ''}" data-tag="${tag}">${tag}</li>`
        })
        document.querySelector(`.filter__custom__list.${this.name}`).innerHTML = html
    }

    // Création du dropdown
    async dropdown() {
        document.getElementById('filters').innerHTML += `
            <div class="filter__custom ${this.name}" id="filter__custom ${this.name}">
                <div class="filter__custom__search">
                    <span class="filter__custom__search__span ${this.name}">${this.placeholder}</span>
                    <i class="fas fa-chevron-down" id="${this.name}-filter-icon"></i>
                    <input type="text" name="${this.name}" id="input__${this.name}" class="hide-search" placeholder="Rechercher un ${this.placeholder}">
                </div>
                <div id="list${this.name}" class="filter__custom__listing">
                    <ul class="filter__custom__list ${this.name}"></ul>
                </div>
            </div>
        `
    }

    // fonction de recherche dans le dropdown
    listenForInput() {
        document.getElementById(`input__${this.name}`).addEventListener('input', (e) => {
            if (this.searchTerm.length >= e.target.value.length) {
                this.all.forEach(tag => {
                    document.querySelector(`.filter__custom__item.${this.name}[data-tag="${tag}"]`).classList.remove('hide');
                });
            }

            this.searchTerm = e.target.value.toLowerCase();

            this.all.forEach(tag => {
                const element = document.querySelector(`.filter__custom__item.${this.name}[data-tag="${tag}"]`);
                if (element && !tag.includes(this.searchTerm)) {
                    element.classList.add('hide');
                }
            });
        });
    }

    async listenForTagSelection() {
        document.querySelectorAll(`.filter__custom__item.${this.name}`).forEach(button => {
            button.addEventListener('click', () => {
                this.resetSearch();
                let tag = button.getAttribute('data-tag');
                if (!this.selection.includes(tag)) {
                    this.selection.push(tag);
                }
                console.log(tag, this.selection);
                this.list.filter();
            })
        })
    }

    listenForTagUnselect() {
        const removeTags = document.querySelectorAll(".tags__list__item");

        removeTags.forEach(el => {
            el.addEventListener("click", () => {
                this.resetSearch();
                let tag = el.getAttribute('data-value');
                // console.log(tag);
                let index = this.selection.findIndex(item => item == tag)
                // console.log(index);
                this.selection.splice(index, 1);
                this.list.filter(true);
            })
        })
    }


    resetSearch() {
        this.searchTerm = '';
        document.querySelector(`#input__${this.name}`).value = '';
    }

    showSelection() {
        let html = ''
        this.selection.forEach(tag => {
            html += `
                <div class="tags__list__item__button ${this.name}">
                    <span>${tag}</span>
                    <button class="tags__list__item__delete"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
                 </div>
                 `
        })
        document.querySelector(`.tags__list__item.${this.name}`).innerHTML = html;
    }
}

export default Filter;