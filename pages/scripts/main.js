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

let tempPizzasItem = data;
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
    let typeIndex = data[i].type.map((el) => el.isActive).indexOf(true);
    let sizeIndex = data[i].size.map((el) => el.isActive).indexOf(true);

    data[i].price = data[i].size[sizeIndex].price[typeIndex];

    items.push(`
            <div class="pizza_item">
                <img src="${data[i].image}" alt="" />
                <h3>${data[i].name}</h3>
                <div class="pizza_choice">
                  <div class="type">
                    ${data[i].type
                      .map(
                        (el, j) =>
                          (innerHTML = `<button ${
                            el.isVisible ? "" : "disabled"
                          } class="${el.isVisible ? "type_btn" : "type_none"} ${
                            el.isActive ? "type_active" : ""
                          }" onclick='changeType(data[${i}].type[${j}].subId, "type", data[${i}].id)'>${
                            el.title
                          }</button>`)
                      )
                      .join("")}
                  </div>
                  <div class="size">
                  ${data[i].size
                    .map(
                      (el, j) =>
                        (innerHTML = `<button ${
                          el.isVisible ? "" : "disabled"
                        } class="${el.isVisible ? "type_btn" : "type_none"} ${
                          el.isActive ? "type_active" : ""
                        }" onclick='changeType(data[${i}].size[${j}].subId, "size", data[${i}].id)'>${
                          el.title
                        }</button>`)
                    )
                    .join("")}
                     
                  </div>
                </div>
                <div class="coast">
                  <span
                    >от
                    <p class="price">${
                      data[i].size[sizeIndex].price[typeIndex]
                    }</p>
                    Р</span
                  >
                  <button onclick='addInCard(
                        data[${i}].size[${sizeIndex}].subId, 
                        data[${i}].type[${typeIndex}].subId, 
                        data[${i}].size[${sizeIndex}].price[${typeIndex}],
                        data[${i}].name,
                        data[${i}].id
                    )'>+ Добавить</button>
                </div>
              </div>`);
  }
  return items;
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

  let sortPizzas = [];

  sortPizzas = tempPizzasItem.sort((a, b) => (a[key] > b[key] ? 1 : -1));

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
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      cookie = true;
    }
  }

  if (cookie) {
    cartBtn.classList.add("none");
    main.classList.add("none");
    carts.classList.remove("none");

    displayCart();
  }
});

returnMain.addEventListener("click", () => {
  cartBtn.classList.remove("none");
  main.classList.remove("none");
  carts.classList.add("none");

  const [totalPrice, arrayPizzas, objPizzas] = cookieCart();

  quantityPizza.innerHTML = arrayPizzas.length;
  allPrice.innerHTML = totalPrice;
});

function addInCard(idSize, idType, price, name, id) {
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      cookie = cookies[i].split("=")[1].split(",");
      let totalPrice = +cookie[0] + +price;
      let idPizzas = cookie
        .splice(1, cookie.length)
        .concat(`${idSize}/${idType}/${name}/${id}/${price}`);
      let resCookie = `pizza=${[totalPrice, ...idPizzas]}; max-age=100000`;

      document.cookie = resCookie;

      allPrice.innerHTML = totalPrice;
      quantityPizza.innerHTML = idPizzas.length;
    } else {
      let resCookie = `pizza=${[
        price,
        idSize,
      ]}/${idType}/${name}/${id}/${price}; max-age=100000`;

      document.cookie = resCookie;
      allPrice.innerHTML = price;
      quantityPizza.innerHTML = 1;
    }
  }
}

function changeType(idType, type, idPizza) {
  p = 0;
  let res = data.map((el) => {
    if (el.id === idPizza) {
      let active = true;
      let notActive = false;
      return {
        ...el,
        [type]: el[type].map((elem, i) => {
          if (elem.subId === idType) {
            return { ...elem, isActive: active };
          } else {
            return { ...elem, isActive: notActive };
          }
        }),
      };
    } else {
      return el;
    }
  });
  data = res;
  tempPizzasItem = res;

  const pizzas = displayCards(data);

  cards.innerHTML = pizzas.join("");
}
