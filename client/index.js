let points = 0;
let autoClickers = [];
let numUpgrades = 0;

let autoClickerCost = 10;
let upgradeCost = 50;
let circleVal = 1;

class AutoClicker {
  constructor(val, speed) {
    this.val = val;
    this.speed = speed;
    this.started = false;
  }
  start() {
    setInterval(this.click, this.speed, [this.val]);
  }
  click(val) {
    points += Number(val);
    updateScore();
  }
}

const scoreDisplay = document.getElementById("score");
scoreDisplay.innerText = `Points: ${points}`;
const autoClickerDisplay = document.getElementById("autoClickerDisplay");
autoClickerDisplay.innerText = `Autoclickers: ${autoClickers.length}`;
const upgradeDisplay = document.getElementById("upgradeDisplay");
upgradeDisplay.innerText = `button upgrades: ${numUpgrades}`;

const usernameBox = document.getElementById("username");
const passwordBox = document.getElementById("password");

function updateScore() {
  scoreDisplay.innerText = `Points: ${points}`;
}

function handleCircleClick() {
  points += circleVal;
  updateScore();
}

function buyAutoClicker() {
  if (points >= autoClickerCost) {
    let newAuto = new AutoClicker(1, 1000);
    autoClickers.push(newAuto);
    autoClickerDisplay.innerText = `Autoclickers: ${autoClickers.length}`;
    points -= autoClickerCost;
    updateScore();
    newAuto.start();
  }
}

function buyUpgrade() {
  if (points >= upgradeCost) {
    numUpgrades += 1;
    upgradeDisplay.innerText = `button upgrades: ${numUpgrades}`;
    points -= upgradeCost;
    circleVal = 1 + numUpgrades;
    updateScore();
  }
}

function save() {
  console.log(usernameBox.innerText);
  let gameData = {
    points: points,
    autoClickers: autoClickers,
    numUpgrades: numUpgrades,
    circleVal: circleVal,
  };
  fetch("http://127.0.0.1:42069/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameBox.value.trim(),
      password: passwordBox.value.trim(),
      data: gameData,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}
