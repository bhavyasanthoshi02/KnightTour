let board = [];
let movesList = [];
let timer = null;
let step = 0;
let knightEl = null;

//////////////////////////////////////////////////////////
// 🚀 GENERATE TOUR
//////////////////////////////////////////////////////////
async function generateTour() {

    clearInterval(timer);
    step = 0;

    let msg = document.getElementById("message");
    msg.innerText = "";

    let n = +document.getElementById("size").value;
    let r = +document.getElementById("startRow").value;
    let c = +document.getElementById("startCol").value;

    // ❌ INVALID INPUT
    if (n <= 0 || r < 0 || c < 0 || r >= n || c >= n) {
        msg.innerText = "Invalid input!";
        return;
    }

    let res = await fetch(`http://localhost:8081/tour?n=${n}&r=${r}&c=${c}`);
    let data = await res.json();

    // ❌ NO ROUTE
    if (data.error) {
        msg.innerText = "No route found!";
        return;
    }

    board = data;

    buildMoves(n);
    drawBoard(n);
    updateMoves();

    placeKnightAtStart();

    // Update analytics
    const maxMove = n * n - 1;
    document.getElementById("analyticsMoves").innerText = n * n;
    document.getElementById("analyticsGrid").innerText = `${n} x ${n}`;
    document.getElementById("analyticsStart").innerText = `(${r}, ${c})`;

    let endPos = "-";
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === maxMove) {
                endPos = `(${i}, ${j})`;
                break;
            }
        }
    }
    document.getElementById("analyticsEnd").innerText = endPos;
}

//////////////////////////////////////////////////////////
// 🔁 RESTART
//////////////////////////////////////////////////////////
function restart() {
    clearInterval(timer);
    step = 0;

    document.querySelectorAll(".cell")
        .forEach(c => c.classList.remove("active"));

    document.querySelectorAll(".move-item")
        .forEach(m => m.classList.remove("current-move"));

    placeKnightAtStart();
}

//////////////////////////////////////////////////////////
// BUILD MOVES
//////////////////////////////////////////////////////////
function buildMoves(n) {
    movesList = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            movesList[board[i][j]] = { x: i, y: j };
        }
    }
}

//////////////////////////////////////////////////////////
// DRAW BOARD
//////////////////////////////////////////////////////////
function drawBoard(n) {

    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    let boardWidth = Math.min(window.innerWidth - 40, 500);
    let cellSize = Math.max(25, boardWidth / n);
    boardDiv.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;

    let maxMove = n * n - 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            let move = board[i][j];
            let cell = document.createElement("div");

            cell.className = "cell " + ((i + j) % 2 === 0 ? "light" : "dark");
            cell.innerText = move + 1;

            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            cell.style.fontSize = (cellSize / 3) + "px";

            cell.dataset.row = i;
            cell.dataset.col = j;

            // ⭐ SAME STYLE FOR START + END
            if (move === 0 || move === maxMove) {
                cell.classList.add("start");
            }

            cell.onclick = () => {
                document.getElementById("startRow").value = i;
                document.getElementById("startCol").value = j;
                generateTour();
            };

            boardDiv.appendChild(cell);
        }
    }

    knightEl = document.createElement("div");
    knightEl.className = "knight";
    knightEl.innerText = "♞";
    boardDiv.appendChild(knightEl);
}

//////////////////////////////////////////////////////////
// MOVES PANEL
//////////////////////////////////////////////////////////
function updateMoves() {

    const movesDiv = document.getElementById("moves");
    movesDiv.innerHTML = "";

    movesList.forEach((m, i) => {
        let div = document.createElement("div");
        div.className = "move-item";
        div.innerText = `${i + 1} → (${m.x}, ${m.y})`;
        movesDiv.appendChild(div);
    });
}

//////////////////////////////////////////////////////////
// INITIAL POSITION
//////////////////////////////////////////////////////////
function placeKnightAtStart() {
    if (!movesList.length) return;
    moveKnight(movesList[0]);
}

//////////////////////////////////////////////////////////
// 🎬 PLAY ANIMATION + AUTO SCROLL
//////////////////////////////////////////////////////////
function play() {

    clearInterval(timer);
    step = 0;

    timer = setInterval(() => {

        if (step >= movesList.length) {
            clearInterval(timer);
            return;
        }

        let moveItems = document.querySelectorAll(".move-item");

        moveItems.forEach(m => m.classList.remove("current-move"));

        let current = moveItems[step];

        if (current) {
            current.classList.add("current-move");

            // 🔥 AUTO SCROLL
            current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        moveKnight(movesList[step]);

        step++;

    }, 300);
}

//////////////////////////////////////////////////////////
// MOVE KNIGHT
//////////////////////////////////////////////////////////
function moveKnight(move) {

    const cell = document.querySelector(
        `.cell[data-row="${move.x}"][data-col="${move.y}"]`
    );

    if (!cell) return;

    let rect = cell.getBoundingClientRect();
    let parentRect = cell.parentElement.getBoundingClientRect();

    let knightWidth = knightEl.offsetWidth || 28;
    let knightHeight = knightEl.offsetHeight || 28;
    let leftOffset = (rect.width - knightWidth) / 2;
    let topOffset = (rect.height - knightHeight) / 2;

    knightEl.style.left = (rect.left - parentRect.left + leftOffset) + "px";
    knightEl.style.top = (rect.top - parentRect.top + topOffset) + "px";

    cell.classList.add("active");
}

function pause() {
    clearInterval(timer);
}

window.onload = generateTour;

window.onresize = () => {
    if (board.length) {
        let n = +document.getElementById("size").value;
        drawBoard(n);
        if (step > 0 && step <= movesList.length) {
            for (let i = 0; i < step; i++) {
                const m = movesList[i];
                const cell = document.querySelector(`.cell[data-row="${m.x}"][data-col="${m.y}"]`);
                if (cell) cell.classList.add("active");
            }
            moveKnight(movesList[Math.min(step - 1, movesList.length - 1)]);
        } else {
            placeKnightAtStart();
        }
    }
};