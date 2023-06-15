"use client"
import { useState } from 'react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import './globals.css'

const Home = () => {
    const [matching, setMatching] = useState(false);
    const socket = io();
    socket.on('matched', ({ opponent }) => {
        console.log(`Matched with ${opponent}`);
    });

    const handlePlayClick = () => {
        setMatching(true);
        socket.emit('play');
    }

    const handleCancelClick = () => {
        setMatching(false);
        socket.emit('cancel');
    }

    return (
        <>
            <h1>Expand Your Territory</h1>
            {!matching && (
                <button className='play' onClick={handlePlayClick}>
                    <Link href="/game">
                        <a>플레이하기</a>
                    </Link>
                </button>
            )}
            {matching && (
                <>
                    <div>게임을 찾는중...</div>
                    <button className='cancel' onClick={handleCancelClick}>
                        취소
                    </button>
                </>
            )}
        </>
    );
}

export default Home;