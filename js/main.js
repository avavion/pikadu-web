// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector("#menu-toggle");
// Создаем переменную, в которую положим меню
let menu = document.querySelector(".sidebar");
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener("click", function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle("visible");
});

const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = loginForm.querySelector(".login-email");
const passwordInput = loginForm.querySelector(".login-password");
const loginSignup = loginForm.querySelector(".login-signup");

const userElem = document.querySelector(".user");
const userNameElem = userElem.querySelector(".user-name");

const listUsers = [
  {
    id: 1,
    email: "avavionmvm@gmail.com",
    password: "123456",
    displayName: "Алан",
  },
  {
    id: 2,
    email: "avavionmvm@yandex.ru",
    password: "654321",
    displayName: "Салават",
  },
  {
    id: 3,
    email: "avavionmvm@mail.ru",
    password: "123654",
    displayName: "avavion.",
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользователь не найден!");
    }
  },
  logOut() {
    console.log("Выход");
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split("@")[0] };
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert(`Пользователь с такой почтой уже зарегистрирован`);
    }
  },
  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const toggleAuthDOM = () => {
  const user = setUsers.user;
  console.log("user: ", user);

  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "flex";
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = "block";
    userElem.style.display = "none";
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  setUsers.logIn(emailValue, passwordValue, toggleAuthDOM);
});

loginSignup.addEventListener("click", (event) => {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  setUsers.signUp(emailValue, passwordValue, toggleAuthDOM);
});

toggleAuthDOM();
