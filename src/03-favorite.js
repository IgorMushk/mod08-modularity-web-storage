import 'basiclightbox/dist/basiclightbox.min.css';

import { common } from './03-common';
import { createMarkup } from './helpers/createMarkup';
import { createModal } from './helpers/createModal';
import { instruments } from './helpers/instruments';

const list = document.querySelector('.js-list');
const favorite = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];

createMarkup(favorite, list);
// Рисич, - было бы верно то лучше это вынести в дополнительный хелпер
list.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('js-info')) {
    const product = findProduct(evt.target);
    createModal(product);
  }
}

// нужно вынести в helpers, но сдублировано  из online-store.js
function findProduct(elem) {
  //const { id: productId } = elem.closest('.js-card').dataset;
  // при деструктуризации изменим название
  const productId = Number(elem.closest('.js-card').dataset.id);
  return instruments.find(({ id }) => id === productId);
}
