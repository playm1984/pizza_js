const DOMElements = {
  totalPrice: document.querySelector(".totalPrice"),
  countPizzas: document.querySelector(".countPizzas"),
  cart: document.querySelector(".carts"),
  btn_card: document.querySelector(".btn_card"),
  emptyPage: document.querySelector(".emptyPage "),
  returnMainInEmpty: document.querySelector(".returnMainInEmpty"),
  trash_text: document.querySelector(".trash_text"),
};

function cookieCart() {
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

  return [totalPrice, idPizzas, objPizzas];
}

function displayCart() {
  const [totalPrice, idPizzas, objPizzas] = cookieCart();
  let items = [];

  for (const key in objPizzas) {
    let [size, type, name, id] = key.split("/");

    const [typePizza, subIdType] = data.reduce((acc, el) => {
      let filter = el.type.filter((elem) => elem.subId === type);
      if (filter.length) {
        return [filter[0]?.title, filter[0]?.subId];
      } else {
        return acc;
      }
    }, "");

    const [pricePizza, sizePizza, subIdSize] = data.reduce((acc, el) => {
      let sizeItem = el.size.filter((elem) => elem.subId === size);
      if (sizeItem.length) {
        return [
          typePizza === "тонкое" ? sizeItem[0].price[0] : sizeItem[0].price[1],
          sizeItem[0].title,
          sizeItem[0].subId,
        ];
      } else {
        return acc;
      }
    }, []);

    let itemObj = data.filter((el) => el.id === id);

    items.push(`<div class="cart_item">
        <div class="cart_wrapper">
            <div class="item_info">
                <img src="${itemObj[0].image}" alt="" />
                <div class="item_info_description">
                    <h1>${name}</h1>
                    <p>${typePizza} тесто, ${sizePizza} см.</p>
                </div>
            </div>
            <div class="item_count">
                <button onclick='calcPizzaInCart("${subIdSize}", "${subIdType}", "-")'>
                    <p>-</p>
                </button>
                <p>${objPizzas[key]}</p>
                <button onclick='calcPizzaInCart("${subIdSize}", "${subIdType}", "+")'>
                    <p>+</p>
                </button>
            </div>
        </div>
        <div class="cart_wrapper">
            <h1 class="item_price">${objPizzas[key] * +pricePizza} P</h1>
            <button class="remove" onclick='removeTypsPizzas("${key}", "${idPizzas}", "${
      objPizzas[key] * +pricePizza
    }" )'>
                <img src="../../img/remove.png" alt="remove" />
            </button>
        </div>
      </div>`);
  }

  DOMElements.totalPrice.innerHTML = totalPrice;
  DOMElements.countPizzas.innerHTML = idPizzas.length;

  cart_items.innerHTML = items.join("");

  if (!idPizzas.length) {
    DOMElements.cart.classList.add("none");
    DOMElements.btn_card.classList.add("none");
    DOMElements.emptyPage.classList.remove("none");
  }
}

function calcPizzaInCart(sizeParam, typeParam, operator) {
  const [totalPrice, arrayPizzas, objPizzas] = cookieCart();

  let editCookie = "";
  let resPrice = +totalPrice;

  for (const key in objPizzas) {
    const [size, type, name, id, price] = key.split("/");

    if (`${size}/${type}` === `${sizeParam}/${typeParam}`) {
      if (operator === "+") {
        objPizzas[key] += 1;
        resPrice += +price;
      } else {
        objPizzas[key] -= 1;
        resPrice -= +price;
      }
    }

    for (let i = 0; i < objPizzas[key]; i++) {
      editCookie += `,${size}/${type}/${name}/${id}/${price}`;
    }
  }

  document.cookie = `pizza=${resPrice}${editCookie}; max=age=1000000`;

  displayCart();
}

function returnToMain() {
  DOMElements.emptyPage.classList.add("none");
  main.classList.remove("none");
  DOMElements.btn_card.classList.remove("none");
  allPrice.innerHTML = 0;
  quantityPizza.innerHTML = 0;
  document.cookie = "pizza=0; max-age=-1";
}

DOMElements.returnMainInEmpty.addEventListener("click", () => {
  returnToMain();
});

DOMElements.trash_text.addEventListener("click", () => {
  document.cookie = `pizza=0; max-age=-1`;

  DOMElements.cart.classList.add("none");
  DOMElements.btn_card.classList.add("none");
  DOMElements.emptyPage.classList.remove("none");
});

function removeTypsPizzas(item, array, price) {
  const [totalPrice, idPizzas, objPizzas] = cookieCart();

  if (idPizzas.length > 1) {
    let arrayPizzas = array
      .split(",")
      .filter((el) => el !== item)
      .join(",");

    document.cookie = `pizza=${
      +totalPrice - +price
    },${arrayPizzas}; max-age=100000`;
  } else {
    document.cookie = `pizza=0; max-age=-1`;
  }

  displayCart();
}
