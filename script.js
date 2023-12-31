const switchBtn = document.querySelector('.switch');
const toggle = document.getElementById('toggle');
const root = document.documentElement;
const display = document.querySelector('.display');
const tiles = document.querySelectorAll('.tile');
const resetBtn = document.querySelector('.reset');
const prompt = document.querySelector('.prompt');
const player1info = document.getElementById('player1Name')
const player2info = document.getElementById('player2Name')
const play = document.getElementById('play');

let player1, player2;

window.addEventListener('DOMContentLoaded', () => {
    prompt.style.display = "flex";

});
play.addEventListener('click', () => {

    player1 = new Player(player1info.value, "X");
    player2 = new Player(player2info.value, "O");
    prompt.style.display = "none";
    // inital display message 
    display.textContent = `${gameController.getCurrentPlayer(gameController.rounds).name}'s turn`;
});

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}
const gameBoard = (() => {
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];
    let winner = undefined;

    const setMark = (element, i, j, mark, rounds) => {
        console.log(element.textContent);
        element.textContent = element.textContent + mark;
        board[i][j] = mark;
        winner = gameController.checkWinner(board);

        if (winner === undefined) {

            display.textContent = `${gameController.getCurrentPlayer(rounds + 1).name}'s turn`;
        } else {

            display.textContent = `${winner} Wins`;
        }
    };

    const Reset = () => {
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
        tiles.forEach((tile) => {
            tile.textContent = "";
        });
        gameController.checkWinner(board);

        display.textContent = `${gameController.getCurrentPlayer(gameController.rounds + 1).name}'s turn`;
    };
    return { setMark, Reset };
})();



resetBtn.addEventListener('click', gameBoard.Reset);

tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if (tile.textContent !== "") {
            return;
        }
        gameController.playRound(tile);
    });
});

const gameController = (() => {
    let rounds = 1;
    let gameover = false;


    const playRound = (element) => {
        if (!gameover) {
            gameBoard.setMark(element, element.dataset.i, element.dataset.j, getCurrentPlayer(rounds).mark, rounds);
            rounds++;
        }

    };

    const getCurrentPlayer = (rounds) => {
        return rounds % 2 === 0 ? player2 : player1;
    };

    const checkWinner = (board) => {
        //checks rows
        for (a = 0; a < 3; a++) {
            if (board[a][0] == getCurrentPlayer(rounds).mark && board[a][1] == getCurrentPlayer(rounds).mark && board[a][2] == getCurrentPlayer(rounds).mark) {
                gameover = true;
                generateStrike(a, 0, 0);
                generateStrike(a, 1, 0);
                generateStrike(a, 2, 0);
                return getCurrentPlayer(rounds).name;
            }
        }
        //checks columns
        for (a = 0; a < 3; a++) {
            if (board[0][a] == getCurrentPlayer(rounds).mark && board[1][a] == getCurrentPlayer(rounds).mark && board[2][a] == getCurrentPlayer(rounds).mark) {
                gameover = true;
                generateStrike(0, a, 1);
                generateStrike(1, a, 1);
                generateStrike(2, a, 1);
                return getCurrentPlayer(rounds).name;
            }
        }

        //checks diagonals
        if (board[0][0] == getCurrentPlayer(rounds).mark && board[1][1] == getCurrentPlayer(rounds).mark && board[2][2] == getCurrentPlayer(rounds).mark) {
            gameover = true;
            generateStrike(0, 0, 2);
            generateStrike(1, 1, 2);
            generateStrike(2, 2, 2);
            return getCurrentPlayer(rounds).name;
        }
        if (board[2][0] == getCurrentPlayer(rounds).mark && board[1][1] == getCurrentPlayer(rounds).mark && board[0][2] == getCurrentPlayer(rounds).mark) {
            gameover = true;
            generateStrike(0, 2, 3);
            generateStrike(1, 1, 3);
            generateStrike(2, 0, 3);
            return getCurrentPlayer(rounds).name;
        }
        gameover = false;
        return;

    };
    return { playRound, checkWinner, getCurrentPlayer, gameover, rounds };
})();


const generateStrike = (a, b, c) => {
   /*  0 for horizontal
    1 for vertical
    2 for up to down diaglonal
    3 for down to up diagonal */
    tiles.forEach((tile) => {
        if (tile.dataset.i == a && tile.dataset.j == b) {
            square = tile
        }
    })
    console.log(square);

    const rect = square.getBoundingClientRect();
    const strike = document.createElement('div');
    strike.classList.add('strike');
    switch(c){
        case 0 : strike.classList.add('horizontal');
        break;
        case 1 : strike.classList.add('vertical');
        break;
        case 2 : strike.classList.add('diagonal-strike2');
        break;
        case 3 : strike.classList.add('diagonal-strike3');
    }
    
    /* strike.style.top=`${rect.top-181.995}px `
    strike.style.left = `${rect.left}px`; */

   /*  document.querySelector('.board') */square.appendChild(strike);

};
/* generateStrike(0, 0);
generateStrike(1, 1);
generateStrike(2, 2); */
toggle.addEventListener('click', () => {
    switchBtn.classList.toggle('darkMode');
    root.classList.toggle('dark');
});