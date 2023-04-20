// //Data;

const account1 = {
  owner: "Dishan Ahmed",
  username: "dishan786",
  movements: [10000, 2000, 5000, 1500, 200, 150, 100, 2800, 500],
  movementsType: [
    "income",
    "income",
    "expense",
    "income",
    "expense",
    "income",
    "income",
    "expense",
    "income",
  ],
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2022-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Tanvir Hasan Rafi",
  username: "tanvir786",
  movements: [10000, 2000, 5000, 1500, 200, 150, 100, 2800, 500],
  movementsType: [
    "income",
    "income",
    "expense",
    "income",
    "expense",
    "income",
    "income",
    "expense",
    "income",
  ],
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Shohanoor Rahman",
  username: "shohanoor786",
  movements: [10000, 2000, 5000, 1500, 200, 150, 100, 2800, 500],
  movementsType: [
    "income",
    "income",
    "expense",
    "income",
    "expense",
    "income",
    "income",
    "expense",
    "income",
  ],
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];

// ------------------------------------------- ELEMENTS -------------------------------------------

const labelTime = document.querySelector(".time");
const labelDate = document.querySelector(".date");
const containerMovements = document.querySelector(".movements");
const btnAddMovements = document.querySelector(".add-movement-button");
const labelMovementType = document.querySelector(".type-select");
const labelInputAmount = document.querySelector(".input-amount");
const btnAutoConvert = document.querySelector(".auto-convert-button");
const btnManualConverter = document.querySelector(".manual-convert-button");
const labelManualAmount = document.querySelectorAll(".manual-amount");
const labelResult = document.querySelector("#result");
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const btnConvert = document.querySelector(".converter");
const btnLogout = document.querySelector(".logout-btn");
const labelContainer = document.querySelector(".container");
const btnLogin = document.querySelector(".login-btn");
const labelLogin = document.querySelector(".login-form");
const inputLoginUsername = document.querySelector(".login-username");
const inputLoginPassword = document.querySelector(".login-password");
const labelWelcome = document.querySelector(".welcome");

labelContainer.style.display = "none";

let currentUser;
let currencyConverterState = 0;

// ----------------------------------- DIGITAL WATCH -------------------------------------------

let time = () => {
  let now = new Date();

  let hour = `${now.getHours()}`.padStart(2, 0);
  let min = `${now.getMinutes()}`.padStart(2, 0);
  let second = `${now.getSeconds()}`.padStart(2, 0);
  let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  labelTime.textContent = `${hour}:${min}:${second}, `;
  labelDate.textContent = date;
};

time();
setInterval(time, 1000);

// ------------------------------------- UPDATE MOVEMENTS ------------------------------------

let displayTransactions = () => {
  containerMovements.textContent = "";

  currentUser.movements.forEach(function (mov, i) {
    let html = `
    <div class="movements-row">
      <div class="movements-type movements-type-${
        currentUser.movementsType[i]
      }">${i + 1} ${currentUser.movementsType[i]}</div>
      
      <div class="movements-value">${mov} ${currentUser.currency}</div>
    </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// --------------------------------------- ADD MOVEMENTS --------------------------------------

btnAddMovements.addEventListener("click", (e) => {
  e.preventDefault();

  let movementType = `${labelMovementType.value}`.toLowerCase();
  let inputAmount = +labelInputAmount.value;

  currentUser.movements.push(inputAmount);
  currentUser.movementsType.push(movementType);

  displayTransactions();
});

// -------------------------------------- CURRENCY CONVERTER API ------------------------------------

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
};

//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "BDT";
toDropDown.value = "USD";

let convertCurrency = () => {
  //Create References

  let fromCurrency = fromDropDown.value;
  let toCurrency = toDropDown.value;

  if (currencyConverterState === 1) {
    currentUser.currency = toCurrency;
    currentUser.movements.forEach((mov, i) => {
      mov = `${mov}`;

      if (mov.length > 0) {
        fetch(
          `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${fromCurrency}&want=${toCurrency}&amount=${mov}`,
          options
        )
          .then((response) => response.json())
          .then((response) => (currentUser.movements[i] = +response.new_amount))
          .catch((err) => console.error(err));
      }
    });

    toDropDown.value = fromCurrency;
    fromDropDown.value = currentUser.currency;

    setTimeout(displayTransactions, 1000);
  } else {
    let amount = document.querySelector("#amount").value;
    if (amount.length != 0) {
      fetch(
        `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${fromCurrency}&want=${toCurrency}&amount=${amount}`,
        options
      )
        .then((response) => response.json())
        .then(
          (response) =>
            (result.innerHTML = `${response.new_amount} ${toCurrency}`)
        )
        .catch((err) => console.error(err));
    } else {
      alert("Please fill in the amount");
    }
  }
};

// ------------------------------ AUTO CURRENCY CONVERTER --------------------------

btnAutoConvert.addEventListener("click", (e) => {
  e.preventDefault();

  labelManualAmount[0].style.display = "none";
  labelManualAmount[1].style.display = "none";
  btnManualConverter.style.marginBottom = "10px";

  fromDropDown.value = currentUser.currency;
  labelResult.style.display = "none";
  currencyConverterState = 1;
});

// ------------------------------- MANUAL CURRENCY CONVERTER -------------------------------

btnManualConverter.addEventListener("click", (e) => {
  e.preventDefault();

  labelManualAmount[0].style.display = "block";
  labelManualAmount[1].style.display = "block";
  btnManualConverter.style.marginBottom = "0px";
  labelResult.style.display = "block";

  fromDropDown.value = "BDT";
  currencyConverterState = 0;
});

btnConvert.addEventListener("click", convertCurrency);

// ------------------------------------- LOGIN ----------------------------------

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentUser = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });

  if (!currentUser) {
    alert("Invalid UserName");
  }

  if (currentUser.pin == inputLoginPassword.value) {
    labelLogin.style.display = "none";
    labelContainer.style.display = "block";

    inputLoginUsername.value = inputLoginPassword.value = "";

    labelWelcome.textContent = `Welcome Back, ${
      currentUser.owner.split(" ")[0]
    }`;

    displayTransactions();
  } else {
    alert("Invalid Pin");
  }
});

// ------------------------------------ LOGOUT ----------------------------

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();

  labelContainer.style.display = "none";
  labelLogin.style.display = "block";
});
