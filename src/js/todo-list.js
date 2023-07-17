// -1- import { getStorageData, setStorageData } from '../helpers/storage';
import storage2 from '../helpers/storage';

// https://www.youtube.com/watch?v=RG-gek5nXLI&t=4240s
// Завдання
// Написати to-do-list де можна створювати,
// видаляти елементи та реалізувати збереження списку в локал сторедж

const inputElement = document.querySelector('input');
const buttonElement = document.querySelector('.add-btn');
const listElement = document.querySelector('.list');
//console.log(inputElement);
//console.log(listElement);

buttonElement.addEventListener('click', addNewItem);
listElement.addEventListener('click', listHandlerClick);

//let listData = [];
let listData = storage2.getStorageData('toDoList') || [];
console.log(listData);

if (listData.length) {
  const itemsTemplateArr = listData.map(item => {
    return `<li class="${item.done ? 'checked' : null}" data-identity="${
      item.id
    }">${item.text}<span class="close">&#215</span></li>`;
  });
  listElement.insertAdjacentHTML('beforeend', itemsTemplateArr.join(''));
}

function listHandlerClick(event) {
  // В зависимости где произошел клик или удаяем или чекаем эллемент
  if (event.target.classList.contains('close')) {
    // Если клик на x удаляеи эллемент с данный, обновляем локалсторедж и на экране
    // делаем не через поиск по Id как при чеке, а через фильтр т.к. эллементов мало
    const itemIdentify = event.target.parentElement.dataset.identity;
    listData = listData.filter(item => item.id !== itemIdentify);
    storage2.setStorageData('toDoList', listData);
    event.target.parentElement.remove();
  } else if (event.target.tagName === 'LI') {
    // Если кликаем не на x а на элемент списк нужно  его чекнуть (отметить или снять отметку)
    event.target.classList.toggle('checked');
    const targetIndex = listData.findIndex(
      item => item.id === event.target.dataset.identity
    );
    listData[targetIndex].done = !listData[targetIndex].done;
    storage2.setStorageData('toDoList', listData);
  }
}

function addNewItem() {
  if (!inputElement.value) {
    return alert('You must write something!');
  }

  const dateNow = Date.now();
  const itemTemplate = `<li data-identity="${dateNow}">${inputElement.value}<span class="close">&#215</span></li>`;
  listElement.insertAdjacentHTML('beforeend', itemTemplate);
  listData.push({
    id: String(dateNow),
    text: inputElement.value,
    done: false,
  });
  // -1- setStorageData('toDoList', listData);
  // -error- todo-list.js:30 Uncaught TypeError: (0 , _storage.setStorageData) is not a function
  //  at HTMLSpanElement.addNewItem (todo-list.js:30:17)
  storage2.setStorageData('toDoList', listData);
  inputElement.value = '';
}
