import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {
  elements,
  renderLoader,
  clearLoader,
  copyToClipboard
} from './views/base';

const state = {};
// window.state = state;

// SEARCH CONTROLLER
const conrtolSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Something went wrong with the search :(');
      // console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  if (elements.hero.classList.contains('is-fullheight-with-navbar'))
    elements.hero.classList.remove('is-fullheight-with-navbar');
  conrtolSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.page-btn');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: elements.searchRes.getBoundingClientRect().top + window.scrollY - 200
  });
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
  // 1. Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // 2. Prepare UI for changes
    recipeView.clearRecipe();
    if (!elements.recipe.classList.contains('is-active'))
      elements.recipe.classList.add('is-active');
    if (!document.querySelector('html').classList.contains('is-clipped'))
      document.querySelector('html').classList.add('is-clipped');
    renderLoader(elements.recipeCard);

    // 3. Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // 4. Get recipe data and parse ingredients
      await state.recipe.getRecipe();

      // 5. Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      alert('Error with recipe');
      // console.log(error);
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// LIST CONTROLLER
const controlList = () => {
  // Create a new list if there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el);
    listView.renderItem(item);
  });

  const shoppingBtn = elements.shoppingButtons.querySelector('button').disabled;
  if (shoppingBtn) {
    listView.disableShoppingButton(false);
  }
};

// Handling delete list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping-list-item').dataset.itemid;

  if (e.target.matches('.shopping-list-delete, .shopping-list-delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
    if (state.list.items.length === 0) {
      listView.disableShoppingButton(true);
    }
  }
});

elements.shoppingButtons.addEventListener('click', e => {
  if (e.target.matches('button.clear, button.clear *')) {
    state.list.items = [];
    state.list.persistData(state.list.items);
    elements.shopping.innerHTML = '';
    listView.disableShoppingButton(true);
  }

  if (e.target.matches('button.copy, button.copy *')) {
    copyToClipboard(elements.shopping.innerText);
  }
});

// LIKES CONTROLLER
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toogle the like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list
    likesView.renderLike(newLike);

    // User HAS liked current recipe
  } else {
    // Remove like to the state
    state.likes.deleteLike(currentID);

    // Toogle the like button
    likesView.toggleLikeBtn(false);

    // Remove like to UI list
    likesView.deleteLike(currentID);
  }
  likesView.countLikes(state.likes.getNumLikes());
};

// Restore liked recipes and shopping list on page load
window.addEventListener('load', () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();

  // Toggle like menu button
  likesView.countLikes(state.likes.getNumLikes());

  // Render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));

  state.list = new List();

  // Restore shopping list
  state.list.readStorage();

  // Render the existing shopping list
  state.list.items.forEach(item => listView.renderItem(item));

  // Toggle shopping list button
  if (elements.shopping.childElementCount > 0) {
    listView.disableShoppingButton(false);
  }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (
    e.target.matches('.btn-decrease, .btn-decrease *') &&
    state.recipe.servings > 1
  ) {
    // Decrease button is clicked
    state.recipe.updateServings('dec');
    recipeView.updateServings(state.recipe);
    recipeView.updateNutrition(state.recipe);
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServings(state.recipe);
    recipeView.updateNutrition(state.recipe);
  }

  if (e.target.matches('.recipe-btn-add, .recipe-btn-add *')) {
    controlList();
    e.target.innerHTML = `<i class="fas fa-check"></i> &nbsp; Add to shopping list`;
  }

  if (e.target.matches('.recipe-love, .recipe-love *')) {
    // Like controller
    controlLike();
  }

  if (e.target.matches('button[aria-label=close]')) {
    recipeView.clearRecipe();
  }
});
