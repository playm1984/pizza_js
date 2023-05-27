const DOMElements = {
  cardItems: document.querySelector(".cards"),
  sortBtn: document.querySelectorAll(".btn_filter"),
  allPrice: document.querySelector(".allPrice"),
  quantityPizza: document.querySelector(".quantityPizza"),
  sortSelection: document.querySelector(".sortSelection"),
  ascDesc: document.querySelector(".asc"),
  btnCart: document.querySelector(".btn_card"),
  test: document.querySelector(".test"),
};

const cart = document.querySelector(".carts");
const main = document.querySelector(".main");

let filterItems = [];
let sortType = "";

let temp = [];

window.addEventListener("DOMContentLoaded", () => {
  let cookies = document.cookie.split("; ");
  let cookie = false;

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == "pizza") {
      cookie = cookies[i].split("=")[1];
      break;
    }
  }
  if (cookie) {
    let [price, ...pizza] = cookie.split(",");
    DOMElements.allPrice.innerHTML = price;
    DOMElements.quantityPizza.innerHTML = pizza.length;
  }
});

function addInCard(id = false, price = 0) {
  let cookies = document.cookie.split("; ");
  let cookie = false;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == "pizza") {
      cookie = cookies[i].split("=")[1];
      let [oldPrice, ...pizza] = cookies[i].split("=")[1].split(",");
      let edit_cookie = `pizza=${+oldPrice + +price},${pizza},${
        id && id
      }; max-age=10000000000`;
      document.cookie = edit_cookie;

      DOMElements.quantityPizza.innerHTML = pizza.length + 1;
      DOMElements.allPrice.innerHTML = +oldPrice + +price;

      break;
    } else {
      let new_cookie = `pizza=${price},${id && id}; max-age=10000000000`;
      document.cookie = new_cookie;
      DOMElements.quantityPizza.innerHTML = 1;
      DOMElements.allPrice.innerHTML = price;
    }
  }
}

function renderData(data) {
  const items = [];
  for (let i = 0; i < data.length; i++) {
    items.push(`<div class="pizza_item">
    <img src="${data[i].img}" alt="" />
    <h3>${data[i].name}</h3>
    <div class="pizza_choice">
      <div class="type">
      ${data[i].type
        .map(
          (el) =>
            (el.innerHTML = `<button class=${
              el.done ? "type_btn" : "type_none"
            }>${el.title}</button>`)
        )
        .join("")}
      </div>
      <div class="size">
        <button class='type_btn'>26 см</button>
        <button class='type_btn'>30 см</button>
        <button class='type_btn'>40 см</button>
      </div>
    </div>
    <div class="coast">
      <span
        >от
        <p class="price">${data[i].price}</p>
        Р</span
      >
      <button class="btn_buy" onclick='addInCard(data[${i}].id, data[${i}].price)'>+ Добавить</button>
    </div>
    </div>`);
  }
  return items;
}

function renderCart(pizzas, price) {}

const display = renderData(data);

for (let i = 0; i < DOMElements.sortBtn.length; i++) {
  const btn = DOMElements.sortBtn[i];

  btn.addEventListener("click", (e) => {
    DOMElements.sortBtn.forEach((el) =>
      el.classList.remove("btn_filter_active")
    );
    btn.classList.toggle("btn_filter_active");

    let btnSort = e.target.dataset.sort;

    let sortData = data.filter((el) =>
      btnSort === "Все" ? el : el.section === btnSort
    );
    const display = renderData(sortData);
    DOMElements.cardItems.innerHTML = display.join("");
    filterItems = sortData;

    console.log(tempCart);
  });
}

DOMElements.sortSelection.addEventListener("change", (e) => {
  e.preventDefault();
  let sortChoice = e.target.value.split("-")[0];

  let sortItems = filterItems.sort((a, b) =>
    a[sortChoice] > b[sortChoice] ? 1 : -1
  );

  const display = renderData(sortItems);
  DOMElements.cardItems.innerHTML = display.join("");

  filterItems = sortItems;
  sortType = sortChoice;
});

DOMElements.ascDesc.addEventListener("click", () => {
  DOMElements.ascDesc.classList.toggle("desc");

  let countClasses = DOMElements.ascDesc.classList.value.split(" ").length;

  const sortItems = filterItems.sort((a, b) =>
    countClasses === 2
      ? a[sortType] > b[sortType]
        ? 1
        : -1
      : a[sortType] < b[sortType]
      ? 1
      : -1
  );

  const display = renderData(sortItems);
  DOMElements.cardItems.innerHTML = display.join("");
  filterItems = sortItems;
});

DOMElements.btnCart.addEventListener("click", () => {
  // main.style.display = "none";
  // DOMElements.btnCart.classList.add("none");
  // let [price, ...id] = temp;
  // let edit_cookie = `pizza=${price},${id}; max-age=10000000000`;
  // document.cookie = edit_cookie;
});

DOMElements.cardItems.innerHTML = display.join("");

DOMElements.test.addEventListener("click", () => {
  let cookies = document.cookie.split("; ");
  let cookie = false;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == "pizza") {
      cookie = cookies[i].split("=")[1].split(",");
    }
  }

  const price = cookie[0];
  const idPizzas = cookie.slice(1, cookie.length);

  var objPizzas = {};
  for (var i = 0; i < idPizzas.length; ++i) {
    var a = idPizzas[i];
    if (objPizzas[a] != undefined) ++objPizzas[a];
    else objPizzas[a] = 1;
  }

  renderCart(objPizzas, price);
});
