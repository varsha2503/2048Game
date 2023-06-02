import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Cell from './Cell';
import { Board } from "../logic";
import useEvents from "../useEvents"
import GameOberlay from './GameOberlay';
import he2 from '../img/2.1.gif'
import he0 from '../img/0.1.gif'
import he4 from '../img/4.1.gif'
import he8 from '../img/8.11.gif'

const BoardView = () => {
    const [board, setBoard] = useState(new Board());
    const [highestScore, setHighestScore] = useState(0);

    useEffect(() => {
        if (board.score > highestScore) {
            setHighestScore(board.score);
        }
    }, [board.score, highestScore]);

    const handleKeyDown = (event) => {
        if (board.hasWon()) {
            return;
        }
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvents('keydown', handleKeyDown)

    const resetGame = () => {
        setBoard(new Board());
    }

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} />;
                })}
            </div>
        );
    });

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return <Tile tile={tile} key={index} />;
    });

    // const resetGame = () => {
    //     setBoard(new Board())
    // }

    return (
        <div>
            <div className="headd">
                <div id="tile-22" ><img src={he2} alt=" " /></div>
                <div id="tile-00" ><img src={he0} alt=" " /></div>
                <div id="tile-44" ><img src={he4} alt=" " /></div>
                <div id="tile-88" ><img src={he8} alt=" " /></div>
            </div>
            <div className="details-box">
                <div className="resetButton" onClick={resetGame}>New Game</div>
                <div className="score-box">
                    <div className="score-header">HSCORE</div>
                    <div>{highestScore}</div>
                </div>
                <div className="score-box">
                    <div className="score-header">SCORE</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className="board">
                {cells}
                {tiles}
                <GameOberlay onRestart={resetGame} board={board} />
            </div>
        </div>
    );
};

export default BoardView;
