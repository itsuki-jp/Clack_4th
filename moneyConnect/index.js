const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1000;
const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const gameHeight = 7;
const gameWidth = 11;
const coinType = [1, 5, 10, 50, 100];
const nextCoin = {1:{}}

class coin{
    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    getType() {
        return this.type;
    }
}
let board = [];
function init() {
    board = [];
    for (let i = 0; i < gameHeight; i++){
        board.push([]);
        for (let j = 0; j < gameWidth; j++){
            board
        }
    }
}