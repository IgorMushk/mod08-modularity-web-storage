import { Notify } from 'notiflix/build/notiflix-notify-aio';
import storage from './storage';

// ЗАДАЧА 1 (аналогия задачи 3 из ДЗ модуля 8)
// https://www.youtube.com/watch?v=zgZ6s4-Y2Wk&t=5493s (1:23)

// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.
//
// const USER_DATA = {
//   email: 'user@mail.com',
//   password: 'secret',
// };

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};
const LOCAL_KEY = 'login-data';
let userData = {};

const form = document.querySelector('.login-form');
//console.log(form);
const loginBtn = document.querySelector('.login-btn');
const inputs = document.querySelectorAll('.login-input');
const todoform = document.querySelector('.todo');
const saveData = storage.load(LOCAL_KEY);

form.addEventListener('input', onSaveDate);
form.addEventListener('submit', clickOnData);

// Если данные в локалсторедже есть, делаем все как при submit
if (saveData) {
  loginBtn.textContent = 'Logout';
  inputs.forEach(input => input.setAttribute('readonly', true));
}

function clickOnData(evt) {
  evt.preventDefault();
  // Проверка состояния кнопки при клике
  if (loginBtn.textContent === 'Logout') {
    loginBtn.textContent = 'Login';
    //console.log(inputs);
    inputs.forEach(input => input.removeAttribute('readonly'));
    storage.remove(LOCAL_KEY);
    userData = {};
    todoform.style.display = 'none';
    return;
  }

  const { email, password } = userData;
  if (!email || !password) {
    //alert('Не все поля заполнены!');
    Notify.failure('Не все поля заполнены!');
    return;
  }

  if (email == !USER_DATA.email || password !== USER_DATA.password) {
    //alert('email или passord не совпадают!');
    Notify.failure('email или passord не совпадают!');
    return;
  }
  //console.log(userData);
  storage.save(LOCAL_KEY, userData);
  loginBtn.textContent = 'Logout';
  inputs.forEach(input => input.setAttribute('readonly', true));
  form.reset();
  todoform.style.display = 'flex';
}

function onSaveDate(event) {
  //console.dir(event.target);
  //   console.dir(event.target.name);
  //   console.dir(event.target.value);

  const { name, value } = event.target;
  userData[name] = value;
}

//  ----------- Add to doList

const formToDo = document.querySelector('.todo');
const inputToDo = document.querySelector('.todo__text');
const listSelectPriority = document.querySelector('.todo__options');
const buttonToDo = document.querySelector('.todo__add');
const inputItems = document.querySelector('.todo__items');

console.log(formToDo);
console.log(inputToDo);
console.log(listSelectPriority);
console.log(buttonToDo);
console.log(inputItems);

// inputToDo.addEventListener('input', onInputDoto);
// function onInputDoto(evt) {
//   console.log(evt.target.value);
// }

// listSelectPriority.addEventListener('change', onSelectPriority);
// function onSelectPriority(evt) {
//   console.log(evt.target.value);
// }

// let listToDo = [];
let listToDo = storage.load('loginToDoList') || [];
console.log(listToDo);

if (listToDo.length) {
  const itemsTemplateArr = listToDo.map(item => {
    return `<li class="todo__item" data-identity="${item.id}"><span><button type="button" class='todo__delete'></button></span>${item.priority} - ${item.text}</li>`;
  });
  inputItems.insertAdjacentHTML('beforeend', itemsTemplateArr.join(''));
}

formToDo.addEventListener('submit', doToDoAddList);

function doToDoAddList(evt) {
  evt.preventDefault();
  // Проверяем если выбран приоритет или введен тест
  if (!inputToDo.value || listSelectPriority.value === 'Choose priority') {
    if (listSelectPriority.value === 'Choose priority') {
      Notify.failure('No priority selected!');
      return;
    }
    if (!inputToDo.value) {
      Notify.failure('Not put to do something!');
      return;
    }
  }
  console.log(inputToDo.value, listSelectPriority.value);

  const dateNow = Date.now();
  const itemTemplate = `
  <li class='todo__item' data-identity="${dateNow}">
    <span><button class="todo__delete"></button></span>${listSelectPriority.value} - ${inputToDo.value}
  </li>`;
  inputItems.insertAdjacentHTML('beforeend', itemTemplate);
  listToDo.push({
    id: String(dateNow),
    text: inputToDo.value,
    priority: listSelectPriority.value,
    done: false,
  });
  storage.save('loginToDoList', listToDo);
  inputToDo.value = '';
  listSelectPriority.value = 'Choose priority';
}

inputItems.addEventListener('click', listHandlerClick);

function listHandlerClick(evt) {
  //console.log(evt.target.classList);
  if (!evt.target.classList.contains('todo__delete')) return;
  console.log('del');
  //console.log(evt.target.closest('.todo__item'));
  //console.log(evt.target.closest('.todo__item').dataset.identity);
  const itemIdentify = evt.target.closest('.todo__item').dataset.identity;
  listToDo = listToDo.filter(item => item.id !== itemIdentify);
  storage.save('loginToDoList', listToDo);
  evt.target.closest('.todo__item').remove();
}
