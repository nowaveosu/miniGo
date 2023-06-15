"use client"
import { useState } from 'react';
import '../globals.css';

const Game = () => {
    const boardSize = 9;
    const rows = Array.from({ length: boardSize }, (_, i) => i);
    const columns = Array.from({ length: boardSize }, (_, i) => i);
    const center = Math.floor(boardSize / 2);
    const initialStones = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    initialStones[center][center] = 'red';
    const [stones, setStones] = useState(initialStones);
    const [currentColor, setCurrentColor] = useState('black');
    const [history, setHistory] = useState<{ row: number; column: number }[]>([]);

    const handleCellClick = async (row: number, column: number) => {
        if (stones[row][column] !== null) return;
        const newStones = [...stones];
        newStones[row][column] = currentColor;
        setStones(newStones);
        const response = await fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentColor })
        });
        const data = await response.json();
        setCurrentColor(data.currentColor);
        setHistory([...history, { row, column }]);
    }

    const handleGiveupClick = () => {
        setStones(initialStones);
        setCurrentColor('black');
        setHistory([]);
    }

    return (
        <>
            <h1>Expand Your Territory</h1>
            <div className='buttonContainer'>
                <button onClick={handleGiveupClick}>giveup</button>
            </div>
            <table cellSpacing={0} cellPadding={0}>
                <tbody>
                    {rows.map(row => (
                        <tr key={row}>
                            {columns.map(column => (
                                <td key={column} onClick={() => handleCellClick(row, column)}>
                                    {stones[row][column] === 'black' && <div className="black-stone"></div>}
                                    {stones[row][column] === 'green' && <div className="green-stone"></div>}
                                    {stones[row][column] === 'red' && <div className="red-stone"></div>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Game;