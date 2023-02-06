const tableArea = document.getElementById("tableArea");
const diceArea = document.getElementById("diceArea");

const minDie = 1;
const maxDie = 6;
const diceNum = 5;
const maxRoll = 3;

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

const nameAndScore = [
  { name: "Aces", param: 1 },
  { name: "Twos", param: 2 },
  { name: "Threes", param: 3 },
  { name: "Fours", param: 4 },
  { name: "Fives", param: 5 },
  { name: "Sixes", param: 6 },
  { name: "3 of Kind" },
  { name: "4 of Kind" },
  { name: "Small Straight" },
  { name: "Large Straight" },
  { name: "YAHTZEE" },
  { name: "Chance" },
];

const diceFixed = [false, false, false, false, false];
function setUpDice() {
  for (let i = 0; i < diceArea.childElementCount; i++) {
    diceArea.children[i].onclick = () => {
      if (diceFixed[i]) {
        diceArea.children[i].style.opacity = 1;
      } else {
        console.log("aaa")
        diceArea.children[i].style.opacity = 0.5;
      }
      diceFixed[i] = !diceFixed[i];
    };
  }
}
function rollDice() {
  for (let i = 0; i < diceNum; i++) {
    if (diceFixed[i]) continue;
    const randNum = Math.floor(Math.random() * (maxDie - minDie) + 1);
    diceArea.children[i].src = `./img/dice_${randNum}.png`;
  }
}

function main() {
  setUpDice();
  document.getElementById("rollBtn").onclick = rollDice;
}

main();
