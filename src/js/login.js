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

const form = document.querySelector('#login-form');
//console.log(form);
form.addEventListener('input', onSaveDate);

const userData = {};

function onSaveDate(event) {
  //console.dir(event.target);
  //console.dir(event.target.name);
  //console.dir(event.target.value);

  const { name, value } = event.target;
  userData[bane] = value;
}
