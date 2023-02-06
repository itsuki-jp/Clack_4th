const main = document.getElementById("main");

const tableArea = document.createElement("div");
const diceArea = document.createElement("div");

function countNum(num, arr) {
  let res = 0; // numがarrに何個あるか
  let continuous = 0; // numが最大何個連続してるか
  let continuousMax = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== num) {
      continuousMax = continuousMax > continuous ? continuousMax : continuous;
      continuous = 0;
    } else {
      res += 1;
      continuous++;
    }
  }
  continuousMax = continuousMax > continuous ? continuousMax : continuous;
  return [res, continuousMax];
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
