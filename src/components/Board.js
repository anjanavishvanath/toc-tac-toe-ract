import React from "react";
import Square from "./Square";
import Reset from "./Reset";

function winningCondition(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

export default function Board() {
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [isNextX, setIsNextX] = React.useState(true)

    function handleClick(id) {
        if (squares[id] || winningCondition(squares)) {
            return
        }

        const newSqauares = squares.slice()

        for (let i = 0; i < newSqauares.length; i++) {
            if (i === id) {
                if (isNextX === true) {
                    newSqauares[i] = 'X'
                } else {
                    newSqauares[i] = 'O'
                }
            }
        }
        setIsNextX(!isNextX)
        setSquares(newSqauares)
    }

    const winner = winningCondition(squares)
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isNextX ? "X" : "O");
    }

    function reset(){
        setSquares(Array(9).fill(null))
        setIsNextX(true)
    }

    return (
        <main>
            <div className="game">
                <div className="col">
                    <Square value={squares[0]} clickFunction={() => handleClick(0)} />
                    <Square value={squares[1]} clickFunction={() => handleClick(1)} />
                    <Square value={squares[2]} clickFunction={() => handleClick(2)} />
                </div>
                <div className="col">
                    <Square value={squares[3]} clickFunction={() => handleClick(3)} />
                    <Square value={squares[4]} clickFunction={() => handleClick(4)} />
                    <Square value={squares[5]} clickFunction={() => handleClick(5)} />
                </div>
                <div className="col">
                    <Square value={squares[6]} clickFunction={() => handleClick(6)} />
                    <Square value={squares[7]} clickFunction={() => handleClick(7)} />
                    <Square value={squares[8]} clickFunction={() => handleClick(8)} />
                </div>
            </div>
            <div className="status">{status}</div>
            <Reset resetEverything={reset} />
        </main>

    )
}