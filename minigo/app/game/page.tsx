"use client"
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './globals.css';

const Game = () => {
    const [stones, setStones] = useState<string[][]>([]);
    const [currentTurn, setCurrentTurn] = useState('');
    const socket = io();
    useEffect(() => {
        socket.on('yourTurn', () => {
            setCurrentTurn('me');
        });
        socket.on('opponentLeft', () => {
            // TODO: handle opponent left
        });
        return () => {
            socket.off('yourTurn');
            socket.off('opponentLeft');
        };
    }, []);

    const handleCellClick = (row: number, column: number) => {
        if (currentTurn !== 'me') return;
        // TODO: make move
    }

    const handleGiveupClick = () => {
        // TODO: handle give up
    }

    return (
        <>
            <h1>Expand Your Territory!</h1>
            <div className='buttonContainer'>
                <button onClick={handleGiveupClick}>giveup</button>
            </div>
            <table cellSpacing={0} cellPadding={0}>
                <tbody>
                    {stones.map((rowStones, row) => (
                        <tr key={row}>
                            {rowStones.map((stone, column) => (
                                <td key={column} onClick={() => handleCellClick(row, column)}>
                                    {stone === 'black' && <div className="black-stone"></div>}
                                    {stone === 'green' && <div className="green-stone"></div>}
                                    {stone === 'red' && <div className="red-stone"></div>}
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