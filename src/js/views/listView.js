import { elements } from './base';

export const renderItem = item => {
  const markup = `
    <li class="shopping-list-item" data-itemid="${item.id}">
      <p>${item.ingredient}</p>
      <button
        class="button is-danger is-small shopping-list-delete"
      >
        <i class="fas fa-times"></i>
      </button>
    </li>
  `;
  elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};

export const disableShoppingButton = what => {
  elements.shoppingButtons.querySelector('.copy').disabled = what;
  elements.shoppingButtons.querySelector('.clear').disabled = what;
};
