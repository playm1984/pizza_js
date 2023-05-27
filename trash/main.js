const data = [
  {
    name: "Чизбургер-пицца",
    price: 395,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/02.jpg",
    sort: "Мясные",
  },
  {
    name: "Сырная",
    price: 415,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/03.jpg",
    sort: "Острые",
  },
  {
    name: "Чизбургер-пицца",
    price: 395,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/02.jpg",
    sort: "Мясные",
  },
  {
    name: "Сырная",
    price: 415,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/03.jpg",
    sort: "Острые",
  },
  {
    name: "Чизбургер-пицца",
    price: 395,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/02.jpg",
    sort: "Мясные",
  },
  {
    name: "Сырная",
    price: 415,
    type: ["тонкое", "традиционное"],
    size: [26, 30, 40],
    img: "./img/pizza-items/03.jpg",
    sort: "Острые",
  },
];

const cards = document.querySelector(".cards");
const btns_filter = document.querySelectorAll(".btn_filter");

let filterData = "Все";
let tempDate = [];

function removePizzaItems() {
  const items = document.querySelectorAll(".pizza-item");
  for (let i = 0; i < items.length; i++) {
    items[i].remove();
  }
}

function renderPizzaItems(temp) {
  temp.map((el) => {
    const items = document.createElement("div");
    items.classList.add("pizza-item");
    items.innerHTML = `
      <img src="${el.img}" alt="" />
      <h3>${el.name}</h3>
      <div class="pizza_choice">
        <div class="type">
          <button>тонкое</button>
          <button>традиционное</button>
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
          <p>${el.price}</p>
          P</span
        >
        <button>+ Добавить</button>
      </div>
    `;
    setTimeout(() => {
      cards.appendChild(items);
    }, 2000);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  tempDate = data;
  renderPizzaItems(tempDate);
});

for (let i = 0; i < btns_filter.length; i++) {
  const btn = btns_filter[i];

  btn.addEventListener("click", (e) => {
    removePizzaItems();
    let filterD = e.target.dataset.sort;
    tempDate = data.filter((el) =>
      filterD === "Все" ? el : el.sort === filterD
    );
    renderPizzaItems(tempDate);
  });
}
