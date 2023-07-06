"use client"
import React, { useState, useEffect } from 'react';
import { io as ClientIO } from "socket.io-client";
import './globals.css';

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
    const [connected, setConnected] = useState<boolean>(false);



    useEffect((): any => {
        const socket = new (ClientIO as any)('http://localhost:3000', {
          path: "/api/socket/io",
          addTrailingSlash: false,
        });
    
        // log socket connection
        socket.on("connect", () => {
          console.log("SOCKET CONNECTED!", socket.id);
          setConnected(true);
        });
    
        // socket disconnet onUnmount if exists
        if (socket) return () => socket.disconnect();
      }, []);

    const handleCellClick = (row: number, column: number) => {
        if (stones[row][column] !== null) return;
        const newStones = [...stones];
        newStones[row][column] = currentColor;
        setStones(newStones);
        setCurrentColor(currentColor === 'black' ? 'green' : 'black');
        setHistory([...history, { row, column }]);
    }

    const handleResetClick = () => {
        setStones(initialStones);
        setCurrentColor('black');
        setHistory([]);
    }

    const handleUndoClick = () => {
        if (history.length === 0) return;
        const newHistory = [...history];
        const lastMove = newHistory.pop();
        if (!lastMove) return;
        const newStones = [...stones];
        newStones[lastMove.row][lastMove.column] = null;
        setStones(newStones);
        setCurrentColor(currentColor === 'black' ? 'green' : 'black');
        setHistory(newHistory);
    }

    return (
        <>
            <h1>Expand Your Territory</h1>
            <div className='buttonContainer'>
                <button onClick={handleResetClick}>reset</button>
                <button onClick={handleUndoClick}>undo</button>
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