import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked
    ? `<i class="fas fa-heart"></i>&nbsp; Remove from favorites`
    : `<i class="far fa-heart"></i>&nbsp; Add to favorites`;
  document.querySelector('.recipe-love').innerHTML = iconString;
};

export const countLikes = numLikes => {
  elements.likesCount.innerText = numLikes;
};

export const renderLike = like => {
  const markup = `
    <a class="navbar-item likes-link" href="#${like.id}">
      <figure class="image">
        <img
          class="is-rounded"
          src="${like.img}" alt="${like.title}"
        />
        <figcaption>
          <span class="title is-6 likes-name">${limitRecipeTitle(
            like.title,
            23
          )}</span>
          <span class="subtitle is-7 likes-author">${like.author}</span>
        </figcaption>
      </figure>
    </a>
  `;
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes-link[href="#${id}"]`);
  if (el) el.parentElement.removeChild(el);
};
