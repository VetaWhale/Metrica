const footageNode = document.querySelector(".js-range-slider");
const footageTextNode = document.querySelector(".range-value_amount");
const totalNode = document.querySelector(".js-sum");
const priceTextNode = document.querySelector('.calculate__price');
const tariff = document.querySelector('select');
const tariffNode = document.querySelectorAll(".tariff");
const inputs = document.querySelectorAll("input");
const extraServisCheckbox = document.querySelectorAll("#extra-servis-checkbox");

const counters = document.querySelectorAll("[data-counter]");
const tasks = document.querySelectorAll("[data-task]");

let basePrice = 1000;

function changeTariff() {
    for (const tariff of tariffNode) {
    if (tariff.selected) {
      basePrice = parseInt(tariff.value);
    }
  }
  priceTextNode.innerText = `${basePrice} ₽/м2`;
  calculate()
}

function footageUpdate() {
  footageTextNode.value = footageNode.value;
}

footageNode.addEventListener("input", footageUpdate);

function calculate() {
  let totalPrice = basePrice * footageNode.value;

  for (const checkbox of extraServisCheckbox) {
    if (checkbox.checked) {
      totalPrice += parseInt(checkbox.value);
    }
  }
  totalNode.innerText = totalPrice;
}

 tariff.addEventListener('change', changeTariff);

for (const input of inputs) {
  input.addEventListener('input', function () {
    calculate();
  });
}

counters.forEach((counter) => {
  counter.addEventListener("click", (e) => {
    const target = e.target;

    if (!target.closest(".counter")) {
      return
    } else {
      let value = parseInt(
        target.closest(".counter").querySelector("input").value
      );

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
  });
});

tasks.forEach((task) => {
  task.addEventListener("click", (elem) => {
    const target = elem.target;

    target.classList.toggle("task-project_checked");
  });
});
