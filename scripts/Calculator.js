let operation = [];
const displayInfo = document.querySelector(".display-info");
const displayCalcResultEl = document.querySelector(".display-result");

function initialize() {
  displayCalcResultEl.textContent = "0";

  initButtonsEvents();
}

function initButtonsEvents() {
  const buttons = document.querySelectorAll("[data-value]");
  buttons.forEach((button) =>
    addEventListenerAll(button, "click drag", () => {
      execBtn(button.dataset.value);
    })
  );
}

function addEventListenerAll(element, events, fn) {
  events.split(" ").forEach((event) => {
    element.addEventListener(event, fn, false);
  });
}

function execBtn(value) {
  switch (value) {
    case "C":
      clearAll();
      break;
    case "CE":
      cancelEntry();
      break;
    case "+":
      addOperation("+");
      break;
    case "-":
      addOperation("-");
      break;
    case "*":
      addOperation("*");
      break;
    case "/":
      addOperation("/");
      break;
    case "%":
      addOperation("%");
      break;
    case ".":
      addDot();
      break;
    case "=":
      calc();
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      addOperation(parseFloat(value));
      break;
  }
}

function addDot() {
  if (operation.length === 0) {
    operation.push("0.");
  } else {
    let lastNumber = operation.pop();
    operation.push(`${lastNumber}.`);
  }

  displayCalcResultEl.textContent += ".";
}

function addOperation(value) {
  // Checa o tipo de entrada
  if (isNaN(getLastOperation())) {
    if (isOperator(value)) {
      setLastOperation(value);
    } else {
      pushOperation(value);
    }
  } else {
    if (isOperator(value)) {
      pushOperation(value);
    } else {
      const newValue = getLastOperation().toString() + value.toString();

      setLastOperation(parseFloat(newValue));
    }
  }

  displayCalcResultEl.textContent = operation.join("");
}

function calc() {
  let last = "";

  if (operation.length > 3 && getLastOperation() !== ".") {
    if (getLastOperation() == 0) return;
    last = operation.pop();
  }

  let result = getResult();

  if (last === "%") {
    result /= 100;
    operation = [result.toFixed(2)];
  } else {
    operation = [result.toFixed(2)];

    if (last) operation.push(last);
  }

  displayCalcResultEl.textContent = result.toFixed(2);
}

function getResult() {
  try {
    return eval(operation.join(""));
  } catch (e) {
    displayInfo.textContent = "Invalid Operation";
    setTimeout(() => {
      displayInfo.textContent = "";
    }, 500);
    return operation.join("");
  }
}

function clearAll() {
  operation = [];

  displayCalcResultEl.textContent = 0;
}

function cancelEntry() {
  let lastValue = operation.pop();

  if (lastValue) {
    lastValue = splittedValue(lastValue);
    lastValue.pop();
    operation.push(...lastValue);

    if (operation.length) {
      displayCalcResultEl.textContent = operation.join("");
    } else {
      displayCalcResultEl.textContent = 0;
    }
  }
}

function splittedValue(value) {
  return value.toString().split("") || value;
}

function getLastOperation() {
  return operation[operation.length - 1];
}

function isOperator(value) {
  return ["+", "-", "*", "/", "%"].includes(value);
}

function setLastOperation(value) {
  operation[operation.length - 1] = value;
}

function pushOperation(value) {
  operation.push(value);
  if (operation.length > 3) {
    calc();
  }
}

initialize();
