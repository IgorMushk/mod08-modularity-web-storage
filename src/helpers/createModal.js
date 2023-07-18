import * as basicLightbox from 'basiclightbox';
// !!! работает только на локальном сервере
// --- import 'basiclightbox/dist/basiclightbox.min.css';
import 'basiclightbox/dist/basiclightbox.min.css';

function createModal(product) {
  const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${product.img}" alt="${product.name}"  width="200"/>
        <h2>${product.name}</h2>
        <h3>${product.price} грн</h3>
        <p>${product.description}</p>
        <div>
              <button class="js-favorite">Add to favorite</button>
              <button class="js-basket">Add to basket</button>
          </div>
      </div>
  `);
  instance.show();
}

export { createModal };
