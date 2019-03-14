export const elements = {
  hero: document.querySelector('.hero'),
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search-field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results-list'),
  searchResPages: document.querySelector('.pagination'),
  recipe: document.querySelector('.recipe'),
  recipeCard: document.querySelector('.recipe-card'),
  recipeTime: document.querySelector('.recipe-time'),
  recipeServings: document.querySelector('.recipe-servings'),
  recipeBtnAdd: document.querySelector('.recipe-btn-add'),
  shopping: document.querySelector('.shopping-list'),
  shoppingButtons: document.querySelector('.shopping-btns'),
  likesMenu: document.querySelector('.likes-menu'),
  likesList: document.querySelector('.likes-list'),
  likesCount: document.querySelector('.liked-count')
};

export const elementStrings = {
  loader: 'loader'
};

export const renderLoader = parent => {
  const loader = `<div class="loader"></div>`;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.parentElement.removeChild(loader);
};

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
