let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let playerTurn = false

// rendering the board function
function renderBoard() {
    let boardElement = document.querySelector('.board')
    boardElement.innerHTML = ''
    for (let i = 0; i < 3; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerText = board[i][j]
            cell.onclick = function() {
                if (playerTurn && board[i][j] === '') {
                    board[i][j] = 'X' 
                    playerTurn = false 
                    let winner = checkWinner()
                    if (!winner) {
                        computerMove() 
                        winner = checkWinner()
                        if (!winner) {
                            playerTurn = true 
                        }
                        else {
                            displayWinner(winner) 
                        }
                    } else {
                        displayWinner(winner)
                    }
                }
            }
            row.appendChild(cell)
        }
        boardElement.appendChild(row)
    }
}

// computer move function using minimax algorithm
function computerMove() {
    let bestScore = -Infinity
    let move

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O'
                let score = minimax(board, 0, false)
                board[i][j] = ''
                if (score > bestScore) {
                    bestScore = score
                    move = { i, j }
                }
            }
        }
    }

    board[move.i][move.j] = 'O'
    renderBoard()
}

// minimax algorithm 
function minimax(board, depth, isMaximizingPlayer) {
    let result = checkWinner()
    if (result !== null) {
        if (result === 'O') {
            return 1 // computer wins
        } else if (result === 'X') {
            return -1 // player wins
        } else {
            return 0 // tie
        }
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O' 
                    let score = minimax(board, depth + 1, false)
                    board[i][j] = ''
                    bestScore = Math.max(bestScore, score)
                }
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X'
                    let score = minimax(board, depth + 1, true)
                    board[i][j] = ''
                    bestScore = Math.min(bestScore, score)
                }
            }
        }
        return bestScore
    }
}

// function to check winner
function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') ||
            (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '')
        ) {
            return board[i][0]
        }
    }

    if (
        (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')
    ) {
        return board[1][1]
    }

    let isTie = true
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isTie = false
                break
            }
        }
        if (!isTie) {
            break
        }
    }
    if (isTie) {
        return 'tie'
    }

    return null
}

// function to display the winner
function displayWinner(winner) {
    let message = ''
    message = document.querySelector('.result')
    if (winner === 'O') {
        message.innerHTML = 'Computer wins!'
    } else if (winner === 'X') {
        message.innerHTML = 'Player wins!'
    } else {
        message.innerHTML = "It's a tie!";
    }
    
    if (winner === 'O') {
        let cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            cell.onclick = null
        })
    }
}

renderBoard()
computerMove()
playerTurn = true