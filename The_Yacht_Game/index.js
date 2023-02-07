const tableArea = document.getElementById("tableArea");
const diceArea = document.getElementById("diceArea");

const minDie = 1;
const maxDie = 6;
const diceNum = 5;
const maxRoll = 3;
const playerNum = 1;
let currentPlayer = 1;

const nameAndScore = [
  { name: "Aces", param: 1, type: "only" },
  { name: "Twos", param: 2, type: "only" },
  { name: "Threes", param: 3, type: "only" },
  { name: "Fours", param: 4, type: "only" },
  { name: "Fives", param: 5, type: "only" },
  { name: "Sixes", param: 6, type: "only" },
  { name: "Bonus", type: "bonus" },
  { name: "Chance" },
  { name: "Full House" },
  { name: "3 of Kind" },
  { name: "4 of Kind" },
  { name: "Small Straight" },
  { name: "Large Straight" },
  { name: "YAHTZEE" },
  { name: "Total" },
];

const score = [];
function setUpScore() {
  for (let i = 0; i < nameAndScore.length; i++) {
    score.push([]);
    for (let j = 0; j < playerNum; j++) {
      score[i].push(null);
    }
  }
}

function setUpTable() {
  const table = document.createElement("table");
  table.setAttribute("id", "table");
  tableArea.appendChild(table);

  const trHead = document.createElement("tr");
  table.appendChild(trHead);
  const trHeadName = document.createElement("th");
  trHeadName.innerText = "Name";
  trHead.appendChild(trHeadName);
  for (let p = 0; p < playerNum; p++) {
    const thScore = document.createElement("th");
    thScore.innerText = "Player1";
    trHead.appendChild(thScore);
  }
  for (let i = 0; i < nameAndScore.length; i++) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.innerText = nameAndScore[i].name;
    tr.appendChild(tdName);
    for (let j = 0; j < playerNum; j++) {
      const tdScore = document.createElement("td");
      tr.appendChild(tdScore);
    }
    table.appendChild(tr);
  }
}

function countNum(num, arr) {
  let res = 0; // numがarrに何個あるか
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      res++;
    }
  }
  return res;
}

function countContinuous(arr) {
  let res = 0;
  const setArr = new Set(arr);
  for (let i = minDie; i <= maxDie; i++) {
    let continuousTemp = 0;
    for (let j = 0; j < diceNum; j++) {
      if (!setArr.has(i + j)) {
        break;
      }
      continuousTemp++;
    }
    res = res > continuousTemp ? res : continuousTemp;
  }
  return res;
}

const diceFixed = [false, false, false, false, false];
let diceVal = [0, 0, 0, 0, 0];
let diceRollRemain = maxRoll;
function setUpDice() {
  for (let i = 0; i < diceArea.childElementCount; i++) {
    diceArea.children[i].onclick = () => {
      if (diceFixed[i]) {
        diceArea.children[i].style.opacity = 1;
      } else {
        console.log("aaa");
        diceArea.children[i].style.opacity = 0.5;
      }
      diceFixed[i] = !diceFixed[i];
    };
  }
}
function rollDice() {
  if (diceRollRemain <= 0) return;
  for (let i = 0; i < diceNum; i++) {
    if (diceRollRemain !== maxRoll && diceFixed[i]) continue;
    const randNum = Math.floor(Math.random() * (maxDie - minDie) + 1);
    diceArea.children[i].src = `./img/dice_${randNum}.png`;
    diceVal[i] = randNum;
  }
  diceRollRemain--;
  document.getElementById("rollBtn").innerText = `Remain: ${diceRollRemain}`;
  calcScore();
}
// Todo
function calcScore() {
  const table = document.getElementById("table").childNodes;
  for (let i = 0; i < nameAndScore.length; i++) {
    if (score[i][currentPlayer - 1] !== null) continue;
    if (nameAndScore[i].type === "only") {
      table[i + 1].childNodes[currentPlayer].innerText =
        countNum(nameAndScore[i].param, diceVal) * nameAndScore[i].param;
    } else if (nameAndScore[i].type === "bonus") {
      let scoreTemp = 0;
      for (let i = minDie; i < maxDie; i++) {
        scoreTemp += countNum(i, diceVal) * i;
      }
    if (scoreTemp >= 63){
      table[i + 1].childNodes[currentPlayer].innerText = 35;
    }
    }
  }
}

function main() {
  setUpScore();
  setUpTable();
  setUpDice();
  document.getElementById("rollBtn").onclick = rollDice;
}

main();
