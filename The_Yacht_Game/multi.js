const tableArea = document.getElementById("tableArea");
const diceArea = document.getElementById("diceArea");

const minDie = 1;
const maxDie = 6;
const diceNum = 5;
const maxRoll = 100;
const playerNum = 1;
let currentPlayer = 1;

const nameAndScore = [
    { name: "Aces", type: "only", param: 1, },
    { name: "Twos", type: "only", param: 2, },
    { name: "Threes", type: "only", param: 3, },
    { name: "Fours", type: "only", param: 4, },
    { name: "Fives", type: "only", param: 5, },
    { name: "Sixes", type: "only", param: 6, },
    { name: "Bonus", type: "bonus" },
    { name: "Chance", type: "sum", param: "dice" },
    { name: "Full House", type: "ratio", param: [2, 3] },
    { name: "3 of Kind", type: "collection", param: 3 },
    { name: "4 of Kind", type: "collection", param: 4 },
    { name: "Small Straight", type: "consecutive", param: 4 },
    { name: "Large Straight", type: "consecutive", param: 5 },
    { name: "YAHTZEE", type: "collection", param: 5 },
    { name: "Total", type: "sum", param: "score" },
];

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
        thScore.innerText = `Player${p + 1}`;
        trHead.appendChild(thScore);
    }
    for (let i = 0; i < nameAndScore.length; i++) {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.innerText = nameAndScore[i].name;
        tr.appendChild(tdName);
        for (let j = 0; j < playerNum; j++) {
            const tdScore = document.createElement("td");
            if (i === nameAndScore.length - 1) {
                tdScore.setAttribute('class', 'fixed');
                tr.appendChild(tdScore);
            }
            else if (j === 0) {
                tdScore.setAttribute('class', 'not_fixed');
                tdScore.onclick = () => {
                    if (tdScore.innerText == "") return;
                    score[j][i] = tdScore.value;
                    tdScore.setAttribute('class', 'fixed');
                }
            }
            tr.appendChild(tdScore);
        }
        table.appendChild(tr);
    }
}

let arr = [2, 4, 2, 2, 2];
let num = 1;
countNum(1, arr);
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

function countDiceTotal(arr) {
    let res = 0
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

const score = [];
function setUpScore() {
    for (let i = 0; i < nameAndScore.length; i++) {
        score.push([]);
        for (let j = 0; j < playerNum; j++) {
            score[i].push(null);
        }
    }
}

function nextStep(params) {
    const table = document.getElementById("table").childNodes;

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
        let scoreTemp = 0;
        if (score[i][currentPlayer - 1] !== null) continue;
        if (nameAndScore[i].type === "only") {
            scoreTemp = countNum(nameAndScore[i].param, diceVal) * nameAndScore[i].param;
        }
        else if (nameAndScore[i].type === "bonus") {
            for (let j = minDie; j <= maxDie; j++) {
                scoreTemp += countNum(j, diceVal) * j;
            }
            scoreTemp = scoreTemp >= 63 ? 35 : 0;
        } else if (nameAndScore[i].type === "sum") {
            if (nameAndScore[i].param === "dice") {
                scoreTemp = countDiceTotal(diceVal);
            }
            else if (nameAndScore[i].param === "score") {
                for (let j = 0; j < score.length - 1; j++) {
                    scoreTemp += score[j][currentPlayer - 1] == null ? 0 : score[j][currentPlayer - 1];
                }
            }
        }
        else if (nameAndScore[i].type === "ratio") {
            let ratioArr = []
            for (let i = minDie; i <= maxDie; i++) {
                const val = countNum(i, diceVal);
                if (val === 0) continue;
                ratioArr.push(val);
            }
            ratioArr = ratioArr.sort((a, b) => a - b);
            if (nameAndScore[i].param.length === ratioArr.length) {
                let isOK = true;
                for (let j = 0; j < ratioArr.length; j++) {
                    if (nameAndScore[i].param[j] !== ratioArr[j]) {
                        isOK = false;
                        break;
                    }
                }
                if (isOK) scoreTemp = 25;
            }
        }
        else if (nameAndScore[i].type === "collection") {
            let maxNum = 0;
            for (let i = minDie; i <= maxDie; i++) {
                let countTemp = countNum(i, diceVal);
                maxNum = countTemp > maxNum ? countTemp : maxNum;
            }
            if (maxNum >= nameAndScore[i].param) scoreTemp = countDiceTotal(diceVal);
        }
        else if (nameAndScore[i].type === "consecutive") {
            const temp = countContinuous(diceVal);
            if (temp >= nameAndScore[i].param) {
                if (nameAndScore[i].param === 4) scoreTemp = 30;
                if (nameAndScore[i].param === 5) scoreTemp = 40;
            }
        }
        table[i + 1].childNodes[currentPlayer].innerText = scoreTemp;
    }
}

function main() {
    setUpScore();
    setUpTable();
    setUpDice();
    document.getElementById("rollBtn").onclick = rollDice;
}

main();
