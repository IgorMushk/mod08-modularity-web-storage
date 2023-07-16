import storage from './storage';

// ЗАДАЧА 1 (аналогия задачи 3 из ДЗ модуля 8)

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
const userData = {};

const form = document.querySelector('.login-form');
//console.log(form);
const logBtn = document.querySelector('.login-btn');
const inputs = document.querySelectorAll('.login-input');

form.addEventListener('input', onSaveDate);
form.addEventListener('submit', clickOnData);

function clickOnData(evt) {
  evt.preventDefault();
  const { email, password } = userData;
  if (!email || !password) {
    alert('Не все поля заполнены!');
    return;
  }

  if (email == !USER_DATA.email || password !== USER_DATA.password) {
    alert('email или passord не совпадают!');
    return;
  }
  //console.log(userData);
  storage.save(LOCAL_KEY, userData);
  logBtn.textContent = 'Logout';
  inputs.forEach(input => input.setAttribute('readonly', true));
  form.reset();
}

function onSaveDate(event) {
  //console.dir(event.target);
  //   console.dir(event.target.name);
  //   console.dir(event.target.value);

  const { name, value } = event.target;
  userData[name] = value;
}
