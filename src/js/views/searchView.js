import { elements } from './base';

export const getInput = () => elements.searchInput.value.trim();

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const limitRecipeTitle = (title, limit = 23) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipeObj => {
  const prefixIndex = recipeObj.recipe.uri.indexOf('#');
  const recipeId = recipeObj.recipe.uri.slice(prefixIndex);
  const markup = `
  <div class="column is-one-quarter">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="${recipeObj.recipe.image}" 
            alt="${recipeObj.recipe.label}"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-5">${limitRecipeTitle(
              recipeObj.recipe.label
            )}</p>
            <p class="subtitle is-6">${recipeObj.recipe.source}</p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="${recipeId}" class="card-footer-item"
          >More details &nbsp; <i class="fas fa-arrow-right"></i
        ></a>
      </footer>
    </div>
  </div>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) =>
  `<a class="page-btn pagination-${type}" data-goto="${
    type === 'previous' ? page - 1 : page + 1
  }">${type}</a>
  `;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'previous')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'previous');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 12) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
