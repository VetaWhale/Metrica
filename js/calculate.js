const INITIAL_PRICE = 1000;

const footageNode = document.querySelector(".js-range-slider");
const footageTextNode = document.querySelector(".range-value_amount");
const totalNode = document.querySelector(".js-sum");
const priceTextNode = document.querySelector(".calculate__price");
const tariff = document.querySelector("select");
const tariffNode = document.querySelectorAll(".tariff");
const inputs = document.querySelectorAll("input");
const extraServisCheckbox = document.querySelectorAll("#extra-servis-checkbox");

const counters = document.querySelectorAll("[data-counter]");
const tasks = document.querySelectorAll("[data-task]");

let basePrice = INITIAL_PRICE;

// ФУНКЦИИ
function changeTariff() {
  for (const tariff of tariffNode) {
    if (tariff.selected) {
      basePrice = parseInt(tariff.value);
    }
  }
  priceTextNode.innerText = `${basePrice} ₽/м2`;
  calculate();
}

function footageUpdate() {
  footageTextNode.value = footageNode.value;
}

function calculate() {
  let totalPrice = basePrice * footageNode.value;

  for (const checkbox of extraServisCheckbox) {
    if (checkbox.checked) {
      totalPrice += parseInt(checkbox.value);
    }
  }
  totalNode.innerText = totalPrice;
}

function doActionForCounter(e) {
  const target = e.target;

  if (!target.closest(".counter")) return;

  let value = parseInt(target.closest(".counter").querySelector("input").value);

  if (target.classList.contains("js-counter-plus")) {
    value++;
  } else {
    value--;
  }

  if (value <= 0) {
    value = 0;
    target
      .closest(".counter")
      .querySelector(".js-counter-minus")
      .classList.add("counter-button_disabled");
  } else {
    target
      .closest(".counter")
      .querySelector(".js-counter-minus")
      .classList.remove("counter-button_disabled");
  }

  if (value >= 10) {
    value = 10;
    target
      .closest(".counter")
      .querySelector(".js-counter-plus")
      .classList.add("counter-button_disabled");
  } else {
    target
      .closest(".counter")
      .querySelector(".js-counter-plus")
      .classList.remove("counter-button_disabled");
  }

  target.closest(".counter").querySelector("input").value = value;
}

function addClassTask(elem) {
  const target = elem.target;

  target.classList.toggle("task-project_checked");
}

// ОБРАБОТЧИКИ СОБЫТИЙ
tariff.addEventListener("change", changeTariff);

for (const input of inputs) {
  input.addEventListener("input", calculate);
}

counters.forEach((counter) => {
  counter.addEventListener("click", doActionForCounter);
});

footageNode.addEventListener("input", footageUpdate);

tasks.forEach((task) => {
  task.addEventListener("click", addClassTask);
});
