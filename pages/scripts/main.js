const cards = document.querySelector(".cards");
const sortBtns = document.querySelectorAll(".btn_filter");
const sortSelection = document.querySelector(".sortSelection");
const asc = document.querySelector(".asc");
const cartBtn = document.querySelector(".btn_card");
const main = document.querySelector(".main");
const carts = document.querySelector(".carts");
const returnMain = document.querySelector(".returnMain");
const allPrice = document.querySelector(".allPrice");
const quantityPizza = document.querySelector(".quantityPizza");
const cart_items = document.querySelector(".cart_items");

let tempPizzasItem = [];
let sortKey = "";

window.addEventListener("DOMContentLoaded", () => {
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      cookie = cookies[i].split("=")[1].split(",");
      allPrice.innerHTML = cookie[0];
      quantityPizza.innerHTML = cookie.splice(1, cookie.length).length;
    }
  }
});

function displayCards(data) {
  const items = [];

  for (let i = 0; i < data.length; i++) {
    items.push(`
            <div class="pizza_item">
                <img src="${data[i].image}" alt="" />
                <h3>${data[i].name}</h3>
                <div class="pizza_choice">
                  <div class="type">
                    ${data[i].type
                      .map(
                        (el) =>
                          (innerHTML = `<button ${
                            el.isVisible ? "" : "disabled"
                          }>${el.title}</button>`)
                      )
                      .join("")}
                  </div>
                  <div class="size">
                    <button>26 см</button>
                    <button>30 см</button>
                    <button>40 см</button>
                  </div>
                </div>
                <div class="coast">
                  <span
                    >от
                    <p class="price">${data[i].price}</p>
                    Р</span
                  >
                  <button onclick='addInCard(data[${i}].id, data[${i}].price)'>+ Добавить</button>
                </div>
              </div>`);
  }
  return items;
}

function displayCart() {
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      cookie = cookies[i].split("=")[1].split(",");
    }
  }

  const totalPrice = cookie[0];
  const idPizzas = cookie.splice(1, cookie.length);

  let objPizzas = {};

  for (let i = 0; i < idPizzas.length; i++) {
    const key = idPizzas[i];

    if (objPizzas[key] !== undefined) {
      objPizzas[key] += 1;
    } else {
      objPizzas[key] = 1;
    }
  }

  let items = [];

  for (const key in objPizzas) {
    let itemObj = data.filter((el) => el.id === key);

    items.push(`<div class="cart_item">
    <div class="item_info">
      <img src="${itemObj[0].image}" alt="" />
      <div class="item_info_description">
        <h1>${itemObj[0].name}</h1>
        <p>тонкое тесто, 26 см.</p>
      </div>
    </div>
    <div class="item_count">
      <button>
        <p>-</p>
      </button>
      <p>${objPizzas[key]}</p>
      <button>
        <p>+</p>
      </button>
    </div>
    <h1 class="item_price">${objPizzas[key] * itemObj[0].price} P</h1>
    <button class="remove">
      <img src="../../img/remove.png" alt="remove" />
    </button>
  </div>`);
  }

  cart_items.innerHTML = items.join("");
}

const pizzas = displayCards(data);

cards.innerHTML = pizzas.join("");

for (let i = 0; i < sortBtns.length; i++) {
  const btn = sortBtns[i];

  btn.addEventListener("click", () => {
    sortBtns.forEach((el) => el.classList.remove("btn_filter_active"));
    btn.classList.add("btn_filter_active");

    let typeSort = btn.textContent.trim();

    let dataFiltered = data.filter((el) =>
      typeSort === "Все" ? el : el.section === typeSort
    );

    if (dataFiltered.length) {
      const pizzas = displayCards(dataFiltered);
      cards.innerHTML = pizzas.join("");
    } else {
      cards.innerHTML = `<h1 class='nonePizzas'>"В данном разделе нет пиц!"</h1>`;
    }

    tempPizzasItem = dataFiltered;
  });
}

sortSelection.addEventListener("change", (event) => {
  let sortType = event.target.value;
  let key = sortType.split("-")[0];

  let sortPizzas = tempPizzasItem.sort((a, b) => (a[key] > b[key] ? 1 : -1));

  const pizzas = displayCards(sortPizzas);

  cards.innerHTML = pizzas.join("");

  tempPizzasItem = sortPizzas;
  sortKey = key;
});

asc.addEventListener("click", () => {
  let isDesc = asc.classList.toggle("desc");

  let sortPizzas = [];

  if (isDesc) {
    sortPizzas = tempPizzasItem.sort((a, b) =>
      a[sortKey] > b[sortKey] ? 1 : -1
    );
  } else {
    sortPizzas = tempPizzasItem.sort((a, b) =>
      a[sortKey] < b[sortKey] ? 1 : -1
    );
  }

  const pizzas = displayCards(sortPizzas);

  cards.innerHTML = pizzas.join("");
});

cartBtn.addEventListener("click", () => {
  cartBtn.classList.add("none");
  main.classList.add("none");
  carts.classList.remove("none");

  displayCart();
});

returnMain.addEventListener("click", () => {
  cartBtn.classList.remove("none");
  main.classList.remove("none");
  carts.classList.add("none");
});

function addInCard(id, price) {
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      cookie = cookies[i].split("=")[1].split(",");
      let totalPrice = +cookie[0] + +price;
      let idPizzas = cookie.splice(1, cookie.length).concat(id);
      let resCookie = `pizza=${[totalPrice, ...idPizzas]}; max-age=100000`;

      document.cookie = resCookie;

      allPrice.innerHTML = totalPrice;
      quantityPizza.innerHTML = idPizzas.length;
    } else {
      let resCookie = `pizza=${[price, id]}; max-age=100000`;

      document.cookie = resCookie;
      allPrice.innerHTML = price;
      quantityPizza.innerHTML = 1;
    }
  }
}
