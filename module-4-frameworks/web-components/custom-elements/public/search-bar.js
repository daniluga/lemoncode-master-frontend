class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const container = document.createElement("div");
    container.setAttribute("class", "container");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search...");
    input.setAttribute("class", "field");

    const iconContainer = document.createElement("div");
    iconContainer.setAttribute("class", "icons-container");

    const iconSearch = document.createElement("div");
    iconSearch.setAttribute("class", "icon-search");

    iconContainer.appendChild(iconSearch);
    container.appendChild(input);
    container.appendChild(iconContainer);
    this.appendChild(container);
  }
}

customElements.define("search-bar", SearchBar);
