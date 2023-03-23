// スネークゲームの定数を定義する
const ROWS = 20;
const COLS = 20;
const EMPTY = 0;
const SNAKE = 1;
const FRUIT = 2;

// スネークの方向を定義する
const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;

// ゲームオブジェクトを定義する
let canvas, ctx, keystate;
let frames, score, highScore;
let grid = {
    width: null,
    height: null,
    _grid: null,

    init: function (d, c, r) {
        this.width = c;
        this.height = r;

        this._grid = [];
        for (let x = 0; x < c; x++) {
            this._grid.push([]);
            for (let y = 0; y < r; y++) {
                this._grid[x].push(d);
            }
        }
    },

    set: function (val, x, y) {
        this._grid[x][y] = val;
    },

    get: function (x, y) {
        return this._grid[x][y];
    }
};

// スネークオブジェクトを定義する
let snake = {
    direction: null,
    last: null,
    _queue: null,

    init: function (d, x, y) {
        this.direction = d;

        this._queue = [];
        this.insert(x, y);
    },

    insert: function (x, y) {
        this._queue.unshift({ x: x, y: y });
        this.last = this._queue[0];
    },

    remove: function () {
        return this._queue.pop();
    }
};

// ゲームを初期化する
function init() {
    // ゲームオブジェクトを初期化する
    grid.init(EMPTY, COLS, ROWS);

    // スネークを初期化する
    let sp = { x: Math.floor(COLS / 2), y: ROWS - 1 };
    snake.init(UP, sp.x, sp.y);
    grid.set(SNAKE, sp.x, sp.y);

    // 果物をランダムに配置する
    setFood();

    // スコアを初期化する
    score = 0;

    // キーボードイベントを設定する
    document.addEventListener('keydown', function (e) {
        keystate[e.keyCode] = true;
    });

    // キャンバス要素を取得する
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');

    // ゲームループを開始する
    frames = 0;
    highScore = localStorage.getItem('highScore') || 0;
    requestAnimationFrame(gameLoop);
}

// game loop
function gameLoop() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    if (isGameOver()) {
        clearInterval(game);
        alert('Game Over!');
    }
}

// start the game loop
let game = setInterval(gameLoop, 100);

function clearCanvas() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// handle keydown events
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = 10;
    }

    if (keyPressed === 'ArrowRight' && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === 'ArrowLeft' && !goingRight) {
        dx = -10;
        dy = 0;
    }
});
