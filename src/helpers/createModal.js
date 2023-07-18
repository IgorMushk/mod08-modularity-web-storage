import * as basicLightbox from 'basiclightbox';
// !!! работает только на локальном сервере
// --- import 'basiclightbox/dist/basiclightbox.min.css';
//import 'basiclightbox/dist/basiclightbox.min.css';

import { closeModal } from './closeModal';

function createModal(product) {
  //  !!!! !!!! !!!!
  // Как доп опция его удобно вынести для чтения, но разницы не будет, ниже ...
  //   const option = {
  //     onShow() {
  //       console.log(this);
  //       document.addEventListener('keydown', closeModal);
  //     },

  //     onClose() {},
  //   };

  const instance = basicLightbox.create(
    `
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
  `, // option - выше);  instance.show();
    {
      handler: null,
      onShow(instance) {
        console.log(instance);
        //console.log(this);
        this.handler = closeModal.bind(instance);
        document.addEventListener('keydown', this.handler);
      },
      //   onShow(instance) =>{document.addEventListener('keypress', closeModal)},
      onClose() {
        //console.log(this);
        document.removeEventListener('keydown', this.handler);
      },
    }
  );
  instance.show();
  //  -!-
}

//  -!-
// function closeModal(evt) {
//   console.log(evt);
//   if (evt.code === 'Escape') {
//     instance.close();
//   }
// }

export { createModal };
