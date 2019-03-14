import { elements } from './base';

export const clearRecipe = () => {
  if (elements.recipe.classList.contains('is-active'))
    elements.recipe.classList.remove('is-active');
  if (document.querySelector('html').classList.contains('is-clipped'))
    document.querySelector('html').classList.remove('is-clipped');
  elements.recipeCard.innerHTML = '';
  history.replaceState(null, null, ' ');
};

const createIngredient = ingredient => `
  <li>${ingredient}</li>
  `;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
      <header class="modal-card-head">
        <div class="modal-card-title">${recipe.title}</div>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <figure class="image is-3by1">
          <img
            src="${recipe.img}" alt="${recipe.title}" 
            class="modal-card-image"
          />
        </figure>
        <br />
        <div class="content">
          <div class="columns">
            <div class="column">
              <i class="fas fa-stopwatch"></i> &nbsp;<span class="recipe-time"
                >${recipe.time}</span
              >
              minutes
            </div>
            <div class="column">
              <i class="fas fa-cheese"></i> &nbsp;<span
                class="recipe-servings"
                >${recipe.servings}</span
              >
              servings
              <div class="buttons has-addons is-pulled-right ">
                <span class="button is-small btn-increase"
                  ><i class="fas fa-plus"></i
                ></span>
                <span class="button is-small btn-decrease"
                  ><i class="fas fa-minus"></i
                ></span>
              </div>
            </div>
            <div class="column has-text-right">
              <button class="button is-info is-small recipe-love">
                ${
                  isLiked
                    ? `<i class="fas fa-heart"></i>&nbsp; Remove from favorites`
                    : `<i class="far fa-heart"></i>&nbsp; Add to favorites`
                }</button>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <table class="table is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Nutrition facts</th>
                    <th>Whole meal</th>
                    <th>One serving</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Calories</th>
                    <td>${recipe.calories} kcal</td>
                    <td><span class="nutrients-calories">${Math.round(
                      recipe.calories / recipe.servings
                    )}</span> kcal</td>
                  </tr>
                  <tr>
                    <th>Fat</th>
                    <td>${recipe.fat} g</td>
                    <td><span class="nutrients-fat">${Math.round(
                      recipe.fat / recipe.servings
                    )}</span> g</td>
                  </tr>
                  <tr>
                    <th>Carbohydrate</th>
                    <td>${recipe.carb} g</td>
                    <td><span class="nutrients-carb">${Math.round(
                      recipe.carb / recipe.servings
                    )}</span> g</td>
                  </tr>
                  <tr>
                    <th>Protein</th>
                    <td>${recipe.protein} g</td>
                    <td><span class="nutrients-protein">${Math.round(
                      recipe.protein / recipe.servings
                    )}</span> g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <h3><i class="fas fa-puzzle-piece"></i> Ingredients</h3>
              <ul class="ingredients-list">
                      ${recipe.ingredients
                        .map(el => createIngredient(el))
                        .join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="field is-grouped">
          <p class="control">
            <a href="${recipe.url}" target="_blank" class="button is-primary">
              <i class="fas fa-external-link-alt"></i> &nbsp; Show directions
            </a>
          </p>
          <p class="control">
            <button class="button recipe-btn-add">
              <i class="fas fa-list-ul"></i> &nbsp; Add to shopping list
            </button>
          </p>
        </div>
        <div class="has-text-right is-size-7">
          <em>by ${recipe.author}</em>
        </div>
      </footer>
  `;
  elements.recipeCard.insertAdjacentHTML('beforeend', markup);
};

export const updateServings = recipe => {
  document.querySelector('.recipe-servings').textContent = recipe.servings;
};

export const updateNutrition = recipe => {
  document.querySelector('.nutrients-calories').textContent = Math.round(
    recipe.calories / recipe.servings
  );
  document.querySelector('.nutrients-protein').textContent = Math.round(
    recipe.protein / recipe.servings
  );
  document.querySelector('.nutrients-fat').textContent = Math.round(
    recipe.fat / recipe.servings
  );
  document.querySelector('.nutrients-carb').textContent = Math.round(
    recipe.carb / recipe.servings
  );
};
